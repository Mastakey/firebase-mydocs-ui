import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDocs } from '../redux/actions/dataActions';
import { Link as RouterLink } from "react-router-dom";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
    paper: {
        padding: 10
    },
    header: {
        marginBottom: 10
    }
}

export class home extends Component {
    state = {
        mydocs: null
    }
    async componentDidMount(){
        this.props.getMyDocs();
    }
    render() {
        let docsMarkup;
        const classes = this.props.classes;
        console.log(this.props);
        //const { classes } = this.props;
        //this.state.mydocs contains all mydocs
        if (this.props.data.mydocs){
            let key = 0;
            docsMarkup = this.props.data.mydocs.map(mydoc => {
                key++;
                let link = `/mdoc/${mydoc.id}`;
                return (
                  <Grid item xs={3} key={key}>
                        <RouterLink to={link}>
                            <Paper key={key} className={classes.paper}>
                                <Typography variant="h5" component="h3">
                                {mydoc.title}
                                </Typography>
                                <Typography variant="subtitle2">
                                {mydoc.updatedAt ? mydoc.updatedAt : mydoc.createdAt}
                                </Typography>
                            </Paper>
                        </RouterLink>
                  </Grid>
                );
            }); 
            console.log(docsMarkup);
        }
        else {
            docsMarkup = (
                <p>Loading...</p>
            )
        }
        return (
          <div>
            <Typography variant="h2" className={classes.header}>Home</Typography>
            <Grid container spacing={3}>
              {docsMarkup}
            </Grid>
          </div>
        );
    }
}

home.propTypes = {
    getMyDocs: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getMyDocs})(withStyles(styles)(home));
