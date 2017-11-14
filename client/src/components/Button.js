import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  handleSaved(obj, id) {
    if (!this.props.dashboard) {
      this.setState({ disabled: true });
      this.props.saveResultItem(obj).then(this.props.alert);
    } else {
      this.props.deleteSavedItem(id);
    }
  }

  render() {
    if (!this.props.auth) {
      return <div className="require-login">Sign in to save!</div>;
    }
    return (
      <div>
        <button
          disabled={this.state.disabled}
          onClick={() => this.handleSaved(this.props.results, this.props.id)}
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Button);
