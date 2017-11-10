import React from 'react';
import './splash.css';
import SearchBar from './SearchBar';
const Splash = () => (
  <div className="splash-page">
    <div className="container">
      <div className="slogan">
        <h1>Seek&nbsp;music.&nbsp;Induldge&nbsp;life.</h1>
      </div>
      <div className="login-slogan">
        <h2>Login to save individual search results!</h2>
      </div>
      <SearchBar placeholder={'Start your music journey...'} />
    </div>
  </div>
);

export default Splash;
