import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: []
    };

    postSelectedHandler = (id) => {
        this.props.history.push(this.props.match.url + '/' + id);
    }

    componentDidMount() {
        console.log(this.props);
        
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4).map(
                    post => {
                        return {
                            ...post,
                            author: 'Max'
                        }
                    }
                );                
                this.setState({
                    posts: posts
                });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <section className="Posts">
                { this.state.posts.map(
                    post => (
                        <Link to={this.props.match.url + '/' + post.id} key={post.id}>
                            <Post
                                title={post.title}
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)} />
                        </Link>
                    )
                ) }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;