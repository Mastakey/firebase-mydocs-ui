import React, { Fragment, Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render(){
      const authenticated = this.props.authenticated;
        return (
          <AppBar position="fixed">
            <Toolbar className="nav-container">
              <Button color="inherit" component={Link} to ="/">Home</Button>
              {!authenticated ? (
              <Fragment>
                <Button color="inherit" component={Link} to ="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
              </Fragment> 
              ): (
                <Fragment></Fragment>
              )}
              <Button color="inherit" component={Link} to="/post">Post</Button>
            </Toolbar>
          </AppBar>
        );

    }
}


Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);