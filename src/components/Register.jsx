import { useState } from 'react';
import { Link } from 'react-router-dom';
import { elemClasses } from '../utils/constans';

const { auth, authTitle, authInput, authButton, authLink, form } = elemClasses;

function Register({ handleRegisterClick }) {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

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

    handleRegisterClick(password, email);
  };

  return (
    <section className={auth}>
      <h2 className={authTitle}>Регистрация</h2>
      <form onSubmit={handleSubmit} className={form}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className={authInput}
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className={authInput}
          placeholder="Пароль"
          required
        />
        <button type="submit" className={authButton}>
          Зарегистрироваться
        </button>
      </form>
      <Link className={authLink} to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}
export default Register;
