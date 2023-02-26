import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { elemClasses } from '../utils/constans';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup } from '../store/popupSlice.js';
import { selectCardsData } from '../store/cardsSlice';

export default function Main(props) {
  const dispatch = useDispatch();
  const currentUser = React.useContext(CurrentUserContext);
  const cardsData = useSelector(selectCardsData);
  const {
    content,
    profile,
    profileConteiner,
    profileAvatarContainer,
    profileImg,
    profileAvatarButton,
    profileInfoContainer,
    profileNameContainer,
    profileEditButton,
    profileProfession,
    profileAddButton,
    cards,
    places,
  } = elemClasses;
  return (
    <main className={content}>
      <section className={profile}>
        <div className={profileConteiner}>
          <div className={profileAvatarContainer}>
            <img
              className={profileImg}
              src={currentUser.avatar}
              alt="фото профиля"
            />
            <button
              onClick={() => dispatch(openPopup('editAvatarPopup'))}
              className={profileAvatarButton}
              type="button"
              aria-label="редактировать аватар"
            ></button>
          </div>
          <div className={profileInfoContainer}>
            <div className={profileNameContainer}>
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className={profileEditButton}
                aria-label="редактировать профиль"
                onClick={() => dispatch(openPopup('editProfilePopup'))}
              ></button>
            </div>
            <p className={profileProfession}>{currentUser.about}</p>
          </div>
          <button
            type="button"
            className={profileAddButton}
            aria-label="добавить карточку"
            onClick={() => dispatch(openPopup('addPlacePopupPopup'))}
          ></button>
        </div>
      </section>
      <section className={places} aria-label="Секция с карточками">
        <ul className={cards}>
          {cardsData.map((card) => {
            return <Card key={card._id} card={card} />;
          })}
        </ul>
      </section>
    </main>
  );
}
