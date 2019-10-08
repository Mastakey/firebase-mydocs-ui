import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyDocs } from '../redux/actions/dataActions';
import MdocList from "../components/MdocList";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";


const styles = {
}

export class tag extends Component {
    async componentDidMount(){
        this.props.getMyDocs();
    }
    render() {
        let docsMarkup;
        const loading = this.props.data.loading;
        const tagname = this.props.match.params.name;
        const mydocs = this.props.data.mydocs;

        if (this.props.data.mydocs && !loading) {
            let tagdocs = []
            mydocs.forEach(mdoc => {
                let tags = mdoc.tags;
                if (tags && tags.includes(tagname)){
                    tagdocs.push(mdoc);
                }
            });
            docsMarkup = <MdocList name={tagname} mydocs={tagdocs} />;
        }
        else {
            docsMarkup = <p>Loading...</p>;
        }
        return (
            <div>
                {docsMarkup}
            </div>
        )
    }
}

tag.propTypes = {
    getMyDocs: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getMyDocs })(withStyles(styles)(tag));
