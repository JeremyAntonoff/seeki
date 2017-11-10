import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Redirect } from 'react-router-dom';
import './card.css';
let count = 0;

class Card extends Component {
  componentDidUpdate() {
    for (var ref in this.refs) {
      this.refs[ref].load();
    }
  }

  handleSaved(obj, id) {
    if (!this.props.dashboard) {
      this.props.saveResultItem(obj);
    } else {
      this.props.deleteSavedItem(id);
      return <Redirect to="/dashboard" />;
    }
  }

  renderAudio(url) {
    count++;
    return (
      <audio controls ref={count}>
        <source src={url} />
      </audio>
    );
  }

  render() {
    if (!this.props.results) {
      return <div className="no-results">Loading...</div>;
    } else if (this.props.results.length < 1) {
      return <div>No results found</div>;
    }
    return this.props.results.map((result, index) => {
      return (
        <li key={index} className="result-card">
          <div className="header-card">
            <a href={result.artistURL || '/'} target="_blank">
              <h2>{result.artist || 'No Artists Name'}</h2>
            </a>
            <a href={result.trackUrl || '/'} target="_blank">
              <h3>{result.track || 'No Track Name'}</h3>
            </a>
          </div>
          <a href={result.albumURL || '/'} target="_blank">
            <img
              className="card-img"
              src={result.albumArt || '/images/coverart.jpg'}
              alt={result.track || 'cover art'}
            />
          </a>
          {this.renderAudio(result.previewURL)}
          <div>
            <a
              onClick={() =>
                this.handleSaved(this.props.results[index], result.id)}
            >
              {this.props.button}
            </a>
          </div>
        </li>
      );
    });
  }
}

export default connect(null, actions)(Card);
