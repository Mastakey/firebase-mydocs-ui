import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMyDoc} from '../redux/actions/dataActions';
export class mdoc extends Component {
    state = {
        mdoc: null
    };
    async componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getMyDoc(id);
    }
    render() {
        let markup;
        console.log(this.props);
        if (this.props.data && this.props.data.mydoc && this.props.data.mydoc.title){
            markup = (
                <Fragment>
                    <h1>Mdoc Viewer</h1>
                    <p>{this.props.data.mydoc.title}</p>
                </Fragment>
            )
        }
        else {
            markup = (
                <Fragment>
                    <h1>Mdoc Viewer</h1>
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
    getMyDoc: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    data: state.data
})

const mapActionsToProps = {
    getMyDoc
}

export default connect(mapStateToProps, mapActionsToProps)(mdoc);
