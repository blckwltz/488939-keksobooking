'use strict';

(function () {
  var typeFilter = window.map.map.querySelector('#housing-type');
  var priceFilter = window.map.map.querySelector('#housing-price');
  var roomsFilter = window.map.map.querySelector('#housing-rooms');
  var guestsFilter = window.map.map.querySelector('#housing-guests');
  var featuresFilters = document.querySelectorAll('[id|="filter"]');
  var data = window.map.pins.splice(0);

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

  var featuresFiltersActive = document.querySelectorAll('[id|="filter"]:checked');

  var activeFeatures = [].map.call(featuresFiltersActive, function (feature) {
    return feature.value;
  });

  var filterByType = function (advert) {
    return advert.offer.type === typeFilter.value;
  };

  var filterByPrice = function (advert) {
    var activePrice = priceValues[priceFilter.value];
    return activePrice(advert.offer.price);
  };

  var filterByRooms = function (advert) {
    return advert.offer.rooms.toString() === roomsFilter.value;
  };

  var filterByGuests = function (advert) {
    return advert.offer.guests.toString() === guestsFilter.value;
  };

  var filterByFeature = function (advert) {
    activeFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  var filterPins = function (advert) {
    return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert)
          && filterByGuests(advert) && filterByFeature(advert);
  };

  var onFilterChange = function () {
    var filteredPins = data.filter(function (advert) {
      filterPins(advert);
    });

    window.pin.removePins(data);

    window.pin.renderPins(filteredPins);
  };

  typeFilter.addEventListener('input', function () {
    window.debounce(onFilterChange, 500);
  });

  priceFilter.addEventListener('input', function () {
    window.debounce(onFilterChange, 500);
  });

  roomsFilter.addEventListener('input', function () {
    window.debounce(onFilterChange, 500);
  });

  guestsFilter.addEventListener('input', function () {
    window.debounce(onFilterChange, 500);
  });

  [].forEach.call(featuresFilters, function (feature) {
    feature.addEventListener('change', function () {
      window.debounce(onFilterChange, 500);
    });
  });
})();
