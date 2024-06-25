import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";

// Profile Edit Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileInputTitle = document.querySelector("#profile-input-title");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = profileEditModal.querySelector("#edit-form-modal");

// Card Template Elements
const cardListEl = document.querySelector(".cards__list");
const cardSelector = document.querySelector("#card-template");

// Add Card Elements
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardInputTitle = document.querySelector("#card-input-title");
const addCardInputUrl = document.querySelector("#card-input-url");
const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Image Elements
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewCaption = previewImageModal.querySelector(".modal__caption");

// Card and Profile classes

const userInfo = new UserInfo(profileTitle, profileDescription);

const cardList = new Section(
  { data: initialCards, renderer: getCardElement },
  cardListEl
);
cardList.renderItems();

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

// Popup classes

const profilePopupForm = new PopupWithForm(
  profileEditModal,
  handleProfileEditSubmit
);
profilePopupForm.setEventListeners();

const cardPopupForm = new PopupWithForm(addCardModal, handleAddCardSubmit);
cardPopupForm.setEventListeners();

const imagePopup = new PopupWithImage(
  previewImageModal,
  previewCaption,
  previewImage
);
imagePopup.setEventListeners();

// Event Handlers
function handleProfileEditSubmit(userData) {
  profilePopupForm.close();
  userInfo.setUserInfo(userData);
}

function handleAddCardSubmit(e) {
  const name = addCardInputTitle.value;
  const link = addCardInputUrl.value;
  cardList.addItem({ name, link });
  cardPopupForm.close();
  addCardForm.reset();
  addFormValidator._toggleButtonState();
}

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profilePopupForm.open();
  const userData = userInfo.getUserInfo();
  profileInputTitle.value = userData.title;
  profileInputDescription.value = userData.description;
});

addNewCardButton.addEventListener("click", () => {
  cardPopupForm.open();
});

// Form Validation

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
