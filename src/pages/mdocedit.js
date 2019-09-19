import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDoc, deleteMyDoc } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

//Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//Quill
import ReactQuill from 'react-quill';
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
    state = {
        mdoc: null
    };
    async componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        await this.props.getMyDoc(id);
    }
    handleDelete(){
        console.log(this.props.data);
        this.props.deleteMyDoc(this.props.match.params.id, this.props.history);
    }
    handleEdit(){

    }
    render() {
        const classes = this.props.classes;
        let markup;
        console.log(this.props);

        if (this.props.data && this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.title){
            markup = (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h2" className={classes.title}>{this.props.data.mydoc.mdoc.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><span dangerouslySetInnerHTML={{ __html: this.props.data.mydoc.content }} /></Typography>
                        </Grid>
                        <Grid item xs={12}>

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
  deleteMyDoc
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(mdoc));
