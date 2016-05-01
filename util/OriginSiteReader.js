/**
 * Created by naik on 01.05.16.
 */
var Curl = require('node-libcurl').Curl;
var cheerio = require('cheerio');
var querystring = require('querystring');

const BASE_ORIGIN_URL = 'http://food.riversoft.biz/';

const OriginSiteReader = {

    readFoodTable(authToken) {
        const curl = new Curl();

        curl.setOpt(Curl.option.URL, BASE_ORIGIN_URL + 'DayAndOrder/List');
        curl.setOpt(Curl.option.COOKIE, '.ASPXAUTH=' + authToken);

        var promise = new Promise(function (resolved, rejected) {
            curl.on('end', function (status, body, headers) {
                this.close();
                console.log('ReadFoodTable status: ' + status);

                if (status === 200) {
                    var table = {lines: []};
                    var $ = cheerio.load(body);

                    $('form[action="/DayAndOrder/SaveMenuOrder"]').each(function (i, node) {
                        var form = $(node);
                        table.lines.push({
                            id: form.children('input[name="Id"]').val(),
                            header: form.find('a').text().trim(),
                            first: readFoodItem('isFirst', form),
                            second: readFoodItem('isSecondGarnir', form),
                            third: readFoodItem('isSecondMeat', form),
                            fourth: readFoodItem('isSalad', form)
                        });
                    });

                    console.log(JSON.stringify(table, null, 4));
                    resolved(table);
                } else {
                    rejected(status);
                }

            });
        });

        curl.on('error', curl.close.bind(curl));
        curl.perform();

        return promise;
    },

    login(username, password) {

        const self = this;

        return new Promise(function (resolved, rejected) {
            readVerificationToken().then(function (verification) {

                const curl = new Curl();

                var data = {
                    UserName: username,
                    password: password,
                    __RequestVerificationToken: verification.field
                };
                curl.setOpt(Curl.option.URL, BASE_ORIGIN_URL + '/account/login');
                curl.setOpt(Curl.option.POSTFIELDS, querystring.stringify(data));
                curl.setOpt(Curl.option.COOKIE, verification.cookie);

                curl.on('end', function (status, body, headers) {
                    curl.close();
                    console.log('Login status: ' + status);
                    if (status === 200) {
                        rejected('Bad credentials');
                    } else if (status === 302) {
                        
                        var authToken = headers[0]['Set-Cookie'][0];
                        authToken = authToken.substring(authToken.indexOf('=') + 1, authToken.indexOf(';'));
                        self.readFoodTable(authToken).then(function (table) {
                            resolved({table: table, authToken: authToken});
                        }).catch(function (err) {
                            rejected(err)
                        })
                    } else {
                        rejected(status);
                    }
                });

                curl.on('error', curl.close.bind(curl));
                curl.perform();

            }).catch(function (err) {
                rejected(err);
            });
        });
    }
};

function readFoodItem(type, form) {
    var inputNode = form.find('input[name="' + type + '"]');
    return {
        name: inputNode.parent('label').text().trim(),
        checked: inputNode.attr('checked') === 'checked'
    }
}

function readVerificationToken() {
    const curl = new Curl();

    curl.setOpt(Curl.option.URL, BASE_ORIGIN_URL + '/account/login');

    var promise = new Promise(function (resolved, rejected) {
        curl.on('end', function (status, body, headers) {
            curl.close();
            console.log('Load login page status: ' + status);
            if (status === 200) {
                var $ = cheerio.load(body);
                var verificationTokenField = $('input[name="__RequestVerificationToken"]').val();
                var verificationTokenCookie = headers[0]['Set-Cookie'][0];
                if (verificationTokenField && verificationTokenCookie) resolved({
                    field: verificationTokenField,
                    cookie: verificationTokenCookie
                });
                else rejected('Verification token not found on login page');
            } else {
                rejected(status);
            }
        });
    });

    curl.on('error', curl.close.bind(curl));
    curl.perform();

    return promise;
}

module.exports = OriginSiteReader;