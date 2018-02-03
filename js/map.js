'use strict';

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var avatars = [];

for (var i = 1; i <= 8; i++) {
  avatars[i - 1] = 'img/avatars/user0' + i + '.png';
}

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
var locations = {
  'x': generateRandomNumber(300, 900),
  'y': generateRandomNumber(150, 500)
};
var address = locations.x + ', ' + locations.y;
var price = generateRandomNumber(1000, 1000000);
var type = [
  'flat',
  'house',
  'bungalo'
];
var roomsNumber = generateRandomNumber(1, 5);
var guestsNumber = generateRandomNumber(1, 7);
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

features.length = generateRandomNumber(0, 6);

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var sortedPhotos = photos.sort(compareRandom);

var adverts = [];

for (var j = 1; j <= avatars.length; j++) {
  adverts[j - 1] = {
    'author': {
      'avatar': avatars[j - 1]
    },
    'offer': {
      'title': titles[j - 1],
      'address': address,
      'price': price,
      'type': getRandomElement(type),
      'rooms': roomsNumber,
      'guests': guestsNumber,
      'checkin': getRandomElement(times),
      'checkout': getRandomElement(times),
      'features': features,
      'description': '',
      'photos': sortedPhotos
    },
    'location': {
      'x': generateRandomNumber(300, 900),
      'y': generateRandomNumber(150, 500)
    }
  };
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

for (var m = 0; m < adverts.length; m++) {
  fragment.appendChild(renderPin(adverts[m]));
}

var pins = document.querySelector('.map__pins');

pins.appendChild(fragment);

var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

var generateAdvert = function () {
  var advertElement = advertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__avatar').src = adverts[0].author.avatar;

  advertElement.querySelector('h3').textContent = adverts[0].offer.title;

  advertElement.querySelector('.popup__price').textContent = adverts[0].offer.price + ' \u20BD/ночь';

  advertElement.querySelector('.popup__pictures li img').src = adverts[0].offer.photos[0];
  advertElement.querySelector('.popup__pictures li img').style.width = 100 + 'px';

  if (adverts[0].offer.type === 'flat') {
    advertElement.querySelector('h4').textContent = 'Квартира';
  } if (adverts[0].offer.type === 'bungalo') {
    advertElement.querySelector('h4').textContent = 'Бунгало';
  } if (adverts[0].offer.type === 'house') {
    advertElement.querySelector('h4').textContent = 'Дом';
  }

  if (adverts[0].offer.features[0] !== 'wifi') {
    advertElement.querySelector('.popup__features').children[0].classList.remove('feature');
  } if (adverts[0].offer.features[1] !== 'dishwasher') {
    advertElement.querySelector('.popup__features').children[1].classList.remove('feature');
  } if (adverts[0].offer.features[2] !== 'parking') {
    advertElement.querySelector('.popup__features').children[2].classList.remove('feature');
  } if (adverts[0].offer.features[3] !== 'washer') {
    advertElement.querySelector('.popup__features').children[3].classList.remove('feature');
  } if (adverts[0].offer.features[4] !== 'elevator') {
    advertElement.querySelector('.popup__features').children[4].classList.remove('feature');
  } if (adverts[0].offer.features[5] !== 'conditioner') {
    advertElement.querySelector('.popup__features').children[5].classList.remove('feature');
  }

  var p = advertElement.querySelectorAll('p');
  p[0].children[0].textContent = adverts[0].offer.address;
  p[2].textContent = adverts[0].offer.rooms + ' комнаты для ' + adverts[0].offer.guests + ' гостей';
  p[3].textContent = 'Заезд после ' + adverts[0].offer.checkin + ', выезд до' +
    ' ' + adverts[0].offer.checkout;
  p[4].textContent = adverts[0].offer.description;


  return advertElement;
};

map.appendChild(generateAdvert());
