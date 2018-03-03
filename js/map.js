'use strict';

(function () {

  var MAIN_PIN_POSITION = {
    x: 600,
    y: 375
  };

  var map = document.querySelector('.map');

  var mapPinMain = map.querySelector('.map__pin--main');

  var filtersContainer = map.querySelector('.map__filters-container');

  var pinsContainer = document.querySelector('.map__pins');

  var housingFilters = map.querySelectorAll('[id|="housing"]');

  [].forEach.call(housingFilters, function (filter) {
    filter.disabled = true;
  });

  window.form.address.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

  var loadedData = [];

  var loadPins = function (data) {
    loadedData = data;
    window.pin.renderPins(data);
    [].forEach.call(housingFilters, function (filter) {
      filter.disabled = false;
    });
  };

  var toActiveState = function () {
    map.classList.remove('map--faded');

    window.form.form.classList.remove('notice__form--disabled');

    [].forEach.call(window.form.selects, function (select) {
      select.disabled = false;
    });

    window.form.address.value = (mapPinMain.offsetLeft + window.util.POSITION_OFFSET.x) + ', '
      + (mapPinMain.offsetTop + window.util.POSITION_OFFSET.y);

    window.load(loadPins, window.util.renderErrorElement);

    window.filter.criteriaChangeListener = function () {
      var filteredPins = window.filter.filter(loadedData);
      window.card.hideCard();
      window.pin.removePins();
      window.pin.renderPins(filteredPins);
    };

    mapPinMain.removeEventListener('mouseup', toActiveState);
  };

  mapPinMain.addEventListener('mouseup', toActiveState);

  mapPinMain.addEventListener('mousedown', window.onPinMove);

  window.map = {
    map: map,
    mainPin: mapPinMain,
    pinsContainer: pinsContainer,
    filtersContainer: filtersContainer,
    toInactiveState: function () {
      map.classList.add('map--faded');
      window.form.form.classList.add('notice__form--disabled');

      [].forEach.call(housingFilters, function (filter) {
        filter.disabled = true;
      });

      [].forEach.call(window.form.inputs, function (input) {
        input.value = '';
        input.style = 'outline: none';
      });

      [].forEach.call(window.form.selects, function (select) {
        select.disabled = true;
      });

      [].forEach.call(window.form.features, function (feature) {
        feature.checked = false;
      });

      mapPinMain.style.left = MAIN_PIN_POSITION.x + 'px';
      mapPinMain.style.top = MAIN_PIN_POSITION.y + 'px';
      window.form.address.value = MAIN_PIN_POSITION.x + ', ' + MAIN_PIN_POSITION.y;

      window.pin.removePins();

      window.form.rooms.value = 1;

      window.form.onRoomsChange();

      map.addEventListener('mouseup', toActiveState);
    }
  };
})();
