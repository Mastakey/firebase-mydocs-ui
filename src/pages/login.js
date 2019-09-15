import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input type="email" name="email" onChange={this.handleChange}></input>
                    <input type="password" name="password" onChange={this.handleChange}></input>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(login);
