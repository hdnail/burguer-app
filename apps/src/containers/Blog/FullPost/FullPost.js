import React, { Component } from 'react';
import './FullPost.css';
import axios from '../../../axios';

class FullPost extends Component {

    state = {
        post: null
    };

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    loadData = () => {
        if (this.props.match.params.id && (this.state.post == null || this.state.post.id !== +this.props.match.params.id)) {
            axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        post: response.data
                    });
                });
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    render () {
        if (this.props.match.params.id == null) {
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