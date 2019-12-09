'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var matches = function (name) {
    return FILE_TYPES.some(function (type) {
      return name.endsWith(type);
    });
  };

  var avatarPreview = window.form.form.querySelector('.notice__preview');

  var showAvatar = function (element) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {

      var avatarImage = avatarPreview.querySelector('img');

      avatarImage.src = reader.result;
    });

    reader.readAsDataURL(element);
  };

  var avatarChooser = window.form.form.querySelector('#avatar');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    matches(fileName);

    if (matches) {
      showAvatar(file);
    }
  });

  var photosChooser = window.form.form.querySelector('#images');

  var list = document.createElement('div');
  list.style = 'width: 150px; padding: 5px 15px;' +
    ' margin-right: 10px; margin-top: 0; background-color: #dadada;' +
    ' border-radius: 5px; list-style: none';
  list.hidden = true;
  list.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });
  list.addEventListener('drop', window.drag.onItemDrop);
  var photosContainer = window.form.form.querySelector('.form__photo-container');
  var upload = photosContainer.querySelector('.upload');

  var showPhoto = function (element, value) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {

      var img = document.createElement('img');
      img.classList.add('form__photo');
      img.id = 'photo-' + (value + list.children.length + 1);
      img.width = 70;
      img.height = 70;
      list.appendChild(img);
      list.hidden = false;

      var photoImage = photosContainer.querySelector('#photo-'
        + (value + list.children.length));

      photoImage.src = reader.result;

      var photoImages = photosContainer.querySelectorAll('.form__photo');

      [].forEach.call(photoImages, function (image) {
        image.addEventListener('dragstart', window.drag.onItemDrag);
      });
    });

    reader.readAsDataURL(element);
  };

  photosChooser.addEventListener('change', function () {
    upload.insertBefore(list, photosChooser);

    [].forEach.call(photosChooser.files, function (file, index) {
      var fileName = file.name.toLowerCase();

      matches(fileName);

      if (matches) {
        showPhoto(file, index);
      }
    });
  });

  window.preview = {
    resetAvatar: function () {
      avatarPreview.querySelector('img').src = 'img/muffin.png';
    },
    removePhotos: function () {
      upload.removeChild(upload.children[0]);
    }
  };
})();
