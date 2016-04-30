import React from 'react';

import Toolbar from './AppBar';
import LoginForm from './LoginForm';
import LoadingIndicator from './LoadingIndicator';

import UserStore from '../store/UserStore';
import AppActions from '../AppActions';

const App = React.createClass({

    getInitialState() {
        return {
            isLogined: false,
            isLoading: true
        }
    },

    componentWillMount() {
        // check logined and refresh state
    },

    render() {
        var content;
        if (this.state.isLoading) {
            content = <LoadingIndicator/>;
        } else if (this.state.isLogined) {
            content = null; // todo: food table
        } else {
            content = <LoginForm/>;
        }
        return <div>
            <Toolbar/>
            {content}
        </div>
    }
});

export default App;