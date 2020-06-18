import React, { Component } from 'react';
import {NavLink, Route, Switch } from 'react-router-dom';
import Posts from '../Blog/Posts/Posts';
import './Blog.css';

// Lazy loading / Code Splitting
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('../Blog/NewPost/NewPost');
});

class Blog extends Component {

    state = {
        auth: true
    };

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: "/new-post",
                                    hash: '#',
                                    search: '?pepe=hola'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />

                    {/*
                        <Route from="/" to="/posts" />
                        <Route path="/" component={Posts} />
                    */}
                    
                </Switch>                
            </div>
        );
    }
}

export default Blog;