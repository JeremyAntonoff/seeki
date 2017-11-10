import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import './app.css';
import Header from './Header';
import Splash from './Splash';
import Results from './Results';

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
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
