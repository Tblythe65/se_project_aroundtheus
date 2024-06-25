import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, previewCaption, previewImage) {
    super({ popupSelector });
    this._previewCaption = previewCaption;
    this._previewImage = previewImage;
  }

  open(data) {
    this._previewCaption.textContent = data.name;
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    super.open();
  }
}
