import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getMyDocs } from '../redux/actions/dataActions';
import MdocList from "../components/MdocList";
import TagList from "../components/TagList";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    paper: {
        padding: 10
    },
    header: {
        marginBottom: 10
    },
    mdoc: {
        
    }
}

export class home extends Component {
    state = {
        mydocs: null
    }
    async componentDidMount(){
        this.props.getMyDocs();
    }
    getTags = (mydocs) => {
        let tags = new Set();
        mydocs.forEach(mdoc => {
            if (mdoc.tags) {
                mdoc.tags.forEach(tag => {
                    tags.add(tag);
                })
            }
        })
        tags = Array.from(tags);
        return tags;
    }
    render() {
        let docsMarkup, tagsMarkup;
        const loading = this.props.data.loading;
        const mydocs = this.props.data.mydocs;
        
        if (this.props.data.mydocs && !loading){
            const tags = this.getTags(mydocs);
            tagsMarkup = <TagList tags={tags} />;
            docsMarkup = <MdocList name="Home" mydocs={mydocs} />
        }
        else {
            docsMarkup = (
                <p>Loading...</p>
            )
        }
        return (
          <Fragment>
            {tagsMarkup}
            {docsMarkup}
          </Fragment>
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
