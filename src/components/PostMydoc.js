import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postMyDoc } from '../redux/actions/dataActions';

//MUI
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class PostMydoc extends Component {
    state = {
        title: '',
        category: '',
        content: ''
    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.postMyDoc(this.state);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
    render() {
        
        return (
          <div>
            <h1>Post</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
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
                    name="content"
                    label="Content"
                    /*style={{ height: 300 }}*/
                    placeholder="Placeholder"
                    helperText="Enter Contents"
                    fullWidth
                    multiline
                    margin="normal"
                            variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
              </Grid>
            </Grid>

            <form>
              <input name="title" onChange={this.handleChange}></input>
              <input name="category" onChange={this.handleChange}></input>
              <textarea name="content" onChange={this.handleChange}></textarea>
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
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
