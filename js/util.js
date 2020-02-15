'use strict';

(function () {
  var ECS_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ECS_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },

    getRandomInteger: function (max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  };
})();
