// const numDivs = 36; // ???Для чего эта константа???
const maxHits = 10;

let hits = 0;
let antiHits = 0; // Инициализируем переменную промахов
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  // ГОТОВО!!! тут же и текст убираем
  for (i=1; i<7; i++) {
    for (j=1; j<7; j++){
      if ($(`#slot-${i}${j}`).hasClass("target") === true) {
        $(`#slot-${i}${j}`).removeClass("target");
        $(`#slot-${i}${j}`).text("");
      }
      // Также зачищаем "miss" и его текст
      if ($(`#slot-${i}${j}`).hasClass("miss") === true) {
        $(`#slot-${i}${j}`).removeClass("miss");
        $(`#slot-${i}${j}`).text("");
      }
    }
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  // ГОТОВО!!!
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime
  // ГОТОВО!!!
  if (hits == 0) {
    firstHitTime = getTimestamp();
  }
  

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  // ГОТОВО!!!
  $(".game-field").remove();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#antiHits").text(antiHits); // Выводим в результат число промахов

  $("#win-message").removeClass("d-none");
  $("#button-start").addClass("d-none"); // Прячем кнопку "Старт игры"
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  // Уже реализовал выше в функции "round", костыль конечно но работает)
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    antiHits++; // Считаем число промахов
    $(event.target).addClass("miss"); // Красим квадрат красным в который попали промахнувшись
    $(event.target).text(antiHits); // Выводим в него текущее значение промахов
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  // ГОТОВО!!!
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  // ГОТОВО!!!
  $("#button-start").click(function(){
    if (hits == 0){ // Проверяем что игра уже не запущена
      round();
    }
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
