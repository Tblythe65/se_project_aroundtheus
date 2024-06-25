import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile Edit Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileInputTitle = document.querySelector("#profile-input-title");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = profileEditModal.querySelector("#edit-form-modal");

// Card Template Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const cardSelector = document.querySelector("#card-template");

// Add Card Elements
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardClose = addCardModal.querySelector(".modal__close");
const addCardInputTitle = document.querySelector("#card-input-title");
const addCardInputUrl = document.querySelector("#card-input-url");
const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Image Elements
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImageClose = previewImageModal.querySelector(
  ".modal__close_image_preview"
);
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewCaption = previewImageModal.querySelector(".modal__caption");

// Functions
// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
//   modal.removeEventListener("click", handleOverlay);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
//   modal.addEventListener("click", handleOverlay);
// }

// function handleEscape(e) {
//   if (e.key === "Escape") {
//     const popupOpen = document.querySelector(".modal_opened");
//     closePopup(popupOpen);
//   }
// }

// function handleOverlay(e) {
//   if (e.target.classList.contains("modal")) {
//     closePopup(e.target);
//   }
// }

// function openProfileModal() {
// profileInputTitle.value = profileTitle.textContent;
// profileInputDescription.value = profileDescription.textContent;

//   openPopup(profileEditModal);
// }

// function getCardElement(cardData) {
//   // const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   // const likeButton = cardElement.querySelector(".card__like-button");
//   // const deleteButton = cardElement.querySelector(".card__delete-button");

//   // deleteButton.addEventListener("click", () => {
//   //   cardElement.remove();
//   // });

//   cardImageEl.addEventListener("click", () => {
// const previewImage = previewImageModal.querySelector(
//   ".modal__image-preview"
// );
// const previewCaption = previewImageModal.querySelector(".modal__caption");

// openPopup(previewImageModal);

// previewImage.setAttribute("src", cardData.link);
// previewImage.setAttribute("alt", cardData.name);
// previewCaption.textContent = cardData.name;
//   });

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// cardImageEl.setAttribute("src", cardData.link);
// cardImageEl.setAttribute("alt", cardData.name);
// cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }

const cardList = new Section(
  { data: initialCards, renderer: getCardElement },
  cardListEl
);
cardList.renderItems();

function handleImageClick(cardData) {
  imagePopup.open(cardData);

  // previewImage.setAttribute("src", cardData.link);
  // previewImage.setAttribute("alt", cardData.name);
  // previewCaption.textContent = cardData.name;
}

// function renderCard(cardData, wrapper) {
//   const cardElement = getCardElement(cardData);
//   wrapper.prepend(cardElement);
// }

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

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
function handleProfileEditSubmit() {
  profilePopupForm.close();
  // e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  // closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  // e.preventDefault();
  const name = addCardInputTitle.value;
  const link = addCardInputUrl.value;
  cardList.addItem({ name, link });
  // renderCard({ name, link }, cardListEl);
  // closePopup(addCardModal);
  cardPopupForm.close();
  addCardForm.reset();
  addFormValidator._toggleButtonState();
}

// Event listeners
profileEditBtn.addEventListener("click", () => {
  profilePopupForm.open();
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  cardPopupForm.open();
});

// profileEditClose.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardForm.addEventListener("submit", handleAddCardSubmit);

// addCardClose.addEventListener("click", () => {
//   closePopup(addCardModal);
// });

// previewImageClose.addEventListener("click", () => {
//   closePopup(previewImageModal);
// });

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Form Validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
