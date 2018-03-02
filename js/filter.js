'use strict';

(function () {
  // var typeFilter = window.map.map.querySelector('#housing-type');
  // var priceFilter = window.map.map.querySelector('#housing-price');
  // var roomsFilter = window.map.map.querySelector('#housing-rooms');
  // var guestsFilter = window.map.map.querySelector('#housing-guests');
  // var featuresFilters = document.querySelectorAll('[id|="filter"]');
  //
  // var priceValues = {
  //   any: function () {
  //     return true;
  //   },
  //   middle: function (price) {
  //     return price > 10000 && price < 50000;
  //   },
  //   low: function (price) {
  //     return price < 10000;
  //   },
  //   high: function (price) {
  //     return price > 50000;
  //   }
  // };
  //
  //
  // var filterByType = function (advert) {
  //   if (typeFilter.value === 'any') {
  //     return true;
  //   }
  //   return advert.offer.type === typeFilter.value;
  // };
  //
  // var filterByPrice = function (advert) {
  //   var activePrice = priceValues[priceFilter.value];
  //   return activePrice(advert.offer.price);
  // };
  //
  // var filterByRooms = function (advert) {
  //   if (roomsFilter.value === 'any') {
  //     return true;
  //   }
  //   return advert.offer.rooms.toString() === roomsFilter.value;
  // };
  //
  // var filterByGuests = function (advert) {
  //   if (guestsFilter.value === 'any') {
  //     return true;
  //   }
  //   return advert.offer.guests.toString() === guestsFilter.value;
  // };
  //
  // var filterByFeature = function (advert) {
  //   var featuresFiltersActive = document.querySelectorAll('[id|="filter"]:checked');
  //   var activeFeatures = [].map.call(featuresFiltersActive, function (filter) {
  //     return filter.value;
  //   });
  //   activeFeatures.every(function (feature) {
  //     return advert.offer.features.includes(feature);
  //   });
  // };
  //
  // // var filterPins = function (advert) {
  // //   return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert)
  // //     && filterByGuests(advert);
  // // };
  //
  // window.onFilterChange = function () {
  //   var data = loadedData.splice(0);
  //
  //   var filteredPins = data.filter(function (advert) {
  //     return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert)
  //       && filterByGuests(advert);
  //   });
  //
  //   window.map.map.children[1].hidden = true;
  //
  //   window.pin.removePins(loadedData);
  //
  //   window.pin.renderPins(filteredPins);
  //
  //   typeFilter.addEventListener('change', window.onFilterChange);
  //
  //   priceFilter.addEventListener('change', window.onFilterChange);
  //
  //   roomsFilter.addEventListener('change', window.onFilterChange);
  //
  //   guestsFilter.addEventListener('change', window.onFilterChange);
  //
  //   [].forEach.call(featuresFilters, function (filter) {
  //     filter.addEventListener('change', window.onFilterChange);
  //   });
  // };
})();
