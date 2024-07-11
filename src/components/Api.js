export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _renderResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async _request(url, headerInfo) {
    return fetch(url, headerInfo).then(this._renderResult);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers });
  }

  getUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addCard(name, link) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  editProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ isLiked: true }),
    });
  }

  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({ isLiked: false }),
    });
  }

  removeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }

  getCardsAndInfo() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }
}
