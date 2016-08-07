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
        console.log('Add listener to FoodStore: ' + callback.name);
        this.on(CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        console.log('Remove listener from FoodStore: ' + callback.name);
        this.removeListener(CHANGE, callback);
    }
});

AppDispatcher.register(function (action) {
    console.log('Dispatch action in FoodStore:' + JSON.stringify(action));
    switch (action.type) {
        case AppConstants.FOOD_LOADED: {
            isLoading = false;
            foodTable = action.table;
            FoodStore.emitChange();
            break;
        }

        default: {
            console.log(`Ignore action ${action.type} in FoodStore`)
        }
    }
});

export default FoodStore;