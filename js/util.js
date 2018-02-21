'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomElement: function (array) {
      return array[window.util.getRandomNumber(0, array.length)];
    },
    randomSeed: function () {
      return Math.random() - 0.5;
    },
    renderErrorNode: function (errorMessage, node) {
      var errorNode = document.createElement('div');
      node.style.position = 'relative';
      errorNode.textContent = errorMessage;
      errorNode.style = 'position: absolute; z-index: 10; width: 500px;' +
        ' top: 50%; left: 50%; margin-left: -250px; margin-top:' +
        ' -100px; font-size: 25px;' +
        ' text-align: center; background-color:' +
        ' rgba(180, 180, 180, 0.8); color:' +
        ' #ff5635; border-radius: 4px;';
      node.appendChild(errorNode);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          errorNode.classList.add('hidden');
        }
      });
    }
  };
})();
