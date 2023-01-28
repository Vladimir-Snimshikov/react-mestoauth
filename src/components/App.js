import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationDeletePopup from './ConfirmationDeletePopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isAconfirmation, setisconfirmation] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(true);
  const [isOpenLargePictures, setIsOpenLargePictures] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonTextAddForm, setButtonTextAddForm] = useState('Создать');
  const [buttonTextEditProfileForm, setButtonTextEditProfileForm] =
    useState('Сохранить');
  const [buttonTextEditAvatarForm, setButtonTextEditAvatarForm] =
    useState('Сохранить');
  const [buttonTextConfirmationPopup, setButtonTextConfirmationPopup] =
    useState('Да');

  const [cardForDeleted, setCardForDeleted] = useState(null); // стейт для хранения карточки которую надо удалить через попап
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    auth.auth().then((res) => {
      console.log(res.data.email);
      setCurrentUser({ ...currentUser, email: res.data.email });
    });
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userInfo, allCards]) => {
        setCards(allCards);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleConfirmationClick() {
    setisconfirmation(true);
  }

  function handleCardClick(card) {
    setIsOpenLargePictures(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setButtonTextEditProfileForm('Сохранение');
    api
      .editProfile(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        setisEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonTextEditProfileForm('Сохранить');
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    setButtonTextEditAvatarForm('Сохранение...');
    api
      .putAvatar(dataAvatar)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        setisEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonTextEditAvatarForm('Сохранить');
      });
  }

  function handleAddPlaceSubmit(cardData) {
    setButtonTextAddForm('Сохранение...');
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setisAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonTextAddForm('Создать');
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlebucketClick(card) {
    setisconfirmation(true);
    setCardForDeleted(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setButtonTextConfirmationPopup('Удаление...');
    api
      .deleteCard(cardForDeleted._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDeleted._id));
      })
      .then(() => {
        setisconfirmation(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonTextConfirmationPopup('Да');
      });
  }

  function closeAllPopups(evt) {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__exit-button')
    ) {
      setisconfirmation(false);
      setisAddPlacePopupOpen(false);
      setisEditProfilePopupOpen(false);
      setisEditAvatarPopupOpen(false);
      setIsOpenLargePictures(false);
      setSelectedCard({});
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div className="root">
          <Header />
          <Routes>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/sign-up" element={<Register />}></Route>
            <Route
              path="/react-mestoauth"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={false}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleConfirmationClick={handleConfirmationClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handlebucketClick}
                />
              }
            ></Route>
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonTextEditProfileForm}
          ></EditProfilePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={buttonTextEditAvatarForm}
          ></EditAvatarPopup>
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonText={buttonTextAddForm}
          ></AddPlacePopup>
          <ConfirmationDeletePopup
            isOpen={isAconfirmation}
            onClose={closeAllPopups}
            buttonText={buttonTextConfirmationPopup}
            handleDeletedCard={handleCardDelete}
          ></ConfirmationDeletePopup>
          <ImagePopup
            card={selectedCard}
            isOpen={isOpenLargePictures}
            onClose={closeAllPopups}
          ></ImagePopup>
          {/* <InfoTooltip isOpen={isInfoTooltip} message={false}></InfoTooltip> */}
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
