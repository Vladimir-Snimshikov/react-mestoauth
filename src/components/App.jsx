import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { elemClasses, status } from '../utils/constans.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationDeletePopup from './ConfirmationDeletePopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import Loading from './Loading';
import * as auth from '../utils/auth.js';
import { tooltip } from '../utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllPopup, selectPopupName } from '../store/popupSlice.js';
import { addEmail } from '../store/currentUserInfoSlice.js';
import {
  getUserInfo,
  selectUserInfoErrorMessage,
  selectUserInfoStatus,
} from '../store/currentUserInfoSlice.js';
import {
  getAllCards,
  selectCardsDataErrormMessage,
  selectCardsDataStatus,
  selectedCardForImgPopup,
} from '../store/cardsSlice.js';

const { success, error } = status;
const { popupOpened, popupExitButton } = elemClasses;

function App() {
  const [infoTooltip, setInfoTooltip] = useState({
    message: '',
    isOpen: false,
    error: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const userInfoStatus = useSelector(selectUserInfoStatus);
  const cardsDataStatus = useSelector(selectCardsDataStatus);
  const cardsDataErrormMessage = useSelector(selectCardsDataErrormMessage);
  const userInfoErrorMessage = useSelector(selectUserInfoErrorMessage);
  const curentPopupName = useSelector(selectPopupName);

  useEffect(() => {
    if (loggedIn) {
      setPageLoading(true);
      dispatch(getAllCards());
      dispatch(getUserInfo());
      navigate('/', { replace: true });
      if (userInfoStatus === success && cardsDataStatus === success) {
        setPageLoading(false);
      }
      if (userInfoStatus === error || cardsDataStatus === error) {
        setPageLoading(false);
        console.log(userInfoErrorMessage);
        console.log(cardsDataErrormMessage);
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .auth(jwt)
        .then((res) => {
          setLoggedIn(true);
          dispatch(addEmail(res.data.email));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageLoading(false);
        });
    } else {
      setPageLoading(false);
    }
  }, []);

  function handleLoginClick(password, email) {
    auth.login(password, email).then((data) => {
      localStorage.setItem('jwt', data.token);
      dispatch(addEmail(email));
      setLoggedIn(true);
      navigate('/', { replace: true });
    });
  }

  function handleLogOutClick() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    setLoggedIn(false);
  }
  function closeAllPopups(evt) {
    if (
      evt.target.classList.contains(popupOpened) ||
      evt.target.classList.contains(popupExitButton)
    ) {
      setInfoTooltip({ ...infoTooltip, isOpen: false });
      dispatch(selectedCardForImgPopup(null));
      dispatch(closeAllPopup());
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
          path="/"
          element={
            pageLoading ? (
              <Loading />
            ) : (
              <ProtectedRoute element={Main} loggedIn={loggedIn} />
            )
          }
        ></Route>
      </Routes>
      <Footer />
      <EditProfilePopup
        isOpen={curentPopupName === 'editProfilePopup'}
        onClose={closeAllPopups}
      ></EditProfilePopup>
      <EditAvatarPopup
        isOpen={curentPopupName === 'editAvatarPopup'}
        onClose={closeAllPopups}
      ></EditAvatarPopup>
      <AddPlacePopup
        isOpen={curentPopupName === 'addPlacePopupPopup'}
        onClose={closeAllPopups}
      ></AddPlacePopup>
      <ConfirmationDeletePopup
        isOpen={curentPopupName === 'confirmDeletePopup'}
        onClose={closeAllPopups}
      ></ConfirmationDeletePopup>
      <ImagePopup
        isOpen={curentPopupName === 'imagePopupPopup'}
        onClose={closeAllPopups}
      ></ImagePopup>
      <InfoTooltip state={infoTooltip} onClose={closeAllPopups}></InfoTooltip>
    </div>
  );
}

export default App;
