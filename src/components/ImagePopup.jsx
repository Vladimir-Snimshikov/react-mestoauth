import { elemClasses } from '../utils/constans';
export default function ImagePopup({ card, isOpen, onClose }) {
  const {
    popup,
    popupTypeLargePicture,
    popupOpened,
    popupExitButton,
    largePicture,
    largePictureImg,
    largePictureSignature,
  } = elemClasses;
  return (
    <div
      onClick={onClose}
      className={`${popup} ${popupTypeLargePicture} ${
        isOpen ? popupOpened : ''
      }`}
    >
      <figure className={largePicture}>
        <button
          type="button"
          className={popupExitButton}
          aria-label="закрыть форму"
        ></button>
        <img className={largePictureImg} src={card.link} alt={card.name} />
        <figcaption className={largePictureSignature}>{card.name}</figcaption>
      </figure>
    </div>
  );
}
