import React, { Component } from 'react';
import { connect } from 'react-redux';
import './results.css';
import SearchBar from './SearchBar';
import * as actions from '../actions/';
import Card from './Card';
class Results extends Component {
  render() {
    if (!this.props.results) {
      return (
        <div className="results-page">
          <div className="top-info">
            <SearchBar placeholder={'Continue your adventure...'} />
            <div className="results-info">
              <ul>
                <li>If logged in click SAVE to save an item!</li>
                <li>*Some albums dont have preview audio available</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (this.props.results < 1) {
      return (
        <div className="results-page">
          <div className="top-info">
            <SearchBar placeholder={'Continue your adventure...'} />
            <div className="results-info">
              <ul>
                <li>If logged in click SAVE to save an item!</li>
                <li>*Some albums dont have preview audio available</li>
              </ul>
              <div className="no-results">No results found!</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="results-page">
        <div className="top-info">
          <SearchBar placeholder={'Continue your adventure...'} />
          <div className="results-info">
            <ul>
              <li>If logged in click SAVE to save an item!</li>
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
