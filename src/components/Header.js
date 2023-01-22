import logo from '../images/header-logo.svg';
import { useLocation, Link } from 'react-router-dom';
export default function Header() {
  const location = useLocation();
  console.log(location);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__info-container">
        {location.pathname === '/' && (
          <span className="header__email">shdjakhadsk</span>
        )}
        <Link
          to={
            (location.pathname === '/' && '/login') ||
            (location.pathname === '/login' && '/register') ||
            (location.pathname === '/register' && '/login ')
          }
        >
          <button className="header__link">
            {(location.pathname === '/' && 'Выйти') ||
              (location.pathname === '/login' && 'Регистрация') ||
              (location.pathname === '/register' && 'Войти')}
          </button>
        </Link>
      </div>
    </header>
  );
}
