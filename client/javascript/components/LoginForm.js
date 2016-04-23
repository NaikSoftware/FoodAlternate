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

const LoginForm = () => (
    <Card className="login-form">
        <CardTitle title="Sign In" subtitle="Enter credentials from original site"/>
        <CardText>
            <TextField
                hintText="Login"
                floatingLabelText="Login"
            /><br/>
            <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
            /><br/>
        </CardText>
        <CardActions>
            <FlatButton label="Enter"/>
        </CardActions>
    </Card>
);

export default LoginForm;
