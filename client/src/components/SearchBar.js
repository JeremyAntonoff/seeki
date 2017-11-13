import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';
import './searchbar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { formVal: '', redirect: false };
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.getResults(this.state.formVal);
    this.setState({ formVal: '', redirect: true });
  }
  render() {
    const { redirect } = this.state;
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)} className="form">
          <input
            type="text"
            value={this.state.formVal}
            onChange={e => this.setState({ formVal: e.target.value })}
            placeholder={this.props.placeholder}
          />
        </form>
        {redirect && <Redirect to={'/results'} />}
      </div>
    );
  }
}

export default connect(null, actions)(SearchBar);
