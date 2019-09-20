import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDoc, deleteMyDoc, editMyDoc } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

//Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    }
}

export class mdoc extends Component {
    constructor(){
        super();
        this.state = {
          title: '',
          category: '',
          content: '',
          delta: []
        };
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
      }
    async componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        await this.props.getMyDoc(id);
        this.setState({
            content: this.props.data.mydoc.content,
            delta: this.props.data.mydoc.delta
        })
    }
    handleDelete(){
        console.log(this.props.data);
        this.props.deleteMyDoc(this.props.match.params.id, this.props.history);
    }
    handleQuillChange(value, delta, source, editor){
        this.setState({ content: editor.getHTML(), delta: editor.getContents() });
    }
    handleSave(){
        console.log(this.state.content);
        let mdoc = this.props.data.mydoc.mdoc;
        const id = this.props.match.params.id;
        mdoc.content = this.state.content;
        mdoc.delta = this.state.delta;
        //TODO
        //category
        //title
        //tags
        this.props.editMyDoc(id, mdoc);
    }
    render() {
        const classes = this.props.classes;
        let markup;
        console.log(this.props);

        if (this.props.data && this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.title){
            let quillDelta = this.props.data.mydoc.content;
            if (this.props.data.mydoc.delta){
            }
            markup = (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h2" className={classes.title}>{this.props.data.mydoc.mdoc.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ReactQuill 
                                value={this.state.content}
                                modules={QuillSettings.modules}
                                formats={QuillSettings.formats}
                                name='content'
                                onChange={this.handleQuillChange} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleSave} >Save</Button>
                        </Grid>
                    </Grid>

                </Fragment>
            )
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
    data: state.data
})

const mapActionsToProps = {
  getMyDoc,
  deleteMyDoc,
  editMyDoc
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(mdoc));
