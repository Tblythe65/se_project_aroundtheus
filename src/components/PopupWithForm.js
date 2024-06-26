import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super({ popupElement });
    this._popupForm = this._popupEl.querySelector(".modal__form");
    this._inputList = this._popupEl.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userInfo = this._getInputValues();
      this._handleFormSubmit(userInfo);
      e.target.reset();
    });
  }
}
