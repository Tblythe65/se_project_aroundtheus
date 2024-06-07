import Card from "../components/Card.js";

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

const cardSelector = document.querySelector("#card-template");

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
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Card Template Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

// Add Card Elements
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardClose = addCardModal.querySelector(".modal__close");
const addCardInputTitle = document.querySelector("#card-input-title");
const addCardInputUrl = document.querySelector("#card-input-url");
const addCardForm = addCardModal.querySelector(".modal__form");

// Preview Image Elements
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImageClose = previewImageModal.querySelector(
  ".modal__close_image_preview"
);
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewCaption = previewImageModal.querySelector(".modal__caption");

// Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleOverlay);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleOverlay);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const popupOpen = document.querySelector(".modal_opened");
    closePopup(popupOpen);
  }
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal")) {
    closePopup(e.target);
  }
}

function openProfileModal() {
  profileInputTitle.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;

  openPopup(profileEditModal);
}

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

function handleImageClick(cardData) {
  openPopup(previewImageModal);

  previewImage.setAttribute("src", cardData._link);
  previewImage.setAttribute("alt", cardData._name);
  previewCaption.textContent = cardData._name;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileInputTitle.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardInputTitle.value;
  const link = addCardInputUrl.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addCardForm.reset();
}

// Event listeners
profileEditBtn.addEventListener("click", openProfileModal);

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

profileEditClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardClose.addEventListener("click", () => {
  closePopup(addCardModal);
});

previewImageClose.addEventListener("click", () => {
  closePopup(previewImageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
