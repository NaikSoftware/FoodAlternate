import React from 'react';
import Cookies from 'js-cookie';

import Toolbar from './AppBar';
import LoginForm from './LoginForm';
import LoadingIndicator from './LoadingIndicator';

import UserStore from '../store/UserStore';
import AppActions from '../AppActions';

function getStateFromStore() {
    return {
        isLoading: UserStore.isLoading(),
        isLogined: UserStore.isLogined(),
        loadingError: UserStore.getLoadingError()
    }
}

const App = React.createClass({

    getInitialState() {
        Cookies.set('verificationToken', 'testtoken');
        return getStateFromStore();
    },

    componentWillMount() {
        UserStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
    },

    onChange() {
        let state = getStateFromStore();
        console.log('onChange called with loadingError: ' + state.loadingError);
        this.setState(state);
    },

    componentDidMount() {
        AppActions.tryAutoLogin(Cookies.get('verificationToken'));
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