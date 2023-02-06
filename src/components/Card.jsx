import React from 'react';
import { elemClasses } from '../utils/constans.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    cardsLikeImg,
    cardsLikeImgActive,
    cardsItem,
    cardsDleteButton,
    cardsTitle,
    cardsLikesCounter,
  } = elemClasses;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${cardsLikeImg} ${
    isLiked && cardsLikeImgActive
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
    <li className={cardsItem} key={card._id}>
      {isOwn && (
        <button
          onClick={handleCardDelete}
          type="button"
          className={cardsDleteButton}
          aria-label="удалить картинку"
        ></button>
      )}
      <img
        className="cards__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className={cardsTitle}>{card.name}</h2>
      <button
        type="button"
        onClick={handleLikeClick}
        className={cardLikeButtonClassName}
        aria-label="поставить лайк"
      ></button>
      <p className={cardsLikesCounter}>{card.likes.length}</p>
    </li>
  );
}