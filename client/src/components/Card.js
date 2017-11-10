import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './card.css';
let count = 0;

class Card extends Component {
  componentDidUpdate() {
    for (var ref in this.refs) {
      this.refs[ref].load();
    }
  }

  handleSaved(obj) {
    this.props.saveResult(obj);
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
      return <div className="no-results">NO RESULTS FOUND</div>;
    }
    return this.props.results.map((result, index) => {
      const artists = result.artists[0] || {};
      const album = result.album || {};
      const track = result.name;
      return (
        <li key={index} className="result-card">
          <div className="header-card">
            <a href={artists.external_urls.spotify || '/'} target="_blank">
              <h2>{artists.name || 'No Artists Name'}</h2>
            </a>
            <a href={result.external_urls.spotify || '/'} target="_blank">
              <h3>{track || 'No Track Name'}</h3>
            </a>
          </div>
          <a href={album.external_urls.spotify || '/'} target="_blank">
            <img
              className="card-img"
              src={album.images[1].url || '/images/coverart.jpg'}
              alt={track || 'cover art'}
            />
          </a>
          {this.renderAudio(result.preview_url)}
          <div>
            <a onClick={() => this.handleSaved(this.props.results[index])}>
              test
            </a>
          </div>
        </li>
      );
    });
  }
}

function mapStateToProps(state) {
  return { results: state.results };
}

export default connect(mapStateToProps, actions)(Card);
