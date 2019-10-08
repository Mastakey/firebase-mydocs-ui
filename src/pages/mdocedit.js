import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDoc, deleteMyDoc, editMyDoc } from '../redux/actions/dataActions';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

//Quill
import ReactQuill from 'react-quill';
import QuillSettings from '../components/QuillSettings';
import 'react-quill/dist/quill.snow.css';

const styles = {
    title: {
        display: "inline-block"
    },
    fab: {
        margin: 5
    },
    extendedIcon: {
        marginRight: 5,
    },
    fabDelete: {
        float: "right"
    },
    progress: {
        position: 'absolute'
    }
}

export class mdoc extends Component {
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
        this.handleSave = this.handleSave.bind(this);
      }
    async componentDidMount(){
        const id = this.props.match.params.id;
        await this.props.getMyDoc(id);
        let tags = '';
        if (this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.tags) {
            tags = JSON.stringify(this.props.data.mydoc.mdoc.tags)
            .slice(1, -1)
            .replace(new RegExp('"', "g"), "");
        }
          this.setState({
            content: this.props.data.mydoc.content,
            delta: this.props.data.mydoc.delta,
            tags: tags
          });
    }
    handleDelete(){
        this.props.deleteMyDoc(this.props.match.params.id, this.props.history);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleQuillChange(value, delta, source, editor){
        this.setState({ content: editor.getHTML(), delta: editor.getContents() });
    }
    handleSave(){
        let mdoc = this.props.data.mydoc.mdoc;
        const id = this.props.match.params.id;
        mdoc.content = this.state.content;
        mdoc.delta = this.state.delta;
        mdoc.tags = this.state.tags.split(",").map(tag => tag.trim());
        //TODO
        //category
        //title
        //tags
        this.props.editMyDoc(id, mdoc);
    }
    render() {
        const classes = this.props.classes;
        const loading = this.props.data.loading;
        const mdocLoading = this.props.data.mydoc.loading;
        const errors = this.props.UI.errors;
        let markup;
        if (errors){
            markup = (
                <Fragment>
                    {errors.error}
                </Fragment>
            )
        }
        else if (this.props.data && this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.title && !loading){
            //console.log(this.state.tags);
            if (this.props.data.mydoc.delta){
            }
            markup = (
              <Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" className={classes.title}>
                      {this.props.data.mydoc.mdoc.title}
                    </Typography>
                  </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="tags"
                            label="Tags"
                            variant="outlined"
                            value = {this.state.tags}
                            onChange={this.handleChange}
                                fullWidth
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
                      onClick={this.handleSave}
                                disabled={mdocLoading}
                    >
                      Save
                      {mdocLoading && (
                        <CircularProgress
                          size={30}
                          className={classes.progress}
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            );
        }
        else {
            markup = (
                <Fragment>
                    <h1>Loading...</h1>
                </Fragment>    
            )
        }
        return (
            <Fragment>
                {markup}
            </Fragment>
            
        )
    }
}

mdoc.propTypes = {
    classes: PropTypes.object.isRequired,
    getMyDoc: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {
  getMyDoc,
  deleteMyDoc,
  editMyDoc
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(mdoc));
