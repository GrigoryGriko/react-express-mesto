import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Footer from './Footer.js';
import Card from './Card.js';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content section">
      <section className="profile section-size-full">
        <button className="profile__button-avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} type="button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
          </div>

          <p className="profile__info-descript">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements-grid section-size-full" aria-label="Карточки мест">
        <ul className="elements-grid__list">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} currentUser={currentUser} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  )
}

export default Main;