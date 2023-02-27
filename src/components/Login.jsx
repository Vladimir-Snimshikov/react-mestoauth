import React, { useState } from 'react';
import { elemClasses } from '../utils/constans';

const { auth, authTitle, authInput, authButton } = elemClasses;

function Login({ handleLoginClick }) {
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

    handleLoginClick(password, email);

    setFormValue({
      password: '',
      email: '',
    });
  };

  return (
    <section className={auth}>
      <h2 className={authTitle}>Вход</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={formValue.email}
          name="email"
          onChange={handleChange}
          type="email"
          className={authInput}
          placeholder="Email"
          required
        />
        <input
          value={formValue.password}
          name="password"
          onChange={handleChange}
          type="password"
          className={authInput}
          placeholder="Пароль"
          required
        />
        <button type="submit" className={authButton}>
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
