'use strict';

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var avatar = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var address = location.x + ', ' + location.y;
var price = generateRandomNumber(1000, 1000000);
var type = [
  'flat',
  'house',
  'bungalo'
];
var rooms = generateRandomNumber(1, 5);
var guests = generateRandomNumber(1, 2);
var checkin = [
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

var x = generateRandomNumber(300, 900);
var y = generateRandomNumber(150, 500);

var adverts = [
  {
    'author': {
      'avatar': avatar[0]
    },
    'offer': {
      'title': title[0],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[1]
    },
    'offer': {
      'title': title[1],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[2]
    },
    'offer': {
      'title': title[2],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[3]
    },
    'offer': {
      'title': title[3],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[4]
    },
    'offer': {
      'title': title[4],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[5]
    },
    'offer': {
      'title': title[5],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[6]
    },
    'offer': {
      'title': title[6],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  },
  {
    'author': {
      'avatar': avatar[7]
    },
    'offer': {
      'title': title[7],
      'address': address,
      'price': price,
      'type': type[generateRandomNumber(0, 2)],
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin[generateRandomNumber(0, 2)],
      'checkout': checkin[generateRandomNumber(0, 2)],
      'features': features,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  }
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

var pins = document.querySelector('.map__pins');

for (var i = 0; i < adverts.length; i++) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.left = adverts[i].location.x + 70 + 'px';
  pin.style.top = adverts[i].location.y + 50 + 'px';

  var image = document.createElement('img');
  image.src = adverts[i].author.avatar;
  image.width = 40;
  image.height = 40;
  image.draggable = false;

  pin.appendChild(image);

  fragment.appendChild(pin);

  pins.appendChild(fragment);
}

var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

var generateAdvert = function () {
  var advertElement = advertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__avatar').src = adverts[0].author.avatar;

  advertElement.querySelector('h3').textContent = adverts[0].offer.title;

  advertElement.querySelector('.popup__price').textContent = adverts[0].offer.price + ' \u20BD/ночь';

  advertElement.querySelector('.popup__pictures li img').src = adverts[0].offer.photos[2];
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
