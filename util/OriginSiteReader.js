/**
 * Created by naik on 01.05.16.
 */
var Curl = require('node-libcurl').Curl;
var cheerio = require('cheerio');

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
                    var table = { lines: []};
                    var $ = cheerio.load(body);

                    $('form[action="/DayAndOrder/SaveMenuOrder"]').each(function (i, node) {
                        var form = $(node);
                        table.lines.push({
                            id: form.children('input[name="Id"]').val(),
                            header: form.find('a').text().trim(),
                            first:  readFoodItem('isFirst', form),
                            second: readFoodItem('isSecondGarnir', form),
                            third:  readFoodItem('isSecondMeat', form),
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
    }
};

function readFoodItem(type, form) {
    var inputNode = form.find('input[name="'+ type + '"]');
    return {
        name: inputNode.parent('label').text().trim(),
        checked: inputNode.attr('checked') === 'checked'
    }
}

module.exports = OriginSiteReader;