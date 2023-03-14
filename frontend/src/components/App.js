import React, { useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from "react-router-dom";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/Api.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({_id: '', email: ''});

  const [infoTooltipState, setInfoTooltipState] = useState({ message: '', isError: false });

  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Promise.all([api.getInitCards(), api.getInitUserData()])
          .then(([cards, user]) => {
            setCurrentUser(user);

            setCards(cards);
          })
          .catch((err) => {
            console.log(`Ошибка загрузки данных пользователя ${err}`);
          });
    }
  }, [loggedIn]);
  
  React.useEffect(() => {
    tokenCheck();

    function tokenCheck() {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
  
        if (jwt) {
          auth.getContent(jwt).then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserData({_id: res._id, email: res.email});
            }
          })
          .catch((err) => {
            localStorage.removeItem('jwt');
            console.log(err);
          });
        }
      }
    }
  }, [history])
  
  React.useEffect(() => {
    
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);


  function handleLogin() {
    setLoggedIn(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
  
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards( (cards) => cards.map((item) => ((item._id === card._id) ? newCard : item)) );
    })
    .catch(err => console.log(err));
  }

  function handelCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards( (cards) => cards.filter((item) => (item._id !== card._id)) );
    })
    .catch(err => console.log(err));
  }

  function handleUpdateUser({name, about}) {
    api.editDataUser({nameInput: name, jobInput: about})
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard({name, link})
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false); 
    setIsAddPlacePopupOpen(false);

    setInfoTooltipState({ message: '', isError: false });

    setSelectedCard({});
  }
  
  function unsetLoggedIn() {
    setLoggedIn(false)
  }
  function resetUserData() {
    setUserData({_id: '', email: ''});
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          userData={userData} 
          unsetLoggedIn={unsetLoggedIn}
          resetUserData={resetUserData}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}

            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onCardDelete={handelCardDelete}
            cards={cards}
          >
          </ProtectedRoute>
          <Route path='/sign-up'>
            
            <Register
              onFinal={setInfoTooltipState}
            />
          </Route>
          <Route path='/sign-in'>
            <Login 
              handleLogin={handleLogin}
              onFinal={setInfoTooltipState}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="sign-up" />}
          </Route>
        </Switch>

        <InfoTooltip
          message={infoTooltipState.message} 
          isError={infoTooltipState.isError}
          onClose={closeAllPopups}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          cards={cards}
        ></AddPlacePopup>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);