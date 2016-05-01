/**
 * Created by naik on 24.04.16.
 */
import AppDispatcher from './AppDispatcher';
import AppConstants from './AppConstants';

import Api from './Api';

const AppActions = {

    login(name, password) {
        AppDispatcher.dispatch({
            type: AppConstants.REQUEST_LOGIN
        });
        
        Api.login(name, password)
            .then(response => processLoginResponse(response.data))
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.RESPONSE_LOGIN_FAIL,
                    error: err
                })
            })
    },
    
    tryAutoLogin(authToken) {
        AppDispatcher.dispatch({
            type: AppConstants.REQUEST_LOGIN
        });
        
        if (!authToken) {
            AppDispatcher.dispatch({
                type: AppConstants.RESPONSE_LOGIN_FAIL,
                error: 'Verification token must be not null'
            });
        } else {
            Api.autoLogin()
                .then(response => processLoginResponse(response.data, true))
                .catch(err => {
                    AppDispatcher.dispatch({
                        type: AppConstants.RESPONSE_LOGIN_FAIL
                    })
                })
        }
    }
};

function processLoginResponse(response, autologin) {
    if (response.status === 'OK') {
        AppDispatcher.dispatch({
            type: AppConstants.RESPONSE_LOGIN_SUCCESS,
            table: response.data
        })
    } else {
        AppDispatcher.dispatch({
            type: AppConstants.RESPONSE_LOGIN_FAIL,
            error: autologin ? null : response.message
        })
    }
}

export default AppActions;