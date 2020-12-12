import React from 'react';
import './Header.css';
import headerLogo from '../../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Site Logo" />
            <button className="header__button" href="#">Find jobs</button>
            <button className="header__button" href="#">Reset data</button>
            <a className="header__button header__button_right" href="http://www.wschutte.com" target="_blank" rel="noreferrer">Developer / William Schutte</a>
        </header>
    );
}

export default Header;