'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  window.colorize = function (element, colors, inputSelector) {
    element.addEventListener('click', function () {
      var setColor = colors[window.util.getRandomInteger(colors.length - 1)];
      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = setColor;
      } else {
        element.style.fill = setColor;
      }
      userDialog.querySelector(inputSelector).value = setColor;
    });
  };
})();
