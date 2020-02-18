'use strict';

(function () {
  // mockes constants
  // var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SIMILIAR_WIZARDS_AMOUNT = 4;
  var userDialog = document.querySelector('.setup');

  var setupSimilar = userDialog.querySelector('.setup-similar');
  var similarList = userDialog.querySelector('.setup-similar-list');
  var setupWizard = userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /* mockes
  var wizards = [
    {
      name: NAMES[window.util.getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[window.util.getRandomInteger(SECOND_NAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandomInteger(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandomInteger(EYES_COLORS.length)]
    },
    {
      name: NAMES[window.util.getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[window.util.getRandomInteger(SECOND_NAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandomInteger(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandomInteger(EYES_COLORS.length)]
    },
    {
      name: NAMES[window.util.getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[window.util.getRandomInteger(SECOND_NAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandomInteger(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandomInteger(EYES_COLORS.length)]
    },
    {
      name: NAMES[window.util.getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[window.util.getRandomInteger(SECOND_NAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandomInteger(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandomInteger(EYES_COLORS.length)]
    },
  ]; */
  window.colorize(wizardCoat, COAT_COLORS, 'input[name=coat-color]');
  window.colorize(wizardEyes, EYES_COLORS, 'input[name=eyes-color]');
  window.colorize(wizardFireball, FIREBALL_COLORS, 'input[name=fireball-color]');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };
  // для window.backend.laod, загрузка похожих персонажей
  var form = userDialog.querySelector('.setup-wizard-form');

  var getResponse = function () {
    window.dialog.closePopup();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), getResponse, window.setup.errorHandler);
    evt.preventDefault();
  });

  var returnWizardFragment = function (wizards) {
    if (similarList.children.length > 0) {
      var similarItems = Array.from(similarList.children);
      similarItems.forEach(function (item) {
        item.remove();
      });
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < SIMILIAR_WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarList.appendChild(fragment);
  };

  window.setup = {
    successHandler: function (wizards) {
      returnWizardFragment(wizards);
      setupSimilar.classList.remove('hidden');
    },

    // блок для вывода ошибок
    errorHandler: function (errorMessage) {
      var errorBlock = document.createElement('div');
      errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
      errorBlock.style.position = 'absolute';
      errorBlock.style.left = 0;
      errorBlock.style.top = 0;
      errorBlock.style.fontSize = '30px';

      errorBlock.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorBlock);
    }
  };
})();
