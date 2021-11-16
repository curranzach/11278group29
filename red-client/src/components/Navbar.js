import React, { Component, Fragment } from 'react';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Fragment>
                    <img src="logo.png" alt="Kitten" height="50" width="50" />
                    <Typography color="primary">__</Typography>
                    <Typography color="inherit">RENEWABLE ENERGY DASHBOARD</Typography>
                    </Fragment>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;
