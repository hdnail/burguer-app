import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route, Redirect} from 'react-router-dom';
import Users from './containers/Users/Users';
import Courses from './containers/Courses/Courses';
import Course from './containers/Course/Course';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <NavLink to="/users">Users</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/courses">Courses</NavLink>
          </nav>
          <div>
            <Switch>
              <Route path="/" exact />
              <Route path="/users" exact component={Users} />
              <Route path="/courses" component={Courses} />
              <Route render={() => <h1>Not found...</h1>} />
              <Redirect from="/all-courses" to="/courses" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
