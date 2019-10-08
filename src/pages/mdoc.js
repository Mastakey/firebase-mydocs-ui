import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDoc, deleteMyDoc } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';
import MdocHistory from '../components/MdocHistory';
import TagList from "../components/TagList";

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";

//Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    paper: {
        padding: 20
    },
    mdoc: {
      lineHeight: 1
    },
    tag: {
        margin: 5
    }
}

export class mdoc extends Component {
    state = {
        mdoc: null
    };
    async componentDidMount(){
        const id = this.props.match.params.id;
        //console.log(id);
        await this.props.getMyDoc(id);
    }
    handleDelete(){
        //console.log(this.props.data);
        this.props.deleteMyDoc(this.props.match.params.id, this.props.history);
    }
    handleEdit(){

    }
    render() {
        const classes = this.props.classes;
        const errors = this.props.UI.errors;
        let markup;
        //console.log(this.props);
        if (errors) {
            markup = (
                <Fragment>
                    {errors.error}
                </Fragment>
            )

        }
        else if (this.props.data && this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.title ){
            markup = (
              <Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" className={classes.title}>
                      {this.props.data.mydoc.mdoc.title}
                    </Typography>

                    <Fab
                      size="small"
                      color="secondary"
                      onClick={this.handleDelete.bind(this)}
                      className={classes.fabDelete}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                  <Grid item xs={12}>
                    {this.props.data.mydoc.mdoc.tags ? (
                      <TagList tags={this.props.data.mydoc.mdoc.tags} />
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="body1" className={classes.mdoc}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: this.props.data.mydoc.content
                          }}
                        />
                      </Typography>
                      <Link to={`/mdoc/edit/${this.props.match.params.id}`}>
                        <Fab
                          size="small"
                          color="default"
                          onClick={this.handleEdit.bind(this)}
                          className={classes.fab}
                        >
                          <EditIcon />
                        </Fab>
                      </Link>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <MdocHistory id={this.props.match.params.id} />
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
  deleteMyDoc
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(mdoc));
