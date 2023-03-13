class Api {
  constructor({baseUrl, keyAuth}) {
    this._baseUrl = baseUrl;
    this._keyAuth = keyAuth;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}  ${res.statusText}`);
    }
    return res.json();
  }

  getInitCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  }

  getInitUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  }

  editDataUser({nameInput, jobInput}) {
    return fetch((`${this._baseUrl}users/me`), {
      method: 'PATCH',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nameInput, about: jobInput})
    }).then(res => this._getResponseData(res));
  }

  addCard({name, link}) {
    return fetch((`${this._baseUrl}cards`), {
      method: 'POST',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    }).then(res => this._getResponseData(res));
  }

  updateAvatar(avatar) {
    return fetch((`${this._baseUrl}users/me/avatar`), {
      method: 'PATCH',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch((`${this._baseUrl}cards/${cardId}`), {
      method: 'DELETE',
      headers: {
        authorization: this._keyAuth
      },
      body: JSON.stringify(cardId)
    }).then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch((`${this._baseUrl}cards/${cardId}/likes`), {
      method: method,
      headers: {
        authorization: this._keyAuth
      },
      body: JSON.stringify(cardId)
    }).then(res => this._getResponseData(res));
  }
}


const api = new Api({
  baseUrl: 'https://api.grigorygriko.student.nomoredomains.work/', 
  keyAuth: '110d7e44-821c-45aa-84e8-91b557d72ac5'
});

export default api;