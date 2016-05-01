/**
 * Created by naik on 23.04.16.
 */
import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const LoginForm = React.createClass({
    
    getInitialState() {
        return {}
    },

    render() {
        return <Card className="login-form">
            <CardTitle title="Sign In" subtitle="Enter credentials from original site"/>
            <CardText>
                <TextField
                    hintText="Login"
                    floatingLabelText="Login"
                    onChange={this.handleLoginChange}
                    errorText={this.state.loginEmpty ? 'Login required' : null}
                /><br/>
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    errorText={this.state.passwordEmpty ? 'Password required' : null}
                /><br/>
            </CardText>
            <CardActions>
                <FlatButton label="Enter" onClick={this.handleFire}/>
            </CardActions>
        </Card>
    },

    handleLoginChange(event) {
        var state = {login: event.target.value};
        if (state.login && state.login.trim().length > 0) state.loginEmpty = false;
        this.setState(state);
    },

    handlePasswordChange(event) {
        var state =  {password: event.target.value};
        if (state.password && state.password.trim().length > 0) state.passwordEmpty = false;
        this.setState(state);
    },

    handleFire() {
        var state = this.state;
        if (state.login == null || state.login.trim().length < 1) this.setState({loginEmpty: true});
        else if (state.password == null || state.password.trim().length < 1) this.setState({passwordEmpty: true});
        else this.props.loginCallback(state.login, state.password);
    }
});

export default LoginForm;
