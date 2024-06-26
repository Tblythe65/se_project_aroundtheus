import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement, previewCaption, previewImage) {
    super({ popupElement });
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
