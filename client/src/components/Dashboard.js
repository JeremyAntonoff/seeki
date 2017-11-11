import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './Card';
import './dashboard.css';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getSavedItems();
  }
  render() {
    if (!this.props.savedItems) {
      return (
        <div className="dashboard-page">
          <div className="dashboard-container" />
        </div>
      );
    } else if (this.props.savedItems < 1) {
      return (
        <div className="dashboard-page">
          <div className="dashboard-container">
            <div className="no-results">No results found!</div>
          </div>
        </div>
      );
    }
    return (
      <div className="dashboard-page">
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
  console.log(state.savedItems);
  return { savedItems: state.savedItems };
}

export default connect(mapStateToProps, actions)(Dashboard);
