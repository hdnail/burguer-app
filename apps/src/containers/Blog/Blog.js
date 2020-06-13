import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }

    componentDidMount() {
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
                this.setState({error: true});
            });
    }

    render () {

        if (this.state.error) {
            return (
                <p style={{textAlign:'center'}}>Something went wrong!</p>
            );
        }
        return (
            <div>
                <section className="Posts">
                    { this.state.posts.map(
                        post => <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} /> 
                        )
                    }
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;