import { Route, Routes, useNavigate } from 'react-router-dom';
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
import Loading from './Loading.js';
import * as auth from '../utils/auth.js';
import { tooltip } from '../utils/utils.js';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isAconfirmation, setisconfirmation] = useState(false);
  const [isOpenLargePictures, setIsOpenLargePictures] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({
    message: '',
    isOpen: false,
    error: null,
  });

  const [selectedCard, setSelectedCard] = useState({});
  const [buttonTextAddForm, setButtonTextAddForm] = useState('Создать');
  const [buttonTextEditProfileForm, setButtonTextEditProfileForm] =
    useState('Сохранить');
  const [buttonTextEditAvatarForm, setButtonTextEditAvatarForm] =
    useState('Сохранить');
  const [buttonTextConfirmationPopup, setButtonTextConfirmationPopup] =
    useState('Да');

  const [cardForDeleted, setCardForDeleted] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([userInfo, allCards]) => {
          navigate('/react-mestoauth', { replace: true });
          setCards(allCards);
          setCurrentUser({ ...currentUser, ...userInfo });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    auth.auth().then((res) => {
      setLoggedIn(true);
      setCurrentUser({ ...currentUser, email: res.data.email });
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
    setButtonTextEditProfileForm('Сохранение...');
    api
      .editProfile(data)
      .then((dataUser) => {
        setCurrentUser({ ...currentUser, ...dataUser });
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
        setCurrentUser({ ...currentUser, ...dataAvatar });
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

  function handleLoginClick(password, email) {
    auth.login(password, email).then((data) => {
      localStorage.setItem('jwt', data.token);
      setCurrentUser({ ...currentUser, email: email });
      setLoggedIn(true);
      navigate('/react-mestoauth', { replace: true });
    });
  }

  function handleLogOutClick() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    setLoggedIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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
      setInfoTooltip({ ...infoTooltip, isOpen: false });
      setSelectedCard({});
    }
  }
  function handleRegisterClick(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setInfoTooltip({
          message: tooltip.message,
          isOpen: true,
          error: false,
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((res) => {
        setInfoTooltip({
          message: tooltip.messageErr,
          isOpen: true,
          error: true,
        });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header handleLoginClick={handleLogOutClick} isLoggin={loggedIn} />
        <Routes>
          <Route
            path="/sign-in"
            element={<Login handleLoginClick={handleLoginClick} />}
          ></Route>
          <Route
            path="/sign-up"
            element={<Register handleRegisterClick={handleRegisterClick} />}
          ></Route>
          <Route
            path="/react-mestoauth"
            element={
              pageLoading ? (
                <Loading />
              ) : (
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleConfirmationClick={handleConfirmationClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handlebucketClick}
                />
              )
            }
          ></Route>
        </Routes>
        <Footer />
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
        <InfoTooltip state={infoTooltip} onClose={closeAllPopups}></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
