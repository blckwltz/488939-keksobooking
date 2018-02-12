'use strict';

var ADVERTS_NUMBER = 8;

var PRICE_RANGE = {
  min: 1000,
  max: 1000000
};

var ROOMS_NUMBER = {
  min: 1,
  max: 5
};

var GUESTS_NUMBER = {
  min: 1,
  max: 7
};

var MAP_AREA = {
  x: {min: 300, max: 900},
  y: {min: 150, max: 500}
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomSeed = function () {
  return Math.random() - 0.5;
};

var noticeForm = document.querySelector('.notice__form');

noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

var noticeFormTitle = noticeForm.querySelector('#title');

noticeFormTitle.setAttribute('required', 'required');

noticeFormTitle.setAttribute('minlength', 30);

noticeFormTitle.setAttribute('maxlength', 100);

var noticeFormAddress = noticeForm.querySelector('#address');

noticeFormAddress.setAttribute('disabled', 'disabled');

var noticeFormPrice = noticeForm.querySelector('#price');

noticeFormPrice.setAttribute('required', 'required');

noticeFormPrice.setAttribute('max', 1000000);

var noticeFormType = noticeForm.querySelector('#type');

if (noticeFormType.value === 'flat') {
  noticeFormPrice.setAttribute('min', 1000);
}

var onTypeChange = function () {
  if (noticeFormType.value === 'bungalo') {
    noticeFormPrice.setAttribute('min', 0);
  } if (noticeFormType.value === 'flat') {
    noticeFormPrice.setAttribute('min', 1000);
  } if (noticeFormType.value === 'house') {
    noticeFormPrice.setAttribute('min', 5000);
  } if (noticeFormType.value === 'palace') {
    noticeFormPrice.setAttribute('min', 10000);
  }
};

noticeFormType.addEventListener('input', function () {
  onTypeChange();
});

var noticeFormTimeIn = noticeForm.querySelector('#timein');

var noticeFormTimeOut = noticeForm.querySelector('#timeout');

var onTimeChange = function (left, right) {
  right.value = left.value;
};

noticeFormTimeIn.addEventListener('input', function () {
  onTimeChange(noticeFormTimeIn, noticeFormTimeOut);
});

noticeFormTimeOut.addEventListener('input', function () {
  onTimeChange(noticeFormTimeOut, noticeFormTimeIn);
});

var noticeFormRoomNumber = noticeForm.querySelector('#room_number');

var noticeFormCapacity = noticeForm.querySelector('#capacity');

var options = [
  [2],
  [1, 2],
  [0, 1, 2],
  [3]
];

var onRoomsChange = function () {
  var allowedOptions = options[noticeFormRoomNumber.selectedIndex];
  var defaultOption = allowedOptions[0];
  noticeFormCapacity[defaultOption].selected = true;
  [].forEach.call(noticeFormCapacity.options, function (option, index) {
    option.hidden = !allowedOptions.includes(index);
  });
};

noticeFormRoomNumber.addEventListener('input', onRoomsChange);

var noticeFormSubmit = noticeForm.querySelector('.form__submit');

noticeFormSubmit.addEventListener('click', function (evt) {
  if (noticeFormCapacity.value > noticeFormRoomNumber.value) {
    evt.preventDefault();
  }
});

// Для адреса не стал делать валидацию, потому что он не может быть пустым

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var type = [
  'flat',
  'house',
  'bungalo'
];

var times = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

features.length = getRandomNumber(0, 6);

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var sortedPhotos = photos.sort(randomSeed);

var adverts = [];

for (var i = 1; i <= ADVERTS_NUMBER; i++) {
  var point = {
    'x': getRandomNumber(MAP_AREA.x.min, MAP_AREA.x.max),
    'y': getRandomNumber(MAP_AREA.y.min, MAP_AREA.y.max)
  };
  adverts.push({
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'title': titles[i - 1],
      'address': point.x + ', ' + point.y,
      'price': getRandomNumber(PRICE_RANGE.min, PRICE_RANGE.max),
      'type': getRandomElement(type),
      'rooms': getRandomNumber(ROOMS_NUMBER.min, ROOMS_NUMBER.max),
      'guests': getRandomNumber(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
      'checkin': getRandomElement(times),
      'checkout': getRandomElement(times),
      'features': features,
      'description': '',
      'photos': sortedPhotos
    },
    'location': {
      'x': point.x,
      'y': point.y
    }
  });
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var renderPin = function (advert) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.left = advert.location.x + 70 + 'px';
  pin.style.top = advert.location.y + 50 + 'px';

  var image = document.createElement('img');
  image.src = advert.author.avatar;
  image.width = 40;
  image.height = 40;
  image.draggable = false;

  pin.appendChild(image);

  return pin;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < adverts.length; j++) {
  fragment.appendChild(renderPin(adverts[j]));
}

var pins = document.querySelector('.map__pins');

pins.appendChild(fragment);

var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

var generateAdvertCard = function (advert) {
  var advertElement = advertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__avatar').src = advert.author.avatar;

  advertElement.querySelector('h3').textContent = advert.offer.title;

  advertElement.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';

  advertElement.querySelector('.popup__pictures li img').src = advert.offer.photos[0];
  advertElement.querySelector('.popup__pictures li img').style.width = 100 + 'px';

  if (advert.offer.type === 'flat') {
    advertElement.querySelector('h4').textContent = 'Квартира';
  } if (advert.offer.type === 'bungalo') {
    advertElement.querySelector('h4').textContent = 'Бунгало';
  } if (advert.offer.type === 'house') {
    advertElement.querySelector('h4').textContent = 'Дом';
  }

  if (advert.offer.features[0] !== 'wifi') {
    advertElement.querySelector('.popup__features').children[0].classList.remove('feature');
  } if (advert.offer.features[1] !== 'dishwasher') {
    advertElement.querySelector('.popup__features').children[1].classList.remove('feature');
  } if (advert.offer.features[2] !== 'parking') {
    advertElement.querySelector('.popup__features').children[2].classList.remove('feature');
  } if (advert.offer.features[3] !== 'washer') {
    advertElement.querySelector('.popup__features').children[3].classList.remove('feature');
  } if (advert.offer.features[4] !== 'elevator') {
    advertElement.querySelector('.popup__features').children[4].classList.remove('feature');
  } if (advert.offer.features[5] !== 'conditioner') {
    advertElement.querySelector('.popup__features').children[5].classList.remove('feature');
  }

  var p = advertElement.querySelectorAll('p');
  p[0].children[0].textContent = advert.offer.address;
  p[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  p[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до' +
    ' ' + advert.offer.checkout;
  p[4].textContent = advert.offer.description;


  return advertElement;
};

var mapFilter = map.querySelector('.map__filters-container');

map.insertBefore(generateAdvertCard(adverts[0]), mapFilter);
