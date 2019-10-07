import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postMyDoc } from '../redux/actions/dataActions';


//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

//Quill
import ReactQuill from 'react-quill';
import QuillSettings from './QuillSettings';
import 'react-quill/dist/quill.snow.css';

const styles = {
  progress: {
    position: 'absolute'
  }
}

class PostMydoc extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      category: '',
      content: '',
      tags: '',
      delta: []
    };
    this.handleQuillChange = this.handleQuillChange.bind(this);
  }
    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(this.state);
        const mdoc = {
          title: this.state.title,
          category: this.state.category,
          content: this.state.content,
          tags: this.state.tags.split(',').map(tag => tag.trim()),
          delta: JSON.stringify(this.state.delta)
        };
        //console.log(this.props);
        await this.props.postMyDoc(mdoc, this.props.history);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleQuillChange(value, delta, source, editor){
      this.setState({ content: editor.getHTML(), delta: editor.getContents() });
    }
    render() {
      const loading = this.props.data.loading;
      const classes = this.props.classes;
      const errors = this.props.UI.errors;
      //Errors
      const keys = errors ? Object.keys(errors) : [];
      let errorStr = '';
      keys.forEach(key => {
          errorStr += errors[key];
      })
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
                <TextField
                  name="tags"
                  label="Tags"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ReactQuill
                  value={this.state.content}
                  modules={QuillSettings.modules}
                  formats={QuillSettings.formats}
                  name="content"
                  onChange={this.handleQuillChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={this.handleSubmit}
                >
                  Submit
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="secondary">
                  {this.props.UI.errors && errorStr}
                </Typography>
              </Grid>
            </Grid>
          </div>
        );
    }
}

PostMydoc.propTypes = {
    postMyDoc: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
})

export default connect(mapStateToProps, { postMyDoc })(withStyles(styles)(PostMydoc));
