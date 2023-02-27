import React, { useMemo } from 'react';
import Card from './Card';
import { elemClasses } from '../utils/constans';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup } from '../store/popupSlice.js';
import { selectCardsData } from '../store/cardsSlice';
import { selectUserInfo } from '../store/currentUserInfoSlice';

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

export default function Main(props) {
  const dispatch = useDispatch();
  const cardsData = useSelector(selectCardsData);
  const userInfo = useSelector(selectUserInfo);

  const generateCards = useMemo(() => {
    return cardsData.map((card) => {
      return <Card key={card._id} card={card} />;
    });
  }, [cardsData]);

  return (
    <main className={content}>
      <section className={profile}>
        <div className={profileConteiner}>
          <div className={profileAvatarContainer}>
            <img
              className={profileImg}
              src={userInfo.avatar}
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
              <h1 className="profile__name">{userInfo.name}</h1>
              <button
                type="button"
                className={profileEditButton}
                aria-label="редактировать профиль"
                onClick={() => dispatch(openPopup('editProfilePopup'))}
              ></button>
            </div>
            <p className={profileProfession}>{userInfo.about}</p>
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
        <ul className={cards}>{generateCards}</ul>
      </section>
    </main>
  );
}
