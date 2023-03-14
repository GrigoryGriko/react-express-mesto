class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}  ${res.statusText}`);
    }
    return res.json();
  }

  getInitCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  }

  getInitUserData() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponseData(res));
  }

  editDataUser({nameInput, jobInput}) {
    const token = localStorage.getItem('jwt');
    return fetch((`${this._baseUrl}users/me`), {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nameInput, about: jobInput})
    }).then(res => this._getResponseData(res));
  }

  addCard({name, link}) {
    const token = localStorage.getItem('jwt');
    return fetch((`${this._baseUrl}cards`), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    }).then(res => this._getResponseData(res));
  }

  updateAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return fetch((`${this._baseUrl}users/me/avatar`), {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch((`${this._baseUrl}cards/${cardId}`), {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardId)
    }).then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    const token = localStorage.getItem('jwt');

    return fetch((`${this._baseUrl}cards/${cardId}/likes`), {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardId)
    }).then(res => this._getResponseData(res));
  }
}


const api = new Api({
  baseUrl: 'http://127.0.0.1:3001/',
});

export default api;