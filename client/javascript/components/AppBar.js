/**
 * Created by naik on 23.04.16.
 */
import React from 'react';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
    title: {
        cursor: 'pointer',
    },
};

const Toolbar = () => (
    <AppBar
        title={<span style={styles.title}>Food Alternate</span>}
        iconElementRight={<FlatButton label="Save" />}
    />
);

export default Toolbar;
