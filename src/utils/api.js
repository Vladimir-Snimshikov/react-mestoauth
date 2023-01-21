import { config } from './utils';
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _responseProcessing(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-54/users/me', {
      headers: this._headers,
    }).then(this._responseProcessing);
  }

  getAllCards() {
    return fetch(`${this._url}cards`, { headers: this._headers }).then(
      this._responseProcessing
    );
  }

  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._responseProcessing);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._responseProcessing);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._responseProcessing);
  }

  putAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._responseProcessing);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then(this._responseProcessing);
  }
}

export const api = new Api(config);
