import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postMyDoc } from '../redux/actions/dataActions';

//MUI
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

//Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostMydoc extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      category: '',
      content: '',
      delta: []
    };
    this.handleQuillChange = this.handleQuillChange.bind(this)
  }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const mdoc = {
          title: this.state.title,
          category: this.state.category,
          content: this.state.content,
          delta: JSON.stringify(this.state.delta)
        };
        this.props.postMyDoc(mdoc);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleQuillChange(value, delta, source, editor){
      this.setState({ content: editor.getHTML(), delta: editor.getContents() });
    }
    render() {
        return (
          <div>
            <h1>Post</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  autoComplete="off"
                  label="Title"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="category"
                  label="Category"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <ReactQuill value={this.state.content}
                    name='content'
                    onChange={this.handleQuillChange} 
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={this.handleSubmit} >Submit</Button>
              </Grid>
              
            </Grid>
          </div>
        );
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
