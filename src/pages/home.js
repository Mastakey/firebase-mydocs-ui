import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDocs } from '../redux/actions/dataActions';

//Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export class home extends Component {
    state = {
        mydocs: null
    }
    async componentDidMount(){
        this.props.getMyDocs();
    }
    render() {
        let docsMarkup;
        //this.state.mydocs contains all mydocs
        if (this.props.data.mydocs){
            let key = 0;
            docsMarkup = this.props.data.mydocs.map(mydoc => {
                key++;
                return (
                    <Grid item xs={3}>
                        <Paper key={key}>{mydoc.title}</Paper>
                    </Grid>
                )
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
                <h1>Home</h1>
                <Grid container spacing={3}>
                    {docsMarkup}
                </Grid>
            </div>
        )
    }
}

home.propTypes = {
    getMyDocs: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getMyDocs})(home);
