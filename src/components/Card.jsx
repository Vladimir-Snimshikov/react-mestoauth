import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like-img ${
    isLiked && 'cards__like-img_active'
  }`;

  const isOwn = card.owner._id === currentUser._id;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="cards__item" key={card._id}>
      {isOwn && (
        <button
          onClick={handleCardDelete}
          type="button"
          className="cards__delete-button"
          aria-label="удалить картинку"
        ></button>
      )}
      <img
        className="cards__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className="cards__title">{card.name}</h2>
      <button
        type="button"
        onClick={handleLikeClick}
        className={cardLikeButtonClassName}
        aria-label="поставить лайк"
      ></button>
      <p className="cards__likes-counter">{card.likes.length}</p>
    </li>
  );
}
