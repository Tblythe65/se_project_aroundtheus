export default class Popup {
  constructor({ popupElement }) {
    this._popupEl = popupElement;
  }

  open() {
    this._popupEl.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupEl.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}
