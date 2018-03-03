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

      var x = Math.max(MAP_BORDERS.x.min, Math.min(window.map.mainPin.offsetLeft -
        shift.x, MAP_BORDERS.x.max));
      window.map.mainPin.style.left = x + 'px';

      var y = Math.max(MAP_BORDERS.y.min, Math.min(window.map.mainPin.offsetTop -
        shift.y, MAP_BORDERS.y.max));
      window.map.mainPin.style.top = y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
