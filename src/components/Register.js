import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();

    auth.register(password, email).then((res) => {
      if (res.status === 201) {
        navigate('/sign-in', { replace: true });
      }
    });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="auth__input"
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          name="password"
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
