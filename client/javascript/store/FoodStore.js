/**
 * Created by naik on 24.04.16.
 */
import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

let loadingError = null;
let isLoading = false;
let foodTable;

const CHANGE = 'CHANGED_FOOD_STORE_EVENT';

const FoodStore = Object.assign({}, EventEmitter.prototype, {

    isLoading() {
        return isLoading;
    },
    
    getLoadingError() {
       return loadingError; 
    },
    
    getFoodTable() {
        return foodTable;
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
        case AppConstants.FOOD_LOADED: {
            isLoading = false;
            foodTable = action.table;
            FoodStore.emitChange();
            break;
        }

        default: {
            console.log('No such action ${action.type}')
        }
    }
});

export default FoodStore;