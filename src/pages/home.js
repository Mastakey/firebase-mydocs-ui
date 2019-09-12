import React, { Component } from 'react'
import axios from 'axios';

export class home extends Component {
    state = {
        mydocs: null
    }
    async componentDidMount(){
        try {
            const mydocs = await axios.get(`/mydoc`);
            //console.log(mydocs.data);
            this.setState({
                mydocs: mydocs.data
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    render() {
        let docsMarkup;
        //this.state.mydocs contains all mydocs
        if (this.state.mydocs){
            let key = 0;
            docsMarkup = this.state.mydocs.map(mydoc => {
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

export default home
