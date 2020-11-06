import React from 'react';
import headerLogo from '../images/logo.svg';

function App() {
  return (
    <div className="app">
      <header className="header">
        <img className="header__logo" src={headerLogo}></img>
        <a className="header__button">Find jobs</a>
        <a className="header__button">Reset data</a>
        <a className="header__button header__button_right" href="www.wschutte.com" target="_blank">Developer / William Schutte</a>
      </header>
      <main className="main">
        <section className="search">
          <div className="search__text">
            <label className="search__label" for="what">What</label>
            <input className="search__input" id="what" placeholder="Job title, keywords, etc"></input>
          </div>
          <div className="search__text">
            <label className="search__label">Where</label>
            <input className="search__input" placeholder="City, state, zip code, etc"></input>
          </div>
          <label className="search__toggle">
            <input className="search__toggle-input" type="checkbox" />
            <span className="search__toggle-text">Entry Level</span>
          </label>
          <label className="search__toggle">
            <input className="search__toggle-input" type="checkbox" />
            <span className="search__toggle-text">Newly Posted</span>
          </label>
          <button className="search__submit">Find jobs</button>
        </section>
      </main>
      
    </div>
  );
}

export default App;
