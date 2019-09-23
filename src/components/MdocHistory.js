import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyDocHistory } from "../redux/actions/dataActions";

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";

const styles = {
    paper: {
        padding: 20
    }
};

export class MdocHistory extends Component {
    async componentDidMount() {
        const id = this.props.id;
        console.log(id);
        await this.props.getMyDocHistory(id);
    }
    render() {
        const classes = this.props.classes;
        const history = this.props.data.mydoc.history;
        return (
            <Fragment>
                {history && 
                    history.map(his => {
                        console.log(his);
                        return (
                        <Fragment>
                            <Typography variant="subtitle">{his.createdAt}</Typography>
                            <Paper className={classes.paper}>
                                <Typography variant="body1" className={classes.mdoc}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                                __html: his.content
                                        }}
                                    />
                                </Typography>
                            </Paper>
                        </Fragment>
                        )
                    })
                }
            </Fragment>
        )
    }
}

MdocHistory.propTypes = {
    getMyDocHistory: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    data: state.data
})

const mapActionsToProps = {
    getMyDocHistory
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MdocHistory));
