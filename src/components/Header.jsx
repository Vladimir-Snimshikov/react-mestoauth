import logo from '../images/header-logo.svg';
import { useLocation, Link } from 'react-router-dom';
import { elemClasses } from '../utils/constans';
import { selectUserInfo } from '../store/currentUserInfoSlice';
import { useSelector } from 'react-redux';

const { header, headerLogo, headerInfoContainer, headerEmail } = elemClasses;

export default function Header({ handleLoginClick }) {
  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);

  return (
    <header className={header}>
      <img className={headerLogo} src={logo} alt="логотип Mesto" />
      <div className={headerInfoContainer}>
        {location.pathname === '/' && (
          <span className={headerEmail}>{userInfo.email}</span>
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
