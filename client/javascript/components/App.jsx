import React from 'react';
import Cookies from 'js-cookie';

import Toolbar from './AppBar';
import LoginForm from './LoginForm';
import LoadingIndicator from './LoadingIndicator';
import LoginErrorDialog from './LoginErrorDialog';
import FoodTable from './FoodTable';

import UserStore from '../store/UserStore';
import AppActions from '../AppActions';

const App = React.createClass({

    getInitialState() {
        return UserStore.getState();
    },

    componentWillMount() {
        UserStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
    },

    onChange() {
        let state = UserStore.getState();
        if (state.loadingError && !state.isLogined) state.loginError = true;
        this.setState(state);
    },

    componentDidMount() {
        AppActions.tryAutoLogin(Cookies.get('auth_token'));
    },

    render() {
        var content;
        if (this.state.isLoading) {
            content = <LoadingIndicator/>;
        } else if (this.state.isLogined) {
            content = <FoodTable/>;
        } else {
            content = <LoginForm loginCallback={AppActions.login}/>;
        }
        return <div>
            <Toolbar/>
            {content}
            {this.state.loginError && !this.state.isAutologin ? <LoginErrorDialog handleClose={this.handleCloseLoginError}/> : null}
        </div>
    },

    handleCloseLoginError() {
        this.setState({loginError: false});
    }
});

export default App;