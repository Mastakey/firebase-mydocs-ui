import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyDocHistory } from "../redux/actions/dataActions";

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';


const styles = {
    paper: {
        padding: 20
    },
    heading: {
    },
    root: {
        width:'100%'
    }
};

export class MdocHistory extends Component {
    async componentDidMount() {
        const id = this.props.id;
        //console.log(id);
        await this.props.getMyDocHistory(id);
    }
    render() {
        const classes = this.props.classes;
        const history = this.props.data.mydoc.history;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >History</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div className={classes.root}>
                {history && 
                    history.map(his => {
                        return (
                        <ExpansionPanel className={classes.heading} key={his.createdAt}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>{his.createdAt}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                    <span
                                        dangerouslySetInnerHTML={{
                                                __html: his.content
                                        }}
                                    />
                              </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        )
                    })
                }
                </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
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
