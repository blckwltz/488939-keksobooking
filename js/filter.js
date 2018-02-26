'use strict';

(function () {
  // var typeFilter = window.map.map.querySelector('#housing-type');
  // var priceFilter = window.map.map.querySelector('#housing-price');
  // var roomsFilter = window.map.map.querySelector('#housing-rooms');
  // var guestsFilter = window.map.map.querySelector('#housing-guests');
  // var wifiFilter = window.map.map.querySelector('#filter-wifi');
  // var dishwasherFilter = window.map.map.querySelector('#filter-dishwasher');
  // var parkingFilter = window.map.map.querySelector('#filter-parking');
  // var washerFilter = window.map.map.querySelector('#filter-washer');
  // var elevatorFilter = window.map.map.querySelector('#filter-elevator');
  // var conditionerFilter = window.map.map.querySelector('#filter-conditioner');
  //
  // var Prices = {
  //   low: 10000,
  //   high: 50000
  // };
  //
  // var filterPins = function () {
  //
  //   var mapPins = window.map.container.querySelectorAll('button:not(.map__pin--main)');
  //
  //   window.map.removePins(mapPins);
  //
  //   window.map.map.children[1].hidden = true;
  //
  //   var activeFeatures = [];
  //
  //   var featuresFilters = document.querySelectorAll('[type="checkbox"]');
  //
  //   [].forEach.call(featuresFilters, function (filter) {
  //     if (filter.checked) {
  //       activeFeatures.push(filter.value);
  //     }
  //   });
  //
  //   var filterFeatures = function (array, element) {
  //     array.forEach(function () {
  //       element.hidden = !array.includes(element.value);
  //     });
  //   };
  //
  //   var sameFeaturesPins = [].forEach.call(window.map.data, function (pin) {
  //     filterFeatures(activeFeatures, pin);
  //   });
  //
  //   var wifiPins = window.map.data.filter(function (pin) {
  //     return pin.offer.features[0] === wifiFilter.value;
  //   });
  //
  //   var sameTypePins = window.map.data.filter(function (pin) {
  //     return pin.offer.type === typeFilter.value;
  //   });
  //
  //   var samePricePins = window.map.data.filter(function (pin) {
  //     return pin.offer.price === priceFilter.value;
  //   });
  //
  //   var sameRoomsPins = window.map.data.filter(function (pin) {
  //     return pin.offer.rooms.toString() === roomsFilter.value;
  //   });
  //
  //   var sameGuestsPins = window.map.data.filter(function (pin) {
  //     return pin.offer.guests.toString() === guestsFilter.value;
  //   });
  //
  //   var filteredPins = sameTypePins.concat(samePricePins).concat(sameRoomsPins).
  //       concat(sameGuestsPins).concat(wifiPins);
  //
  //   var uniquePins = filteredPins.filter(function (pin, index) {
  //     return filteredPins.indexOf(pin) === index;
  //   });
  //
  //   window.pin.renderPins(uniquePins);
  // };
  //
  // typeFilter.addEventListener('input', function () {
  //   window.debounce(filterPins, 500);
  //   if (typeFilter.value === 'any') {
  //     window.pin.renderPins(window.map.data);
  //   }
  // });
  // priceFilter.addEventListener('input', function () {
  //   filterPins();
  //   if (priceFilter.value === 'any') {
  //     window.pin.renderPins(window.map.data);
  //   }
  // });
  // roomsFilter.addEventListener('input', function () {
  //   filterPins();
  //   if (roomsFilter.value === 'any') {
  //     window.pin.renderPins(window.map.data);
  //   }
  // });
  // guestsFilter.addEventListener('input', function () {
  //   filterPins();
  //   if (guestsFilter.value === 'any') {
  //     window.pin.renderPins(window.map.data);
  //   }
  // });
  //
  // wifiFilter.addEventListener('change', function () {
  //   if (wifiFilter.checked === false) {
  //     wifiFilter.value = '';
  //     window.pin.renderPins(window.map.data);
  //   } else {
  //     wifiFilter.value = 'wifi';
  //   }
  //   window.debounce(filterPins, 500);
  // });
  //
  // dishwasherFilter.addEventListener('change', function () {
  //   filterPins();
  // });
  //
  // parkingFilter.addEventListener('change', function () {
  //   filterPins();
  // });
  //
  // washerFilter.addEventListener('change', function () {
  //   filterPins();
  // });
  //
  // elevatorFilter.addEventListener('change', function () {
  //   filterPins();
  // });
  //
  // conditionerFilter.addEventListener('change', function () {
  //   filterPins();
  // });
  //
  // var lastTimeout;
  // window.debounce = function (func, interval) {
  //   if (lastTimeout) {
  //     window.clearTimeout(lastTimeout);
  //   }
  //   lastTimeout = window.setTimeout(func, interval);
  // };
})();
