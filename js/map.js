'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var MAP_BORDERS = {
    x: {
      min: 35,
      max: 1165
    },
    y: {
      min: 220,
      max: 655
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

  var noticeForm = document.querySelector('.notice__form');

  var map = document.querySelector('.map');

  var mapPinMain = map.querySelector('.map__pin--main');

  var pinsContainer = document.querySelector('.map__pins');

  var mapFilter = map.querySelector('.map__filters-container');

  map.insertBefore(window.generateAdvertCard(window.adverts[0]), mapFilter);

  var toActiveState = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    [].forEach.call(housingFilters, function (filter) {
      filter.disabled = false;
    });
    [].forEach.call(noticeFilters, function (filter) {
      filter.disabled = false;
    });
    noticeFormAddress.value = (mapPinMain.offsetLeft + POSITION_OFFSET.x) + ', ' + (mapPinMain.offsetTop + POSITION_OFFSET.y);

    window.load(function (adverts) {
      for (var i = 0; i < adverts.length; i++) {
        pinsContainer.appendChild(window.renderPin(adverts[i]));
      }
    });

    var onPinClick = function (pin, advert) {
      pin.addEventListener('click', function () {
        map.replaceChild(advert, map.children[1]);
        map.children[1].classList.remove('hidden');
        map.children[1].children[1].addEventListener('click', function () {
          map.children[1].classList.add('hidden');
        });
      });
    };

    window.load(function (adverts) {
      var mapPins = pinsContainer.querySelectorAll('button:not(.map__pin--main)');
      for (var j = 0; j < mapPins.length; j++) {
        var pin = mapPins[j];
        var advert = window.generateAdvertCard(adverts[j]);
        onPinClick(pin, advert);
      }
    });
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
        mapPinMain.style.left = MAP_BORDERS.x.max;
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if ((mapPinMain.offsetTop - shift.y) < MAP_BORDERS.y.min) {
        mapPinMain.style.top = MAP_BORDERS.y.min + 'px';
      } else if ((mapPinMain.offsetTop - shift.y) > MAP_BORDERS.y.max) {
        mapPinMain.style.top = MAP_BORDERS.y.max;
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      noticeFormAddress.value = (mapPinMain.offsetLeft + POSITION_OFFSET.x) + ', ' + (mapPinMain.offsetTop + POSITION_OFFSET.y);
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

  var noticeFormAddress = noticeForm.querySelector('#address');

  noticeFormAddress.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

  var noticeFilters = noticeForm.querySelectorAll('fieldset');

  [].forEach.call(noticeFilters, function (filter) {
    filter.disabled = true;
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      map.children[1].classList.add('hidden');
    }
  });
})();
