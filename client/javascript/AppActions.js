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
            .then(({data}) => {
                AppDispatcher.dispatch({
                    type: AppConstants.RESPONSE_LOGIN_SUCCESS
                })
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.RESPONSE_LOGIN_FAIL,
                    error: err
                })
            })
    },
    
    tryAutoLogin(verificationToken) {
        AppDispatcher.dispatch({
            type: AppConstants.REQUEST_LOGIN
        });
        
        if (!verificationToken) {
            AppDispatcher.dispatch({
                type: AppConstants.RESPONSE_LOGIN_FAIL,
                error: 'Verification token must be not null'
            });
        } else {
            Api.autoLogin(verificationToken)
                .then(({data}) => {
                    if (data.status === 'OK') {
                        AppDispatcher.dispatch({
                            type: AppConstants.RESPONSE_LOGIN_SUCCESS
                        })
                    } else {
                        AppDispatcher.dispatch({
                            type: AppConstants.RESPONSE_LOGIN_FAIL,
                            error: data.message
                        })
                    }
                })
                .catch(err => {
                    AppDispatcher.dispatch({
                        type: AppConstants.RESPONSE_LOGIN_FAIL,
                        error: err
                    })
                })
        }
    }
};

export default AppActions;