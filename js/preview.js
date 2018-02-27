'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview');
  var avatarImage = avatarPreview.querySelector('img');

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var fileName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImage.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  var photosChooser = document.querySelector('#images');
  var ul = document.createElement('ul');
  var li = document.createElement('li');
  var img = document.createElement('img');
  li.classList.add('form__photo');
  li.appendChild(img);
  ul.appendChild(li);
  var photosContainer = document.querySelector('.form__photo-container');
  var upload = photosContainer.querySelector('.upload');
  upload.insertBefore(ul, photosChooser);
  var photoImage = photosContainer.querySelector('.form__photo img');
  photoImage.width = 40;
  photoImage.height = 44;

  photosChooser.addEventListener('change', function () {
    var photo = photosChooser.files[0];
    var fileName = photo.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoImage.src = reader.result;
      });

      reader.readAsDataURL(photo);
    }
  });
})();
