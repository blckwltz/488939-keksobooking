'use strict';

(function () {

  var renderPin = function (advert) {
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
  };

  var currentCard;

  var showCards = function (pin, advert) {
    pin.addEventListener('click', function () {
      if (window.map.map.children[1] === window.map.filtersContainer) {
        window.map.map.insertBefore(currentCard, window.map.filtersContainer);
      }
      window.map.map.replaceChild(advert, window.map.map.children[1]);
      window.map.map.children[1].hidden = false;
      window.map.map.children[1].children[1].addEventListener('click', function () {
        window.card.hideCard();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          window.card.hideCard();
        }
      });
    });
  };

  window.pin = {
    renderPins: function (adverts) {
      var pinsNumber = adverts.length > 5 ? 5 : adverts.length;
      for (var i = 0; i < pinsNumber; i++) {
        var pin = window.map.pinsContainer.appendChild(renderPin(adverts[i]));
        currentCard = window.card.generateAdvertCard(adverts[i]);
        showCards(pin, currentCard);
      }
    },
    removePins: function () {
      var mapPins = window.map.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
      [].forEach.call(mapPins, function (pin) {
        window.map.pinsContainer.removeChild(pin);
      });
    }
  };
})();
