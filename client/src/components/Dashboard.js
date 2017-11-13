import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './Card';
import './dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSavedItems();
  }

  renderTopContent(error) {
    return (
      <div className="dashboard-page">
        <a href="/results">
          <div className="return-search">SEARCH MORE MUSIC</div>
          {error}
        </a>
      </div>
    );
  }

  render() {
    if (!this.props.savedItems) {
      return this.renderTopContent();
    } else if (this.props.savedItems < 1) {
      return this.renderTopContent(
        <div className="error-msg">No results found!</div>
      );
    }

    return (
      <div className="dashboard-page">
        <a href="/results">
          <div className="return-search">SEARCH MORE MUSIC</div>
        </a>
        <div className="dashboard-container">
          <ul>
            <Card
              results={this.props.savedItems}
              button={'DELETE'}
              dashboard={true}
            />
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { savedItems: state.savedItems };
}

export default connect(mapStateToProps, actions)(Dashboard);
