import React, { Component } from 'react'
import PostMydoc from '../components/PostMydoc';


export class post extends Component {
    render() {
        return (
            <div>
                <PostMydoc history={this.props.history}/>
            </div>
        )
    }
}

export default post;