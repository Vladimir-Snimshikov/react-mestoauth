function Login({ onRegister }) {
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
