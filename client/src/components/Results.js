import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import SearchBar from './SearchBar';
import AlertContainer from 'react-alert';
import Card from './Card';
import './results.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.alertOptions = {
      offset: 0,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }

  showAlert = alertMessage => {
    this.msg.success('Item has been saved!', {
      time: 2500
    });
  };

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
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <div className="results-section">
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
              <Card
                results={this.props.results}
                button={'SAVE THIS SONG'}
                alert={() => this.showAlert(this.props.alert)}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { results: state.results };
}

export default connect(mapStateToProps, actions)(Results);
