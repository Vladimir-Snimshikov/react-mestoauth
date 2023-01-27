import React, { useState } from 'react';

function Login() {
  const [emailState, setEmailState] = useState();
  const [passwordState, setPasswordState] = useState();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log({
      email: emailState,
      password: passwordState,
    });
    return {
      email: emailState,
      password: passwordState,
    };
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={(evt) => setEmailState({ email: evt.target.value })}
          type="email"
          className="auth__input"
          placeholder="Email"
          required
        />
        <input
          onChange={(evt) => setPasswordState({ password: evt.target.value })}
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
