import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertContainer from 'react-alert';
import * as actions from '../actions';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.showAlert = this.showAlert.bind(this);
  }
  alertOptions = {
    offset: 65,
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

export default connect(null, actions)(Button);
