'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_WIDTH = 40;
var GAP = 50;
var MAX_HEIGHT = 150;
var BAR_Y = CLOUD_Y + 70 + MAX_HEIGHT;

var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);

  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white', CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = 'black';
  ctx.font = '16px, PT mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 30);
  ctx.fillText('Список результатов', CLOUD_X + 20, CLOUD_Y + 50);

  var columnX = 140;
  for (var i = 0; i < names.length; i++) {
    var playerTime = Math.round(times[i]);
    ctx.fillStyle = '#000';
    ctx.font = '16px, PT mono';
    ctx.fillText(names[i], columnX, 260);

    var maxTime = Math.round(Math.max.apply(Math, times));
    if (playerTime === maxTime) {
      var barHeight = 150;
    } else {
      barHeight = times[i] * MAX_HEIGHT / maxTime;
    }
    ctx.fillText(playerTime, columnX, BAR_Y - barHeight);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 30%)';
    }
    ctx.fillRect(columnX, BAR_Y - barHeight + 10, COLUMN_WIDTH, barHeight);

    columnX += COLUMN_WIDTH + GAP;
  }
};
