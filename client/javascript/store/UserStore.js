/**
 * Created by naik on 24.04.16.
 */
import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

let loadingError = null;
let isAutologin = false;
let isLoading = false;
let isLogined = false;

const CHANGE = 'CHANGED_USER_STORE_EVENT';

const UserStore = Object.assign({}, EventEmitter.prototype, {

    getState: function () {
        return {
            loadingError: loadingError,
            isAutologin: isAutologin,
            isLoading: isLoading,
            isLogined: isLogined
        }
    },

    emitChange: function () {
        console.log('Emit change');
        this.emit(CHANGE);
    },

    addChangeListener: function(callback) {
        console.log('Add listener to UserStore: ' + callback.name);
        this.on(CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        console.log('Remove listener from UserStore: ' + callback.name);
        this.removeListener(CHANGE, callback);
    }
});

AppDispatcher.register(function (action) {
    console.log('Dispatch action in UserStore:' + JSON.stringify(action));
    switch (action.type) {
        case AppConstants.REQUEST_LOGIN: {
            isLoading = true;
            loadingError = null;
            isAutologin = action.autologin;
            UserStore.emitChange();
            break;
        }

        case AppConstants.RESPONSE_LOGIN_FAIL: {
            isLoading = false;
            isLogined = false;
            loadingError = action.error;
            isAutologin = action.autologin;
            UserStore.emitChange();
            break;
        }

        case AppConstants.RESPONSE_LOGIN_SUCCESS: {
            isLoading = false;
            isLogined = true;
            loadingError = null;
            isAutologin = action.autologin;
            UserStore.emitChange();
            break;
        }

        default: {
            console.log(`Ignore action ${action.type} in UserStore`)
        }
    }
});

export default UserStore;