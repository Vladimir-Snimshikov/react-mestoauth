import React, { useEffect } from 'react';
import { elemClasses } from '../utils/constans.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup } from '../store/popupSlice.js';
import {
  selectedCard,
  likeTheCard,
  selectCardTheLikeErrormMessage,
  selectedCardForImgPopup,
} from '../store/cardsSlice.js';

export default function Card({ card, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    cardsLikeImg,
    cardsLikeImgActive,
    cardsItem,
    cardsDleteButton,
    cardsTitle,
    cardsLikesCounter,
    cardsImg,
  } = elemClasses;
  const dispatch = useDispatch();
  const cardTheLikeErrormMessage = useSelector(selectCardTheLikeErrormMessage);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${cardsLikeImg} ${
    isLiked && cardsLikeImgActive
  }`;
  const isOwn = card.owner._id === currentUser._id;

  useEffect(() => {
    if (cardTheLikeErrormMessage) {
      console.log(cardTheLikeErrormMessage);
    }
  }, [cardTheLikeErrormMessage]);

  function handleCardClick() {
    dispatch(openPopup('imagePopupPopup'));
    dispatch(selectedCardForImgPopup(card));
  }

  function handleLikeClick() {
    dispatch(likeTheCard({ cardId: card._id, isLiked }));
  }

  function handleCardDelete() {
    dispatch(openPopup('confirmDeletePopup'));
    dispatch(selectedCard(card));
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
        className={cardsImg}
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
