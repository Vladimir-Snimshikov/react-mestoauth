import logo from '../images/header-logo.svg';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import { useLocation, Link } from 'react-router-dom';

export default function Header({ handleLoginClick, isLoggin }) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__info-container">
        {location.pathname === '/react-mestoauth' && (
          <span className="header__email">{currentUser.email}</span>
        )}
        <Link
          to={
            (location.pathname === '/react-mestoauth' && '/sign-in') ||
            (location.pathname === '/sign-in' && '/sign-up') ||
            (location.pathname === '/sign-up' && '/sign-in')
          }
        >
          <button onClick={handleLoginClick} className="header__link">
            {(location.pathname === '/react-mestoauth' && 'Выйти') ||
              (location.pathname === '/sign-in' && 'Регистрация') ||
              (location.pathname === '/sign-up' && 'Войти')}
          </button>
        </Link>
      </div>
    </header>
  );
}
