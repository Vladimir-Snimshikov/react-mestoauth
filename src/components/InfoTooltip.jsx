function InfoTooltip({ onClose, state }) {
  return (
    <div className={` popup  ${state.isOpen ? `popup_opened` : ''}`}>
      <div className=" auth popup__container">
        <div
          className={`auth__tooltip-image ${
            state.error ? 'auth__tooltip-image_error' : ''
          }`}
        />
        <p className="auth__tooltip-text">{state.message}</p>
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
