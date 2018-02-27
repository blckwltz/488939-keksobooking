'use strict';

(function () {
  var typeFilter = window.map.map.querySelector('#housing-type');
  var priceFilter = window.map.map.querySelector('#housing-price');
  var roomsFilter = window.map.map.querySelector('#housing-rooms');
  var guestsFilter = window.map.map.querySelector('#housing-guests');
  var featuresFilters = document.querySelectorAll('[id|="filter"]');
  var data = window.map.pins.splice(0);

  var selectedPrice = priceFilter.value;

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

  var filterFeatures = function (array, element) {
    array.forEach(function () {
      element.hidden = !array.includes(element.value);
    });
  };

  var filterPins = function () {
    data.forEach(function (pin) {

      window.map.map.children[1].hidden = true;

      var activeFeatures = [].map.call(featuresFiltersActive, function (feature) {
        return feature.value;
      });

      var filterByType = function () {
        return pin.offer.type === typeFilter.value;
      };

      var filterByPrice = function () {
        var activePrice = priceValues[selectedPrice];
        return activePrice(pin.offer.price);
      };

      var filterByRooms = function () {
        return pin.offer.rooms.toString() === roomsFilter.value;
      };

      var filterByGuests = function () {
        return pin.offer.guests.toString() === guestsFilter.value;
      };

      var filterByFeature = function () {
        filterFeatures(activeFeatures, pin);
      };

      var filter = function () {
        return filterByType && filterByPrice && filterByRooms
          && filterByGuests && filterByFeature;
      };

      var filteredPins = data.filter(filter);

      window.pin.removePins(data);

      window.pin.renderPins(filteredPins);
    });
  };

  typeFilter.addEventListener('input', function () {
    window.debounce(filterPins, 500);
  });

  priceFilter.addEventListener('input', function () {
    window.debounce(filterPins, 500);
  });

  roomsFilter.addEventListener('input', function () {
    window.debounce(filterPins, 500);
  });

  guestsFilter.addEventListener('input', function () {
    window.debounce(filterPins, 500);
  });

  [].forEach.call(featuresFilters, function (filter) {
    filter.addEventListener('change', function () {
      window.debounce(filterPins, 500);
    });
  });
})();
