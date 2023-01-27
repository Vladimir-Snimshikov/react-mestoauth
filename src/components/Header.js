import logo from '../images/header-logo.svg';
import { useLocation, Link } from 'react-router-dom';
export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__info-container">
        {location.pathname === '/' && (
          <span className="header__email">shdjakhadsk</span>
        )}
        <Link
          to={
            (location.pathname === '/' && '/sign-in') ||
            (location.pathname === '/sign-in' && '/sign-up') ||
            (location.pathname === '/sign-up' && '/sign-in')
          }
        >
          <button className="header__link">
            {(location.pathname === '/' && 'Выйти') ||
              (location.pathname === '/sign-in' && 'Регистрация') ||
              (location.pathname === '/sign-up' && 'Войти')}
          </button>
        </Link>
      </div>
    </header>
  );
}
