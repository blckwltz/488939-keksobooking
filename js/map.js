'use strict';

(function () {

  var MAIN_PIN_POSITION = {
    x: 600,
    y: 375
  };

  var map = document.querySelector('.map');

  var mapPinMain = map.querySelector('.map__pin--main');

  var mapFilters = map.querySelector('.map__filters-container');

  var pinsContainer = document.querySelector('.map__pins');

  map.insertBefore(window.generateAdvertCard(window.adverts[0]), mapFilters);

  var housingFilters = map.querySelectorAll('[id|="housing"]');

  [].forEach.call(housingFilters, function (filter) {
    filter.disabled = true;
  });

  window.form.address.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

  var loadedData = []; // Копировать

  var onPinsLoad = function (data) {
    loadedData = data;
    window.pin.renderPins(data);
    [].forEach.call(housingFilters, function (filter) {
      filter.disabled = false;
    });
  };

  var toActiveState = function () {
    map.classList.remove('map--faded');

    window.form.form.classList.remove('notice__form--disabled');

    [].forEach.call(window.form.filters, function (filter) {
      filter.disabled = false;
    });

    window.form.address.value = (mapPinMain.offsetLeft + window.util.POSITION_OFFSET.x) + ', '
      + (mapPinMain.offsetTop + window.util.POSITION_OFFSET.y);

    window.load(onPinsLoad, window.util.renderErrorElement);
  };

  mapPinMain.addEventListener('mouseup', toActiveState);

  mapPinMain.addEventListener('mousedown', window.onPinMove);

  window.map = {
    map: map,
    mainPin: mapPinMain,
    pins: loadedData,
    container: pinsContainer,
    toInactiveState: function () {
      map.classList.add('map--faded');
      window.form.form.classList.add('notice__form--disabled');

      [].forEach.call(housingFilters, function (filter) {
        filter.disabled = true;
      });

      [].forEach.call(window.form.filters, function (filter) {
        filter.disabled = true;
      });

      mapPinMain.style.left = MAIN_PIN_POSITION.x + 'px';
      mapPinMain.style.top = MAIN_PIN_POSITION.y + 'px';
      window.form.address.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

      window.pin.removePins();

      window.form.onRoomsChange();
    }
  };
})();
