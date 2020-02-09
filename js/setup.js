'use strict';

var ECS_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var userDialog = document.querySelector('.setup');
var profileButton = document.querySelector('.setup-open');
var closeProfileButton = userDialog.querySelector('.setup-close');
var setupSimilar = userDialog.querySelector('.setup-similar');
var similarList = userDialog.querySelector('.setup-similar-list');
var getRandomInteger = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};
var wizards = [
  {
    name: NAMES[getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[getRandomInteger(SECOND_NAMES.length)],
    coatColor: COAT_COLORS[getRandomInteger(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInteger(EYES_COLORS.length)]
  },
  {
    name: NAMES[getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[getRandomInteger(SECOND_NAMES.length)],
    coatColor: COAT_COLORS[getRandomInteger(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInteger(EYES_COLORS.length)]
  },
  {
    name: NAMES[getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[getRandomInteger(SECOND_NAMES.length)],
    coatColor: COAT_COLORS[getRandomInteger(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInteger(EYES_COLORS.length)]
  },
  {
    name: NAMES[getRandomInteger(NAMES.length)] + ' ' + SECOND_NAMES[getRandomInteger(SECOND_NAMES.length)],
    coatColor: COAT_COLORS[getRandomInteger(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInteger(EYES_COLORS.length)]
  },
];

var onPopupEscPress = function (evt) {
  if (evt.key === ECS_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
};

profileButton.addEventListener('click', function () {
  openPopup();
});

profileButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

closeProfileButton.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onPopupEscPress);
});

closeProfileButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

var setElementColor = function (element, color, inputSelector) {
  var setColor = color;
  element.style.fill = setColor;
  userDialog.querySelector(inputSelector).value = setColor;
};

wizardCoat.addEventListener('click', function () {
  setElementColor(wizardCoat, COAT_COLORS[getRandomInteger(COAT_COLORS.length - 1)], 'input[name=coat-color]');
});

wizardEyes.addEventListener('click', function () {
  setElementColor(wizardEyes, EYES_COLORS[getRandomInteger(EYES_COLORS.length - 1)], 'input[name=eyes-color]');
});

wizardFireball.addEventListener('click', function () {
  var setColor = FIREBALL_COLORS[getRandomInteger(FIREBALL_COLORS.length - 1)];
  wizardFireball.style.background = setColor;
  userDialog.querySelector('input[name=fireball-color]').value = setColor;
});

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);

setupSimilar.classList.remove('hidden');
