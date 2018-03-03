'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    POSITION_OFFSET: {
      x: 32,
      y: 87
    },
    renderErrorElement: function (errorMessage, element) {
      var errorElement = document.createElement('div');
      element.style.position = 'relative';
      errorElement.textContent = errorMessage;
      errorElement.style = 'position: absolute; z-index: 10; width: 500px;' +
        ' top: 50%; left: 50%; margin-left: -250px; margin-top:' +
        ' -100px; font-size: 25px;' +
        ' text-align: center; background-color:' +
        ' rgba(180, 180, 180, 0.8); color:' +
        ' #ff5635; border-radius: 4px;';
      element.appendChild(errorElement);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          errorElement.classList.add('hidden');
        }
      });
    }
  };
})();
