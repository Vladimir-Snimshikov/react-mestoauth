import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__conteiner">
          <div className="profile__avatar-container">
            <img
              className="profile__img"
              src={currentUser.avatar}
              alt="фото профиля"
            />
            <button
              onClick={props.handleEditAvatarClick}
              className="profile__avatar-button"
              type="button"
              aria-label="редактировать аватар"
            ></button>
          </div>
          <div className="profile__info-container">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="редактировать профиль"
                onClick={props.handleEditProfileClick}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="добавить карточку"
            onClick={props.handleAddPlaceClick}
          ></button>
        </div>
      </section>
      <section className="places" aria-label="Секция с карточками">
        <ul className="cards">
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
