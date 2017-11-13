import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import SearchBar from './SearchBar';
import Card from './Card';
import './results.css';

class Results extends Component {
  renderTopContent() {
    return (
      <div className="top-info">
        <SearchBar placeholder={'Continue your adventure...'} />
        <div className="results-info">
          <ul>
            <li>Some albums dont have preview audio available</li>
          </ul>
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.results) {
      return <div className="results-page">{this.renderTopContent()};</div>;
    } else if (this.props.results < 1) {
      return (
        <div className="results-page">
          {this.renderTopContent()}
          <div className="error-msg">No results found!</div>
        </div>
      );
    }
    return (
      <div className="results-page">
        <div className="top-info">
          <SearchBar placeholder={'Continue your adventure...'} />
          <div className="results-info">
            <ul>
              <li>*Some albums dont have preview audio available</li>
            </ul>
          </div>
        </div>
        <div className="results-container">
          <ul>
            <Card results={this.props.results} button={'SAVE THIS SONG'} />
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { results: state.results };
}

export default connect(mapStateToProps, actions)(Results);
