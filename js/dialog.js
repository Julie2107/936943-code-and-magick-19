'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var profileButton = document.querySelector('.setup-open');
  var closeProfileButton = userDialog.querySelector('.setup-close');
  var USER_DIALOG_X = '50%';
  var USER_DIALOG_Y = 80 + 'px';

  var dialogHandler = userDialog.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.dialog.closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.dialog = {
    closePopup: function () {
      userDialog.classList.add('hidden');
    }
  };

  profileButton.addEventListener('click', function () {
    openPopup();
    window.backend.load(window.setup.successHandler, window.setup.errorHandler);
    userDialog.style.left = USER_DIALOG_X;
    userDialog.style.top = USER_DIALOG_Y;
  });

  profileButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  closeProfileButton.addEventListener('click', function () {
    window.dialog.closePopup();
    document.removeEventListener('keydown', onPopupEscPress);
  });

  closeProfileButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.dialog.closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
