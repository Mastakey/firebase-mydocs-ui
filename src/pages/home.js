import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDocs } from '../redux/actions/dataActions';

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
                    <p key={key}>{mydoc.title}</p>
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
                {docsMarkup}
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
