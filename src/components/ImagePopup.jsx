import { elemClasses } from '../utils/constans';
import { selectCardForImgPopup } from '../store/cardsSlice';
import { useSelector } from 'react-redux';

const {
  popup,
  popupTypeLargePicture,
  popupOpened,
  popupExitButton,
  largePicture,
  largePictureImg,
  largePictureSignature,
} = elemClasses;

export default function ImagePopup({ isOpen, onClose }) {
  const cardForImgPopup = useSelector(selectCardForImgPopup);
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
        <img
          className={largePictureImg}
          src={cardForImgPopup?.link}
          alt={cardForImgPopup?.name}
        />
        <figcaption className={largePictureSignature}>
          {cardForImgPopup?.name}
        </figcaption>
      </figure>
    </div>
  );
}
