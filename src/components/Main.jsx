import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { elemClasses } from '../utils/constans';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
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
              onClick={props.handleEditAvatarClick}
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
                onClick={props.handleEditProfileClick}
              ></button>
            </div>
            <p className={profileProfession}>{currentUser.about}</p>
          </div>
          <button
            type="button"
            className={profileAddButton}
            aria-label="добавить карточку"
            onClick={props.handleAddPlaceClick}
          ></button>
        </div>
      </section>
      <section className={places} aria-label="Секция с карточками">
        <ul className={cards}>
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
