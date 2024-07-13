import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupElement) {
    super({ popupElement });
  }

  confirmDelete(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
