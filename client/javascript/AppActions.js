/**
 * Created by naik on 24.04.16.
 */
import AppDispatcher from './AppDispatcher';
import AppConstants from './AppConstants';

import Api from './Api';

const AppActions = {

    login(name, password) {
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
    }
};

export default AppActions;