'use strict';

(function () {

  var TYPE_LABELS = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {
    generateAdvertCard: function (advert) {
      var advertElement = advertTemplate.cloneNode(true);

      advertElement.querySelector('.popup__avatar').src = advert.author.avatar;

      advertElement.querySelector('h3').textContent = advert.offer.title;

      advertElement.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';

      var photosList = advertElement.querySelector('.popup__pictures');

      var photoTemplate = photosList.querySelector('li');

      advert.offer.photos.forEach(function (photo) {
        var photoElement = photoTemplate.cloneNode(true);
        var img = photoElement.querySelector('img');
        img.src = photo;
        img.style.width = 100 + 'px';
        photosList.appendChild(photoElement);
      });

      photosList.removeChild(photoTemplate);

      advertElement.querySelector('h4').textContent = TYPE_LABELS[advert.offer.type];

      var featuresElements = advertElement.querySelectorAll('.feature');

      [].forEach.call(featuresElements, function (element) {
        element.style = 'display: none';
        advert.offer.features.forEach(function (feature) {
          if (element.classList.contains('feature--' + feature)) {
            element.style = 'display: inline-block';
          }
        });
      });

      var p = advertElement.querySelectorAll('p');
      p[0].children[0].textContent = advert.offer.address;
      p[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      p[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до' +
        ' ' + advert.offer.checkout;
      p[4].textContent = advert.offer.description;

      advertElement.hidden = true;

      return advertElement;
    },
    hideCard: function () {
      if (window.map.map.children[1] !== window.map.filtersContainer) {
        window.map.map.querySelector('.map__card').hidden = true;
      }
    }
  };
})();
