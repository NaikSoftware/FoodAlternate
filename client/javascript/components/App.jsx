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
        Cookies.set('authToken', '9886BDD840ACA30A6AB2360B8F922AD02AE2804A4A700C1692E9227B8AE257B43215EA9F827B3B4B8B32641E0411EB6E83C1EB91CA5C0DFF0692E856A4EC7DD91BA6D1322AB68F6B83C8930FBED3F8BEF97B43CF83BC1B4DF82A89A5305166019464CE6621EC3BAC36DFD');
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
        AppActions.tryAutoLogin(Cookies.get('authToken'));
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