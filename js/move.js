'use strict';

(function () {

  var MAP_BORDERS = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 150,
      max: 500
    }
  };

  window.onPinMove = function (evt) {
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

      if ((window.map.mainPin.offsetLeft - shift.x) < MAP_BORDERS.x.min) {
        window.map.mainPin.style.left = MAP_BORDERS.x.min + 'px';
      } else if ((window.map.mainPin.offsetLeft - shift.x) > MAP_BORDERS.x.max) {
        window.map.mainPin.style.left = MAP_BORDERS.x.max + 'px';
      } else {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((window.map.mainPin.offsetTop - shift.y) < MAP_BORDERS.y.min) {
        window.map.mainPin.style.top = MAP_BORDERS.y.min + 'px';
      } else if ((window.map.mainPin.offsetTop - shift.y) > MAP_BORDERS.y.max) {
        window.map.mainPin.style.top = MAP_BORDERS.y.max + 'px';
      } else {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.address.value = (window.map.mainPin.offsetLeft + window.util.POSITION_OFFSET.x) + ', '
          + (window.map.mainPin.offsetTop + window.util.POSITION_OFFSET.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    window.pin.removePins();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
