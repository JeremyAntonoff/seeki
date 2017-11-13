import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AlertContainer from 'react-alert';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.showAlert = this.showAlert.bind(this);
  }
  alertOptions = {
    offset: 0,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  };

  handleSaved(obj, id) {
    if (!this.props.dashboard) {
      this.setState({ disabled: true });
      this.props
        .saveResultItem(obj)
        .then(() => this.showAlert(this.props.alert));
    } else {
      this.props.deleteSavedItem(id);
    }
  }

  showAlert = alertMessage => {
    this.msg.success('Item has been saved!', {
      time: 2500
    });
  };

  render() {
    if (!this.props.auth) {
      return <div className="require-login">Sign in to save!</div>;
    }
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
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
