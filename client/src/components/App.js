import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import Header from './Header';
import Splash from './Splash';
import Results from './Results';
import Dashboard from './Dashboard';
import './app.css';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Splash} />
          <Route path="/results" component={Results} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
