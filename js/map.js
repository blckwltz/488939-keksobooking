'use strict';

(function () {

  var MAP_BORDERS = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 150,
      max: 500
    }
  };

  var MAIN_PIN_POSITION = {
    x: 600,
    y: 375
  };

  var POSITION_OFFSET = {
    x: 32,
    y: 87
  };

  var map = document.querySelector('.map');

  var mapPinMain = map.querySelector('.map__pin--main');

  var mapFilters = map.querySelector('.map__filters-container');

  var pinsContainer = document.querySelector('.map__pins');

  map.insertBefore(window.generateAdvertCard(window.adverts[0]), mapFilters);

  var pins = [];

  var onPinsLoad = function (data) {
    pins = data;
    window.pin.renderPins(data);
  };

  var onPinClick = function (pin, advert) {
    pin.addEventListener('click', function () {
      map.replaceChild(advert, map.children[1]);
      map.children[1].classList.remove('hidden');
      map.children[1].children[1].addEventListener('click', function () {
        map.children[1].classList.add('hidden');
      });
    });
  };

  var toActiveState = function () {
    map.classList.remove('map--faded');
    window.form.form.classList.remove('notice__form--disabled');
    [].forEach.call(housingFilters, function (filter) {
      filter.disabled = false;
    });
    [].forEach.call(noticeFilters, function (filter) {
      filter.disabled = false;
    });
    window.form.address.value = (mapPinMain.offsetLeft + POSITION_OFFSET.x) + ', '
      + (mapPinMain.offsetTop + POSITION_OFFSET.y);

    window.load(onPinsLoad, window.util.renderErrorNode);

    window.load(function () {
      var mapPins = pinsContainer.querySelectorAll('button:not(.map__pin--main)');
      for (var j = 0; j < mapPins.length; j++) {
        var pin = mapPins[j];
        var advert = window.generateAdvertCard(pins[j]);
        onPinClick(pin, advert);
      }
    }, window.util.renderErrorNode);
  };

  mapPinMain.addEventListener('mouseup', function () {
    toActiveState();
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMain.offsetLeft - shift.x) < MAP_BORDERS.x.min) {
        mapPinMain.style.left = MAP_BORDERS.x.min + 'px';
      } else if ((mapPinMain.offsetLeft - shift.x) > MAP_BORDERS.x.max) {
        mapPinMain.style.left = MAP_BORDERS.x.max + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if ((mapPinMain.offsetTop - shift.y) < MAP_BORDERS.y.min) {
        mapPinMain.style.top = MAP_BORDERS.y.min + 'px';
      } else if ((mapPinMain.offsetTop - shift.y) > MAP_BORDERS.y.max) {
        mapPinMain.style.top = MAP_BORDERS.y.max + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      window.form.address.value = (mapPinMain.offsetLeft + POSITION_OFFSET.x) + ', '
        + (mapPinMain.offsetTop + POSITION_OFFSET.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var mapPins = pinsContainer.querySelectorAll('button:not(.map__pin--main)');

    for (var i = 0; i < mapPins.length; i++) {
      pinsContainer.removeChild(mapPins[i]);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var housingFilters = map.querySelectorAll('[id|="housing"]');

  [].forEach.call(housingFilters, function (filter) {
    filter.disabled = true;
  });

  window.form.address.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

  var noticeFilters = window.form.form.querySelectorAll('fieldset');

  [].forEach.call(noticeFilters, function (filter) {
    filter.disabled = true;
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      map.children[1].classList.add('hidden');
    }
  });

  window.map = {
    map: map,
    container: pinsContainer
  };

  var typeFilter = map.querySelector('#housing-type');
  var priceFilter = map.querySelector('#housing-price');
  var roomsFilter = map.querySelector('#housing-rooms');
  var guestsFilter = map.querySelector('#housing-guests');

  var Prices = {
    low: 10000,
    high: 50000
  };

  var filterPins = function () {
    var mapPins = pinsContainer.querySelectorAll('button:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      pinsContainer.removeChild(mapPins[i]);
    }

    map.children[1].classList.add('hidden');

    var sameTypePins = pins.filter(function (pin) {
      return pin.offer.type === typeFilter.value;
    });
    var samePricePins = pins.filter(function (pin) {
      return pin.offer.price === priceFilter.value;
    });
    var sameRoomsPins = pins.filter(function (pin) {
      return pin.offer.rooms.toString() === roomsFilter.value;
    });
    var sameGuestsPins = pins.filter(function (pin) {
      return pin.offer.guests.toString() === guestsFilter.value;
    });

    var filteredPins = sameTypePins.concat(samePricePins).concat(sameRoomsPins).
        concat(sameGuestsPins).concat(pins);

    var uniquePins = filteredPins.filter(function (pin, index) {
      return filteredPins.indexOf(pin) === index;
    });

    window.pin.renderPins(uniquePins);
  };

  typeFilter.addEventListener('input', function () {
    filterPins();
    if (typeFilter.value === 'any') {
      window.pin.renderPins(pins);
    }
  });
  priceFilter.addEventListener('input', function () {
    filterPins();
    if (priceFilter.value === 'any') {
      window.pin.renderPins(pins);
    }
  });
  roomsFilter.addEventListener('input', function () {
    filterPins();
    if (roomsFilter.value === 'any') {
      window.pin.renderPins(pins);
    }
  });
  guestsFilter.addEventListener('input', function () {
    filterPins();
    if (guestsFilter.value === 'any') {
      window.pin.renderPins(pins);
    }
  });
})();
