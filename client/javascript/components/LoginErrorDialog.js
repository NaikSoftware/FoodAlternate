/**
 * Created by naik on 01.05.16.
 */
import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

const LoginErrorDialog = React.createClass({

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                secondary={true}
                onClick={this.props.handleClose}
            />
        ];
        return <Dialog
            title='Sign In error'
            actions={actions}
            modal={false}
            open={true}
            onRequestClose={this.props.handleClose}
        >
            Login or password incorrect, please check your credentials
        </Dialog>
    }
});

export default LoginErrorDialog;