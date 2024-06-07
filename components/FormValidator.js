export default class FormValidator {
    constructor(config, formElement){
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config._errorClass;
    this._formElement = formElement;
}

_showInputError()

enableValidation(){
    this._formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}