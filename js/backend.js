'use strict';

(function () {

  window.load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('При загрузке объявлений произошла ошибка ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка объявлений заняла более ' + xhr.timeout / 1000 + ' секунд');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);

    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('При отправке формы произошла ошибка ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Отправка данных заняла более ' + xhr.timeout / 1000 + ' секунд');
    });

    xhr.timeout = 10000;

    xhr.open('POST', url);

    xhr.send(data);
  };
})();
