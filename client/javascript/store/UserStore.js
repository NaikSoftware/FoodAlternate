/**
 * Created by naik on 24.04.16.
 */
import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

let loadingError = null;
let isLoading = false;
let isLogined = false;

const CHANGE = 'CHANGED_USER_STORE_EVENT';

const UserStore = Object.assign({}, EventEmitter.prototype, {

    isLoading() {
        return isLoading;
    },

    isLogined() {
        return isLogined;
    },
    
    getLoadingError() {
       return loadingError; 
    },

    emitChange: function () {
        console.log('Emit change');
        this.emit(CHANGE);
    },

    addChangeListener: function(callback) {
        console.log('Add listener');
        this.on(CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        console.log('Remove listener');
        this.removeListener(CHANGE, callback);
    }
});

AppDispatcher.register(function (action) {
    console.log('Dispatch action:' + JSON.stringify(action));
    switch (action.type) {
        case AppConstants.REQUEST_LOGIN: {
            isLoading = true;
            UserStore.emitChange();
            break;
        }

        case AppConstants.RESPONSE_LOGIN_FAIL: {
            isLoading = false;
            isLogined = false;
            loadingError = action.error;
            UserStore.emitChange();
            break;
        }

        case AppConstants.RESPONSE_LOGIN_SUCCESS: {
            isLoading = false;
            isLogined = true;
            loadingError = null;
            UserStore.emitChange();
            break;
        }

        default: {
            console.log('No such action ${action.type}')
        }
    }
});

export default UserStore;