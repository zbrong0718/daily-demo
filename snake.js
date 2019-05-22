window.onload = function() {
  var cvs = document.getElementById('canvas');
  var ctx = cvs.getContext('2d');

  var cvsW = cvs.width;
  var cvsH = cvs.height;

  var snakeW = 10;
  var snakeH = 10;


  function drawSnake(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);

    ctx.fillStyle = '#000';
    ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
  }

  var len = 4;
  var snake = [];

  for(var i = len; i >= 0; i--) {
    snake.push(
      {x: i, y: 0}
    );
  }

  function draw() {
    for(var i = 0; i < snake.length; ++i ) {
      var x = snake[i].x;
      var y = snake[i].y;
      drawSnake(x, y);
    }
    var snakeX = snake[0].x;
    var sankeY = snake[0].y;


  }
  draw();
};