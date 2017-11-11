import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Redirect } from 'react-router-dom';
import Button from './Button';
import './card.css';
let count = 0;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  componentDidUpdate() {
    for (var ref in this.refs) {
      this.refs[ref].load();
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
          <div className="audio-controls">
            {this.renderAudio(result.previewURL)}
          </div>
          <div className="card-button">
            <Button
              results={this.props.results[index]}
              id={result.id}
              buttonText={this.props.button}
              dashboard={this.props.dashboard}
            />
          </div>
        </li>
      );
    });
  }
}

export default connect(null, actions)(Card);
