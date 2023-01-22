import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form">
        <input
          type="email"
          className="auth__input"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>
      <Link className="auth__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}
export default Register;
