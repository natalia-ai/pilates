'use strict';
(function () {
var ELEMENT_N = 3;
var cardTemplate = $('#template-card').children('.card-box'),
  cardsContainer = $('.page__cards-box'),
  renderedCards = [];

var cardIds = ['templateId-1', 'templateId-2', 'templateId-3'];
var cardBoxDescriptions = ['Печень утки разварная с артишоками', 'Головы щучьи с чесноком да свежайшая сёмгушка', 'Филе из цыплят с трюфелями в бульоне'];
var productAdditives = ['с фуа-гра', 'с рыбой', 'с курой'];
var numberOfPortions = ['10', '40', '100'];
var numbersForDeclensionOfPortions = ['10', '40', '100'];
var numberOfBonuses = ['', '2', '5'];
var numbersForDeclensionOfBonuses = ['1', '2', '5'];
var productWeights = ['0,5', '2', '5'];
var inputAttributes = ['foiegras', 'fish', 'chicken'];

function makeObject() {
  var objectArray = Array(ELEMENT_N);
  for (var i = 0; i < ELEMENT_N; i++) {
    var objectTemplate = {};

    objectTemplate.cardId = cardIds[i];
    objectTemplate.cardBoxDescription = cardBoxDescriptions[i] + '.';
    objectTemplate.additive = productAdditives[i];
    objectTemplate.portion = numberOfPortions[i];
    objectTemplate.bonus = numberOfBonuses[i];
    objectTemplate.numberForDeclensionOfPortions = numbersForDeclensionOfPortions[i];
    objectTemplate.numberForDeclensionOfBonuses = numbersForDeclensionOfBonuses[i];
    objectTemplate.weight = productWeights[i];
    objectTemplate.inputAttribute = inputAttributes[i];
    objectArray[i] = objectTemplate;
  }
  return objectArray;
};

function createCard(product) {
  var card = cardTemplate.clone().appendTo($('.form'));
  var input = $('input');
  cardTemplate.remove();
  $('.card-box').attr("id", product.cardId);
  $('.card__subtitle').text(product.additive);
  $('.card__text--portion').prepend('<b>' + product.portion + '</b>' + declineNouns(product.numberForDeclensionOfPortions, [' порция', ' порции', ' порций']));
  var bonus = $('.card__text--bonus');
  bonus.text(declineNouns(product.numberForDeclensionOfBonuses, [' мышь', ' мыши', ' мышей']) + ' в подарок');
  bonus.prepend('<b>' + product.bonus + '</b>');

  if (product.portion === numberOfPortions[2]) {
    $('.card__texts').append('<p class="card__text">заказчик доволен</p>');
  }

  $('.card__weight').prepend(product.weight);
  input.prop('name', product.inputAttribute);
  input.prop('value', product.inputAttribute);
  $('.card').attr('data-disabled', 'Печалька,' + product.additive + ' закончился.');
  $('.card-box__description').attr('data-selected', product.cardBoxDescription);
  return card;
};

function declineNouns(n, nouns) {
  return nouns[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

function renderCards(data) {
  var fragment = $(document.createDocumentFragment());
  $(data).each(function (item) {
    var card = createCard(data[item]);
    renderedCards.push(card);
    $(fragment.append(card));
  });
  cardsContainer.append(fragment);
  disableCard('input:checkbox[name="chicken"]', '#templateId-3');
  selectCard('input:checkbox[name="fish"]', '#templateId-2'); 
  defoultCard('input:checkbox[name="foiegras"]', '#templateId-1');
};

function disableCard(inputName, cardId) {
  if ($(inputName).prop('disabled', true)) {
    $(cardId).addClass('is-disabled');
    $(cardId).children('.card-box__description').css('visibility', 'hidden');
    $(cardId).children('.card-box__make-your-pet-happy').css('visibility', 'hidden');
  }
};

function selectCard(inputName, cardId) {
  if ($(inputName).prop('selected', true)) {
    $(cardId).addClass('is-selected');
    $(cardId).children('.card-box__description').css('visibility', 'visible');
    $(cardId).children('.card-box__make-your-pet-happy').css('visibility', 'hidden');
    $(cardId).find('input').prop('checked', true);
  } 
};

function defoultCard(inputName, cardId) {
  if ($(inputName).prop('selected', false)) {
    $(cardId).children('.card-box__description').css('visibility', 'hidden');
    $(cardId).children('.card-box__make-your-pet-happy').css('visibility', 'visible');
  } 
};

$(cardsContainer).on('click', 'section[id^="templateId-"]', statusClickHandler);

function statusClickHandler(event) {
  var checkbox =  $(this).find('input'),
  description = $(this).children('.card-box__description'),
  makeYourPetHappy = $(this).children('.card-box__make-your-pet-happy');
  event.preventDefault();
  if ($(this).hasClass('is-selected')) {
    $(this).removeClass('is-selected');
    $(this).removeClass('is-selected-hover');
    $(description).css('visibility', 'hidden');
    $(makeYourPetHappy).css('visibility', 'visible');
    $(checkbox).prop('checked', false);
  } else {
    $(this).addClass('is-selected');
    $(description).css('visibility', 'visible');
    $(makeYourPetHappy).css('visibility', 'hidden');
    $(checkbox).prop('checked', true);
  }
};

$(cardsContainer).on('mouseleave', 'section[id^="templateId-"]', statusMouseleaveHandler);

function statusMouseleaveHandler(event) {
  event.preventDefault();
  if ($(this).hasClass('is-selected')) {
    $(this).addClass('is-selected-hover');
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  event.preventDefault();
  renderCards(makeObject());
});
})();