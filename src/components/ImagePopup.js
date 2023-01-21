export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`popup popup_type_large-picture ${
        isOpen ? `popup_opened` : ''
      }`}
    >
      <figure className="large-picture">
        <button
          type="button"
          className="popup__exit-button"
          aria-label="закрыть форму"
        ></button>
        <img className="large-picture__img" src={card.link} alt={card.name} />
        <figcaption className="large-picture__signature">
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
}
