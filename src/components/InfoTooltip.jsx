import { elemClasses } from '../utils/constans';

const {
  auth,
  popup,
  popupOpened,
  popupContainer,
  authTooltipImage,
  authTooltipImage_error,
  authTooltipText,
  popupExitButton,
} = elemClasses;

function InfoTooltip({ onClose, state }) {
  return (
    <div className={`${popup}  ${state.isOpen ? popupOpened : ''}`}>
      <div className={`${auth} ${popupContainer}`}>
        <div
          className={`${authTooltipImage} ${
            state.error ? authTooltipImage_error : ''
          }`}
        />
        <p className={authTooltipText}>{state.message}</p>
        <button
          type="button"
          className={popupExitButton}
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
