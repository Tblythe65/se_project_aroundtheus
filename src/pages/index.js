import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import { data } from "autoprefixer";

// Avatar Edit Elements
const avatarEditForm = document.querySelector("#update-avatar-form");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const avatarImage = document.querySelector(".profile__image");
const avatarEditModal = document.querySelector("#update-avatar-modal");

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
const deleteCardModal = document.querySelector("#confirm-delete-modal");

// Preview Image Elements
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewCaption = previewImageModal.querySelector(".modal__caption");

// Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "abe6208e-09fe-4873-922f-d20522e91eb0",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        data: cardData,
        renderer: getCardElement,
      },
      cardListEl
    );
    cardSection.renderItems();
  })
  .catch(console.error);

api
  .getUser()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
  })
  .catch(console.error);

// Card and Profile classes

const userInfo = new UserInfo(profileTitle, profileDescription, avatarImage);

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleConfirmDelete,
    handleImageLike
  );
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

const avatarPopupForm = new PopupWithForm(avatarEditModal, handleAvatarSubmit);
avatarPopupForm.setEventListeners();

const imagePopup = new PopupWithImage(
  previewImageModal,
  previewCaption,
  previewImage
);
imagePopup.setEventListeners();

const deleteCardPopup = new PopupConfirmDelete(deleteCardModal);
deleteCardPopup.setEventListeners();

// Event Handlers

function handleProfileEditSubmit(userData) {
  profilePopupForm.viewLoading(true);
  console.log(userData.name, userData.about);
  api
    .editProfile(userData.name, userData.about)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopupForm.close();
    })
    .catch(console.error)
    .finally(() => {
      profilePopupForm.viewLoading(false);
    });
}

function handleAddCardSubmit(cardData) {
  cardPopupForm.viewLoading(true);
  api
    .addCard(cardData.name, cardData.link)
    .then((data) => {
      cardSection.addItem(data);
      cardPopupForm.close();
      addCardForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch(console.error)
    .finally(() => {
      cardPopupForm.viewLoading(false);
    });
}

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function handleAvatarSubmit({ link }) {
  avatarPopupForm.viewLoading(true);
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
      avatarPopupForm.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarPopupForm.viewLoading(false);
    });
}

function handleConfirmDelete(card) {
  deleteCardPopup.open();
  deleteCardPopup.confirmDelete(() => {
    api
      .removeCard(card._id)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error);
  });
}

function handleImageLike(card) {
  if (card.isLiked) {
    api
      .removeLike(card._id)
      .then(() => {
        card.setLikes(false);
      })
      .catch(console.error);
  } else {
    api
      .addLike(card._id)
      .then(() => {
        card.setLikes(true);
      })
      .catch(console.error);
  }
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profilePopupForm.open();
  const userData = userInfo.getUserInfo();
  profileInputTitle.value = userData.name;
  profileInputDescription.value = userData.about;
});

addNewCardButton.addEventListener("click", () => {
  cardPopupForm.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarPopupForm.open();
});

// Form Validation

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
const avatarFromValidator = new FormValidator(config, avatarEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFromValidator.enableValidation();
