import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postMyDoc } from '../redux/actions/dataActions';


//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";

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
      delta: []
    };
    this.handleQuillChange = this.handleQuillChange.bind(this);
  }
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);
        const mdoc = {
          title: this.state.title,
          category: this.state.category,
          content: this.state.content,
          delta: JSON.stringify(this.state.delta)
        };
        console.log(this.props);
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

export default connect(mapStateToProps, { postMyDoc })(withStyles(styles)(PostMydoc));
