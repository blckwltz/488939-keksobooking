'use strict';

(function () {
  var POSITION_OFFSET = {
    x: 32,
    y: 87
  };

  window.pin = {
    renderPin: function (advert) {
      var pin = document.createElement('button');
      pin.classList.add('map__pin');
      pin.style.left = advert.location.x + POSITION_OFFSET.x + 'px';
      pin.style.top = advert.location.y + POSITION_OFFSET.y + 'px';
      pin.dataset.type = advert.offer.type;
      pin.dataset.price = advert.offer.price;
      pin.dataset.rooms = advert.offer.rooms;
      pin.dataset.guests = advert.offer.guests;
      pin.dataset.features = advert.offer.features;

      var image = document.createElement('img');
      image.src = advert.author.avatar;
      image.width = 40;
      image.height = 40;
      image.draggable = false;

      pin.appendChild(image);

      return pin;
    },
    renderPins: function (adverts) {
      var pinsNumber = adverts.length > 5 ? 5 : adverts.length;
      for (var i = 0; i < pinsNumber; i++) {
        window.map.container.appendChild(window.pin.renderPin(adverts[i]));
      }
    }
  };
})();
