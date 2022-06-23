const rusCompareOfferTypes = {
  flat: 'квартира',
  bungalow: 'бунгало',
  house: 'дом',
  palace: 'дворец',
  hotel: 'отель',
};

const WordsFormChangedSteps = {
  FIRST: 1,
  SECOND: 4,
};

const promoTemplate = document.querySelector('#card').content.querySelector('.popup');

const getRightRoomGuestWordsForm = (elementsQuantity) => {
  let formWords = {
    room: 'комнат',
    guest: 'гостей',
  };
  if (elementsQuantity === WordsFormChangedSteps.FIRST) {
    formWords.room = 'комната';
    formWords.guest = 'гостя';
  }
  if (elementsQuantity > WordsFormChangedSteps.FIRST && elementsQuantity <= WordsFormChangedSteps.SECOND) {
    formWords.room = 'комнаты';
  }
  return formWords;
};

const createPhraseForAvailableRooms = (roomsQuantity, guestQuantity) => {
  return `${roomsQuantity} ${getRightRoomGuestWordsForm(roomsQuantity).room} для ${guestQuantity} ${
    getRightRoomGuestWordsForm(guestQuantity).guest}`;
};

const showOfferPhotos = (parentBlock, availablePhotos) => {
  const photoTemplate = parentBlock.querySelector('.popup__photo');
  const photoFragment = document.createDocumentFragment();

  parentBlock.innerHTML = '';

  if (availablePhotos) {
    availablePhotos.forEach((photo) => {
      const photoItem = photoTemplate.cloneNode(true);

      photoItem.src = photo;
      photoFragment.appendChild(photoItem);
    });
  }

  parentBlock.appendChild(photoFragment);
};

const showOfferFeatures = (parentBlock, availableFeatures) => {
  parentBlock.innerHTML = '';

  if (availableFeatures) {
    availableFeatures.forEach((feature) => {
      const item = document.createElement('li');

      item.classList.add('popup__feature');
      item.classList.add(`popup__feature--${feature}`);
      parentBlock.appendChild(item);
    });
  }
};

const promoRender = (promo) => {
  const { author, offer } = promo;

  const popupElement = promoTemplate.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = rusCompareOfferTypes[offer.type];
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__text--capacity').textContent = createPhraseForAvailableRooms(offer.rooms, offer.guests);
  showOfferFeatures(popupElement.querySelector('.popup__features'), offer.features);
  popupElement.querySelector('.popup__description').textContent = offer.description;
  showOfferPhotos(popupElement.querySelector('.popup__photos'), offer.photos);
  return popupElement;
};

export { promoRender };
