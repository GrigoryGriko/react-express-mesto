import Card from '../components/Card.js';

import {selectorGridTemplate} from './constants.js';

import {userInfo, dataEdit, cardAdd, avatarUpdate, formListValidation, cardSection, popupWithImage, api, confirmDeleteCard} from '../pages/index.js';



export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}

export function handleSaveForm({nameInput, jobInput}) {
  dataEdit.renderLoading(true);

  api.editDataUser({nameInput, jobInput})
  .then((userData) => {
    userInfo.setUserInfo(userData);
    dataEdit.close();
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  })
  .finally(() => {
    dataEdit.renderLoading(false);
  });

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  cardAdd.renderLoading(true);
  formListValidation['form-add-card'].lockButton();

  api.addCard({name, link})
    .then((cardData) => {
      cardSection.addItem( createCard(cardData) );
      cardAdd.close();
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    })
    .finally(() => {
      cardAdd.renderLoading(false);
    });
}

export function handleUpdateAvatar({linkAvatarInput: avatar}) {
  avatarUpdate.renderLoading(true);
  formListValidation['form-update-avatar'].lockButton();

  api.updateAvatar({avatar: avatar})
    .then((userData) => {
      userInfo.setUserInfo(userData);
      avatarUpdate.close();
    })
    .catch((err) => {
      console.log(`Ошибка изменения аватара ${err}`);
    })
    .finally(() => {
      avatarUpdate.renderLoading(false);
    });
}

export function handleDeleteCard({_id, removeCard}) {
  confirmDeleteCard.renderLoading(true);
  formListValidation['form-delete-card'].lockButton();

  api.deleteCard(_id)
    .then((_id) => {
      removeCard();
      confirmDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки ${err}`);
    })
    .finally(() => {
      confirmDeleteCard.renderLoading(false);
      formListValidation['form-delete-card'].unlockButton();
    });
}

export function handlePutLike(_id, likeState, updateLikes) {
  if (likeState) {
    api.putLike(_id)
    .then(({likes: likes}) => {
      updateLikes(likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`);
    });

  } else {
    api.deleteLike(_id)
    .then(({likes: likes}) => {
      updateLikes(likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`);
    });
  }
}

export function createCard({name, link, likes, _id, owner: {_id: ownerId}}) {
  const userId = userInfo.getUserId();
  const card = new Card({name, link, likes, _id, ownerId}, selectorGridTemplate, handleCardClick, confirmDeleteCard.open, userId, handlePutLike);

  const cardElement = card.generateCard();
  return cardElement;
}
