import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './Card';
import './card.css';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getSavedItems();
  }
  render() {
    return (
      <ul>
        <Card
          results={this.props.savedItems}
          button={'DELETE'}
          dashboard={true}
        />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.savedItems);
  return { savedItems: state.savedItems };
}

export default connect(mapStateToProps, actions)(Dashboard);
