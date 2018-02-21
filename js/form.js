'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');

  noticeForm.action = 'https://js.dump.academy/keksobooking';

  noticeForm.addEventListener('submit', function () {
    window.upload(new FormData(noticeForm), function () {
      noticeFormTitle.value = '';
      noticeFormPrice.value = '';
      noticeFormTimeIn.value = '12:00';
      noticeFormRoomNumber.value = '1';
    }, window.util.renderErrorNode);
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
    if (noticeFormType.value === 'bungalo') {
      noticeFormPrice.min = 0;
    } if (noticeFormType.value === 'flat') {
      noticeFormPrice.min = 1000;
    } if (noticeFormType.value === 'house') {
      noticeFormPrice.min = 5000;
    } if (noticeFormType.value === 'palace') {
      noticeFormPrice.min = 10000;
    }
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

  var options = [
    [2],
    [1, 2],
    [0, 1, 2],
    [3]
  ];

  var onRoomsChange = function () {
    var allowedOptions = options[noticeFormRoomNumber.selectedIndex];
    var defaultOption = allowedOptions[0];
    noticeFormCapacity[defaultOption].selected = true;
    [].forEach.call(noticeFormCapacity.options, function (option, index) {
      option.hidden = !allowedOptions.includes(index);
    });
  };

  noticeFormRoomNumber.addEventListener('input', onRoomsChange);

  onRoomsChange();

  window.form = {
    form: noticeForm,
    address: noticeFormAddress
  };
})();
