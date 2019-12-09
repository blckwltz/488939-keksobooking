'use strict';

(function () {
  window.drag = {
    onItemDrag: function (evt) {
      evt.dataTransfer.setData('obj_id', this.id);
      evt.dataTransfer.effectAllowed = 'copy';
    },
    onItemDrop: function (evt) {
      evt.preventDefault();
      var data = evt.dataTransfer.getData('obj_id');
      this.appendChild(document.querySelector('#' + data));
    }
  };
})();
