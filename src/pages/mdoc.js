import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDoc, deleteMyDoc } from '../redux/actions/dataActions';
export class mdoc extends Component {
    state = {
        mdoc: null
    };
    async componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getMyDoc(id);
    }
    handleDelete(){
        console.log(this.props.data);
        this.props.deleteMyDoc(this.props.match.params.id, this.props.history);
    }
    render() {
        let markup;
        console.log(this.props);
        if (this.props.data && this.props.data.mydoc.mdoc && this.props.data.mydoc.mdoc.title){
            markup = (
                <Fragment>
                    <h1>{this.props.data.mydoc.mdoc.title}</h1>
                    <p>{this.props.data.mydoc.content}</p>
                    <button onClick={this.handleDelete.bind(this)}>Delete</button>
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
  getMyDoc,
  deleteMyDoc
};

export default connect(mapStateToProps, mapActionsToProps)(mdoc);
