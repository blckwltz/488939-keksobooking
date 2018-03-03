'use strict';

(function () {

  var OPTIONS = [
    [2],
    [1, 2],
    [0, 1, 2],
    [3]
  ];
  var noticeForm = document.querySelector('.notice__form');

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(noticeForm), function () {
      window.map.toInactiveState();
    }, window.util.renderErrorElement);
  });

  var noticeFormTitle = noticeForm.querySelector('#title');

  noticeFormTitle.required = true;

  noticeFormTitle.minLength = 30;

  noticeFormTitle.maxLength = 100;

  var noticeFormAddress = noticeForm.querySelector('#address');

  noticeFormAddress.readOnly = true;

  var noticeFormPrice = noticeForm.querySelector('#price');

  noticeFormPrice.required = true;

  noticeFormPrice.min = 1000;

  noticeFormPrice.max = 1000000;

  var noticeFormType = noticeForm.querySelector('#type');

  var onTypeChange = function () {
    var minimumPrices = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };
    noticeFormPrice.min = minimumPrices[noticeFormType.value];
  };

  noticeFormType.addEventListener('input', function () {
    onTypeChange();
  });

  var noticeFormTimeIn = noticeForm.querySelector('#timein');

  var noticeFormTimeOut = noticeForm.querySelector('#timeout');

  var onTimeChange = function (left, right) {
    right.value = left.value;
  };

  noticeFormTimeIn.addEventListener('input', function () {
    onTimeChange(noticeFormTimeIn, noticeFormTimeOut);
  });

  noticeFormTimeOut.addEventListener('input', function () {
    onTimeChange(noticeFormTimeOut, noticeFormTimeIn);
  });

  var noticeFormRoomNumber = noticeForm.querySelector('#room_number');

  var noticeFormCapacity = noticeForm.querySelector('#capacity');

  var onRoomsChange = function () {
    var allowedOptions = OPTIONS[noticeFormRoomNumber.selectedIndex];
    var defaultOption = allowedOptions[0];
    noticeFormCapacity[defaultOption].selected = true;
    [].forEach.call(noticeFormCapacity.options, function (option, index) {
      option.hidden = !allowedOptions.includes(index);
    });
  };

  noticeFormRoomNumber.addEventListener('input', onRoomsChange);

  onRoomsChange();

  var noticeFormSelects = noticeForm.querySelectorAll('fieldset');

  [].forEach.call(noticeFormSelects, function (filter) {
    filter.disabled = true;
  });

  var noticeFormInputs = noticeForm.querySelectorAll('.form__element input');

  [].forEach.call(noticeFormInputs, function (input) {
    input.addEventListener('input', function () {
      if (input.checkValidity()) {
        input.style = 'outline: none';
      }
    });
  });

  var noticeFormSubmit = noticeForm.querySelector('.form__submit');

  noticeFormSubmit.addEventListener('click', function () {
    [].forEach.call(noticeFormInputs, function (input) {
      if (!input.checkValidity()) {
        input.style = 'outline: thick double red';
      }
    });
  });

  var noticeFormReset = noticeForm.querySelector('.form__reset');

  noticeFormReset.addEventListener('click', function () {
    window.map.toInactiveState();
  });

  window.form = {
    DEFAULT_ROOM_NUMBER: 1,
    DEFAULT_TYPE: 'flat',
    form: noticeForm,
    address: noticeFormAddress,
    type: noticeFormType,
    rooms: noticeFormRoomNumber,
    inputs: noticeFormInputs,
    selects: noticeFormSelects,
    features: noticeForm.querySelectorAll('[name="features"]'),
    description: noticeForm.querySelector('#description'),
    onRoomsChange: function () {
      var allowedOptions = OPTIONS[noticeFormRoomNumber.selectedIndex];
      var defaultOption = allowedOptions[0];
      noticeFormCapacity[defaultOption].selected = true;
      [].forEach.call(noticeFormCapacity.options, function (option, index) {
        option.hidden = !allowedOptions.includes(index);
      });
    }
  };
})();
