'use strict';

(function () {
  window.drag = {
    onItemDrag: function (evt) {
      evt.dataTransfer.setData('text', evt.target.id);
      evt.dataTransfer.effectAllowed = 'move';
    },
    onItemDrop: function (evt) {
      evt.preventDefault();
      var data = evt.dataTransfer.getData('text');
      evt.currentTarget.appendChild(document.querySelector('#' + data));
    }
  };
})();
