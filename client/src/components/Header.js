import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  renderContent() {
    if (!this.props.auth) {
      return (
        <div>
          <li>
            <a className="login-button" href="/auth/spotify">
              <img
                src="/images/spotify.png"
                className="loginIMG"
                alt="Spotify login"
              />
              Spotify Login
            </a>
          </li>
          <li>
            <a className="login-button" href="/auth/google">
              <img
                src="/images/google.png"
                className="loginIMG"
                alt="Google login"
              />
              Google Login
            </a>
          </li>
        </div>
      );
    } else {
      const { googleName } = this.props.auth.google || {};
      const { spotifyID } = this.props.auth.spotify || {};
      return (
        <div>
          <p className="welcome-msg">
            Welcome {googleName || spotifyID || 'User!'}!
          </p>
          <li />
          <li>
            <a className="login-button logged-in" href="/dashboard">
              Saved Items
            </a>
          </li>
          <li>
            <a className="login-button logged-in" href="/auth/logout">
              Logout
            </a>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav className="top-header">
        <div className="container">
          <a href="/" className="logo">
            <img src="/images/logo.png" alt="logo" />
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
