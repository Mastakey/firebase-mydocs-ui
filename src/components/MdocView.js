import React, { Component, Fragment } from 'react'
export class MdocView extends Component {
    state = {
        mydoc: null
    }
    
    async componentDidMount(){
        const id = this.props.id;
        //console.log(id);
        this.props.getMyDoc(id);
    }
    render() {
        let docMarkup;
        //console.log(this.props.data);
        if (this.props.data){
            docMarkup = (
                <Fragment>
                    <h1>{this.props.data.title}</h1>
                    {this.props.id}
                </Fragment>
            )
        }
        else {
            docMarkup = (
                <Fragment>
                    {this.props.id}
                </Fragment>
            )
        }
        return (
            <Fragment>
                {docMarkup}
            </Fragment>
            
        )
    }
}

export default MdocView;
