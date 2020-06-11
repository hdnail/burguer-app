import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        post: null
    };

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    componentDidUpdate() {
        if (this.props.id && (this.state.post == null || this.state.post.id !== this.props.id)) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({
                        post: response.data
                    });
                });
        }
    }

    render () {

        if (this.props.id == null) {
            return (
                <p style={{textAlign:'center'}}>Please select a Post!</p>
            );
        }
        
        if (this.state.post == null) {
            return (
                <p style={{textAlign:'center'}}>Loading...</p>
            );
        }

        return (
            <div className="FullPost">
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                </div>
            </div>
        );
    }
}

export default FullPost;