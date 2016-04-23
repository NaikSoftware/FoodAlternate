import React from 'react'

import Toolbar from './AppBar';
import LoginForm from './LoginForm'

const App = React.createClass({
    render() {
        return <div>
            <Toolbar/>
            <LoginForm/>
        </div>
    }
});

export default App;