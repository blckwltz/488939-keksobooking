'use strict';

(function () {
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

  features.length = window.util.getRandomNumber(0, 6);

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var sortedPhotos = photos.sort(window.util.randomSeed);

  var adverts = [];

  for (var i = 0; i < ADVERTS_NUMBER; i++) {
    var point = {
      x: window.util.getRandomNumber(MAP_AREA.x.min, MAP_AREA.x.max),
      y: window.util.getRandomNumber(MAP_AREA.y.min, MAP_AREA.y.max)
    };
    adverts.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[i],
        address: point.x + ', ' + point.y,
        price: window.util.getRandomNumber(PRICE_RANGE.min, PRICE_RANGE.max),
        type: window.util.getRandomElement(type),
        rooms: window.util.getRandomNumber(ROOMS_NUMBER.min, ROOMS_NUMBER.max),
        guests: window.util.getRandomNumber(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
        checkin: window.util.getRandomElement(times),
        checkout: window.util.getRandomElement(times),
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

  window.adverts = adverts;
})();
