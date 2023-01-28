import React, { useState } from 'react';

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
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={formValue.email}
          name="email"
          onChange={handleChange}
          type="email"
          className="auth__input"
          placeholder="Email"
          required
        />
        <input
          value={formValue.password}
          name="password"
          onChange={handleChange}
          type="password"
          className="auth__input"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
