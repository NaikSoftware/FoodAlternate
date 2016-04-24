import React from 'react';

import Toolbar from './AppBar';
import LoginForm from './LoginForm';

import UserStore from '../store/UserStore';
import AppActions from '../AppActions';

const App = React.createClass({

    getInitialState() {
        return {
            isLogined: false
        }
    },

    componentWillMount() {
        // check logined and refresh state
    },

    render() {
        return <div>
            <Toolbar/>
            {this.state.isLogined ? null : <LoginForm/>}
        </div>
    }
});

export default App;