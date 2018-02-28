'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PHOTOS_AMOUNT = 3;

  var matches = function (name) {
    FILE_TYPES.some(function (type) {
      return name.endsWith(type);
    });
  };

  var onImageChoose = function (chooser, index, image) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[index];
      var fileName = file.name.toLowerCase();

      matches(fileName);

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          image.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview');
  var avatarImage = avatarPreview.querySelector('img');

  onImageChoose(avatarChooser, 0, avatarImage);

  var photosChooser = document.querySelector('#images');
  photosChooser.multiple = true;
  var list = document.createElement('ul');
  list.style = 'width: 150px; padding: 5px 15px;' +
    ' margin-right: 10px; margin-top: 0; background-color: #dadada;' +
    ' border-radius: 5px; list-style: none';
  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    var item = document.createElement('li');
    item.classList.add('form__photo');
    var img = document.createElement('img');
    img.width = 70;
    img.height = 70;
    img.id = 'photo-' + (i + 1);
    item.appendChild(img);
    list.appendChild(item);
  }
  var fragment = document.createDocumentFragment();
  fragment.appendChild(list);
  var photosContainer = document.querySelector('.form__photo-container');
  var upload = photosContainer.querySelector('.upload');
  upload.insertBefore(fragment, photosChooser);
  var photoImages = photosContainer.querySelectorAll('.form__photo img');

  for (var j = 0; j < PHOTOS_AMOUNT; j++) {
    var images = photoImages[j];
    onImageChoose(photosChooser, j, images);
  }

  [].forEach.call(photoImages, function (image) {
    image.addEventListener('dragstart', function (evt) {
      evt.dataTransfer.setData('text', evt.target.id);
      evt.dataTransfer.effectAllowed = 'move';
    });
  });

  var items = document.querySelectorAll('.form__photo');

  [].forEach.call(items, function (it) {
    it.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });
    it.addEventListener('drop', function (evt) {
      evt.preventDefault();
      var data = evt.dataTransfer.getData('text');
      evt.currentTarget.appendChild(document.querySelector('#' + data));
    });
  });
})();
