'use strict';

(function () {
  var ESC_KEYCODE = 27;

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

  var fragment = document.createDocumentFragment();

  var pinsContainer = document.querySelector('.map__pins');

  var mapFilter = map.querySelector('.map__filters-container');

  map.insertBefore(window.generateAdvertCard(window.adverts[0]), mapFilter);


  mapPinMain.addEventListener('mouseup', function () {
    toActiveState();
  });

  var toActiveState = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    [].forEach.call(housingFilters, function (filter) {
      filter.disabled = false;
    });
    [].forEach.call(noticeFilters, function (filter) {
      filter.disabled = false;
    });
    for (var i = 0; i < window.adverts.length; i++) {
      fragment.appendChild(window.renderPin(window.adverts[i]));
    }
    pinsContainer.appendChild(fragment);
    noticeFormAddress.value = (MAIN_PIN_POSITION.x + POSITION_OFFSET.x) + ', ' + (MAIN_PIN_POSITION.y + POSITION_OFFSET.y);

    var mapPins = pinsContainer.querySelectorAll('button:not(.map__pin--main)');

    var onPinClick = function (pin, advert) {
      pin.addEventListener('click', function () {
        // Так и не смог разобраться, почему не работает с использованием
        // переменных
        // var advertCard = document.querySelector('.map__card') вместо
        // map.children[1] и
        // var closeCard = advertCard.querySelector('.popup__close') вместо
        // map.children[1].children[1]
        map.replaceChild(window.generateAdvertCard(advert), map.children[1]);
        map.children[1].classList.remove('hidden');
        map.children[1].children[1].addEventListener('click', function () {
          map.children[1].classList.add('hidden');
        });
      });
    };

    for (var j = 0; j < mapPins.length; j++) {
      var pin = mapPins[j];
      var advert = window.adverts[j];
      onPinClick(pin, advert);
    }
  };

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
