/**
 * Created by naik on 01.05.16.
 */
import React from 'react';

import FoodStore from '../store/FoodStore';

function getStateFromStore() {
    return {
        isLoading: FoodStore.isLoading(),
        loadingError: FoodStore.getLoadingError(),
        food: FoodStore.getFoodTable()
    }
}

const FoodTable = React.createClass({

    getInitialState() {
        return getStateFromStore();
    },

    componentWillMount() {
        FoodStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        FoodStore.removeChangeListener(this.onChange);
    },

    onChange() {
        let state = getStateFromStore();
        this.setState(state);
    },
    
    render() {
        return <div>
            {JSON.stringify(this.state.food, null, 4)}
        </div>
    }
});

export default FoodTable;