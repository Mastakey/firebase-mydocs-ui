import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postMyDoc } from '../redux/actions/dataActions';

class PostMydoc extends Component {
    state = {
        title: '',
        category: '',
        content: ''
    };
    handleSubmit(){
        alert('submit');
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
    render() {
        
        return (
            <div>
                <h1>Post</h1>
                <form>
                    <input name="title" onChange={this.handleChange}></input>
                    <input name="category" onChange={this.handleChange}></input>
                    <textarea name="content" onChange={this.handleChange}></textarea>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>

            </div>
        )
    }
}

PostMydoc.propTypes = {
    postMyDoc: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {postMyDoc})(PostMydoc);
