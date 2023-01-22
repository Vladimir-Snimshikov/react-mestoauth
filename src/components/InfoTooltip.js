function InfoTooltip({ message, onClose, isOpen }) {
  return (
    <div className={` popup  ${isOpen ? `popup_opened` : ''}`}>
      <div className=" auth popup__container">
        <div
          className={`auth__tooltip-image ${
            !message ? 'auth__tooltip-image_error' : ''
          }`}
        />
        <p className="auth__tooltip-text">
          {message
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>

        <button
          type="button"
          className="popup__exit-button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
