import logo from '../images/header-logo.svg';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useLocation, Link } from 'react-router-dom';
import { elemClasses } from '../utils/constans';

export default function Header({ handleLoginClick }) {
  const { header, headerLogo, headerInfoContainer, headerEmail } = elemClasses;
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className={header}>
      <img className={headerLogo} src={logo} alt="логотип Mesto" />
      <div className={headerInfoContainer}>
        {location.pathname === '/' && (
          <span className={headerEmail}>{currentUser.email}</span>
        )}
        <Link
          to={
            (location.pathname === '/' && '/sign-in') ||
            (location.pathname === '/sign-in' && '/sign-up') ||
            (location.pathname === '/sign-up' && '/sign-in')
          }
        >
          <button onClick={handleLoginClick} className="header__link">
            {(location.pathname === '/' && 'Выйти') ||
              (location.pathname === '/sign-in' && 'Регистрация') ||
              (location.pathname === '/sign-up' && 'Войти')}
          </button>
        </Link>
      </div>
    </header>
  );
}
