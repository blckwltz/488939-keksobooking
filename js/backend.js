'use strict';

(function () {
  var Status = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var HTTP_TIMEOUT = 10000;

  window.load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          onLoad(xhr.response);
          break;
        case Status.BAD_REQUEST:
          onError('При загрузке объявлений произошла' +
          ' ошибка ' + xhr.status, window.map);
          break;
        case Status.NOT_FOUND:
          onError('При загрузке объявлений произошла' +
            ' ошибка ' + xhr.status, window.map);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', window.map);
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка объявлений заняла более ' + xhr.timeout / 1000 + ' секунд', window.map);
    });

    xhr.timeout = HTTP_TIMEOUT;

    xhr.open('GET', url);

    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          onLoad(xhr.response);
          break;
        case Status.BAD_REQUEST:
          onError('При отправке формы произошла' +
            ' ошибка ' + xhr.status, window.form.form);
          break;
        case Status.NOT_FOUND:
          onError('При отправке формы произошла' +
            ' ошибка ' + xhr.status, window.form.form);
          break;
        case Status.INTERNAL_SERVER_ERROR:
          onError('При отправке формы произошла' +
            ' ошибка ' + xhr.status, window.form.form);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', window.form.form);
    });

    xhr.addEventListener('timeout', function () {
      onError('Отправка данных заняла более ' + (xhr.timeout / 1000) + ' секунд', window.form.form);
    });

    xhr.timeout = HTTP_TIMEOUT;

    xhr.open('POST', url);

    xhr.send(data);
  };
})();
