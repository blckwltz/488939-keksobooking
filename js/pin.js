'use strict';

(function () {
  window.pin = {
    renderPin: function (advert) {
      var pin = document.createElement('button');
      pin.classList.add('map__pin');
      pin.style.left = advert.location.x + window.util.POSITION_OFFSET.x + 'px';
      pin.style.top = advert.location.y + window.util.POSITION_OFFSET.y + 'px';

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
        var pin = window.map.container.appendChild(window.pin.renderPin(adverts[i]));
        var advert = window.generateAdvertCard(adverts[i]);
        window.pin.onPinClick(pin, advert);
      }
    },
    onPinClick: function (pin, advert) {
      pin.addEventListener('click', function () {
        window.map.map.replaceChild(advert, window.map.map.children[1]);
        window.map.map.children[1].hidden = false;
        window.map.map.children[1].children[1].addEventListener('click', function () {
          window.map.map.children[1].hidden = true;
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.ESC_KEYCODE) {
            window.map.map.children[1].hidden = true;
          }
        });
      });
    },
    removePins: function () {
      var mapPins = window.map.container.querySelectorAll('button:not(.map__pin--main)');
      [].forEach.call(mapPins, function (pin) {
        window.map.container.removeChild(pin);
      });
    }
  };
})();
