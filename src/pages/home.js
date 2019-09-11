import React, { Component } from 'react'
import axios from 'axios';

export class home extends Component {
    state = {
        screams: null
    }
    async componentDidMount(){
        try {
            let mydocs = await axios.get(`/mydoc`);
            console.log(mydocs.data);
            this.setState({
                screams: mydocs.data
            });
        }
        catch (err) {
            console.log(err);
        }


    }
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

export default home
