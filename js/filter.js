'use strict';

(function () {

  var FILTERS_TIMEOUT = 500;

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var filterForm = document.querySelector('.map__filters');

  var priceValues = {
    any: function () {
      return true;
    },
    middle: function (price) {
      return price > 10000 && price < 50000;
    },
    low: function (price) {
      return price < 10000;
    },
    high: function (price) {
      return price > 50000;
    }
  };


  var filterByType = function (advert) {
    if (typeFilter.value === 'any') {
      return true;
    }
    return advert.offer.type === typeFilter.value;
  };

  var filterByPrice = function (advert) {
    var activePrice = priceValues[priceFilter.value];
    return activePrice(advert.offer.price);
  };

  var filterByRooms = function (advert) {
    if (roomsFilter.value === 'any') {
      return true;
    }
    return advert.offer.rooms.toString() === roomsFilter.value;
  };

  var filterByGuests = function (advert) {
    if (guestsFilter.value === 'any') {
      return true;
    }
    return advert.offer.guests.toString() === guestsFilter.value;
  };

  var filterByFeature = function (advert) {
    var featuresFiltersActive = document.querySelectorAll('[name="features"]:checked');
    var activeFeatures = [].map.call(featuresFiltersActive, function (filter) {
      return filter.value;
    });
    return activeFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  var filterByParameters = function (advert) {
    return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert)
      && filterByGuests(advert) && filterByFeature(advert);
  };

  var onFilterChange = function () {
    if (typeof window.filter.criteriaChangeListener === 'function') {
      window.filter.criteriaChangeListener();
    }
  };

  filterForm.addEventListener('change', function () {
    window.debounce(onFilterChange, FILTERS_TIMEOUT);
  }, true);

  window.filter = {
    criteriaChangeListener: null,
    filter: function (adverts) {
      return adverts.slice().filter(filterByParameters);
    }
  };
})();
