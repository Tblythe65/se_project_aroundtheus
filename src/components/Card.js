export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleConfirmDelete,
    handleImageLike
  ) {
    this.name = name;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleImageLike = handleImageLike;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleImageLike(this);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleConfirmDelete(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  getLikes() {
    return this._isLiked;
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._setEventListeners();
    this._handleLikeIcon();
    return this._cardElement;
  }
}
