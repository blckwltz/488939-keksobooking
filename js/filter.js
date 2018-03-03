'use strict';

(function () {
  // var typeFilter = document.querySelector('#housing-type');
  // var priceFilter = document.querySelector('#housing-price');
  // var roomsFilter = document.querySelector('#housing-rooms');
  // var guestsFilter = document.querySelector('#housing-guests');
  // var housingFilters = document.querySelectorAll('[id|="housing"]');
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
  //   var featuresFiltersActive = document.querySelectorAll('[name="features"]:checked');
  //   var activeFeatures = [].map.call(featuresFiltersActive, function (filter) {
  //     return filter.value;
  //   });
  //   return activeFeatures.every(function (feature) {
  //     return advert.offer.features.includes(feature);
  //   });
  // };
  //
  // var filterByParameters = function (advert) {
  //   return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert)
  //     && filterByGuests(advert) && filterByFeature(advert);
  // };
  //
  // window.filterPins = function (data) {
  //   var filteredPins = data.slice().filter(filterByParameters);
  //
  //   window.card.hideCard();
  //
  //   window.pin.removePins();
  //
  //   window.pin.renderPins(filteredPins);
  // };
  //
  // window.onFilterChange = function () {
  //   [].forEach.call(housingFilters, function (filter) {
  //     filter.addEventListener('change', window.filterPins);
  //   });
  // };
})();
