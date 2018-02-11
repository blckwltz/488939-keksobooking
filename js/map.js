'use strict';

var ESC_KEYCODE = 27;

var ADVERTS_NUMBER = 8;

var MAIN_PIN_POSITION = {
  x: 600,
  y: 375
};

var POSITION_OFFSET = {
  x: 32,
  y: 87
};

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
  return array[getRandomNumber(0, array.length)];
};

var randomSeed = function () {
  return Math.random() - 0.5;
};

var map = document.querySelector('.map');

var noticeForm = document.querySelector('.notice__form');

var mapPinMain = map.querySelector('.map__pin--main');

mapPinMain.addEventListener('mouseup', function () {
  toActiveState();
});

var toActiveState = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  [].forEach.call(housingFilters, function (filter) {
    filter.removeAttribute('disabled');
  });
  [].forEach.call(noticeFilters, function (filter) {
    filter.removeAttribute('disabled');
  });
  [].forEach.call(mapPins, function (pin) {
    pin.classList.remove('hidden');
  });
  noticeAddress.setAttribute('value', (MAIN_PIN_POSITION.x + POSITION_OFFSET.x) + ', ' + (MAIN_PIN_POSITION.y + POSITION_OFFSET.y));
};

var housingFilters = map.querySelectorAll('[id|="housing"]');

[].forEach.call(housingFilters, function (filter) {
  filter.setAttribute('disabled', 'disabled');
});

var notice = document.querySelector('.notice');

var noticeAddress = notice.querySelector('#address');

noticeAddress.setAttribute('value', MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y);

var noticeFilters = notice.querySelectorAll('fieldset');

[].forEach.call(noticeFilters, function (filter) {
  filter.setAttribute('disabled', 'disabled');
});

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

for (var i = 0; i < ADVERTS_NUMBER; i++) {
  var point = {
    x: getRandomNumber(MAP_AREA.x.min, MAP_AREA.x.max),
    y: getRandomNumber(MAP_AREA.y.min, MAP_AREA.y.max)
  };
  adverts.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: titles[i],
      address: point.x + ', ' + point.y,
      price: getRandomNumber(PRICE_RANGE.min, PRICE_RANGE.max),
      type: getRandomElement(type),
      rooms: getRandomNumber(ROOMS_NUMBER.min, ROOMS_NUMBER.max),
      guests: getRandomNumber(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: features,
      description: '',
      photos: sortedPhotos
    },
    location: {
      x: point.x,
      y: point.y
    }
  });
}

var renderPin = function (advert) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.classList.add('hidden');
  pin.style.left = advert.location.x + POSITION_OFFSET.x + 'px';
  pin.style.top = advert.location.y + POSITION_OFFSET.y + 'px';

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

var pinsContainer = document.querySelector('.map__pins');

pinsContainer.appendChild(fragment);

var mapPins = map.querySelectorAll('.map__pin.hidden');

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

  advertElement.classList.add('hidden');

  return advertElement;
};

var mapFilter = map.querySelector('.map__filters-container');

map.insertBefore(generateAdvertCard(adverts[0]), mapFilter);

for (var x = 0; x < mapPins.length; x++) {
  (function (pin, advert) {
    pin.addEventListener('click', function () {
      var advertCard = document.querySelector('.map__card');
      // var closeCard = advertCard.querySelector('.popup__close');
      map.replaceChild(generateAdvertCard(advert), advertCard);
      map.children[1].classList.remove('hidden');
      map.children[1].children[1].addEventListener('click', function () {
        map.children[1].classList.add('hidden');
      });
    });
  })(mapPins[x], adverts[x]);
}

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    map.children[1].classList.add('hidden');
  }
});

// var advertCard = map.children[1];

// var closeCard = map.children[1].children[1];

// for (var z = 0; z < advertCards.length; z++) {
//   (function (close, card) {
//     close.addEventListener('click', function () {
//       card.classList.add('hidden');
//     });
//   })(closeCards[z], advertCards[z]);
// }

// [].forEach.call(closeCards, function (close) {
//   close.addEventListener('click', function () {
//     map.children[1].classList.add('hidden');
//   });
// });

// map.children[1].children[1].addEventListener('click', function () {
//   map.children[1].classList.add('hidden');
// });
