'use strict';

(function () {
  var POSITION_OFFSET = {
    x: 32,
    y: 87
  };

  window.renderPin = function (advert) {
    var pin = document.createElement('button');
    pin.classList.add('map__pin');
    pin.style.left = advert.location.x + POSITION_OFFSET.x + 'px';
    pin.style.top = advert.location.y + POSITION_OFFSET.y + 'px';

    var image = document.createElement('img');
    image.src = advert.author.avatar;
    image.width = 40;
    image.height = 40;
    image.draggable = false;

    pin.appendChild(image);

    return pin;
  };
})();
