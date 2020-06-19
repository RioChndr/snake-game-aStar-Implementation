var badan_ular = [];
var moves = ['up', 'down', 'right', 'left'];
var arah = "down";
var size_kotak = 10;
var dx = 1
var dy = 0;
var goingUp = dy === -1;
var goingDown = dy === 1;
var goingRight = dx === 1;
var goingLeft = dx === -1;
var widthCanvas = 400;
var heightCanvas = 400;
var makanan_x = 0;
var makanan_y = 0;
var gameOver = false;
var score = 0;
var UlarPintar;

function setup() {
  createCanvas(widthCanvas, heightCanvas);

  frameRate(10);
  reset();
  UlarPintar = new AISnake(widthCanvas / size_kotak, heightCanvas / size_kotak);
}

function draw() {

  background(200);
  stroke(255);
  cetak_makanan();
  cetak_ular();
  if (!gameOver) jalankan_ular();
  if (gameOver) showGameOver();
  showScore();

}

function keyPressed() {
  if (keyCode == UP_ARROW && !goingDown) {
    dy = -1;
    dx = 0;
  } else if (keyCode == DOWN_ARROW && !goingUp) {
    dy = 1;
    dx = 0;
  } else if (keyCode == RIGHT_ARROW && !goingLeft) {
    dx = 1;
    dy = 0;
  } else if (keyCode == LEFT_ARROW && !goingRight) {
    dx = -1;
    dy = 0;
  }

  if (gameOver == true || keyCode == ENTER) {
    reset();
  }

  goingUp = dy === -1;
  goingDown = dy === 1;
  goingRight = dx === 1;
  goingLeft = dx === -1;

}

function tambah_badan(x, y) {
  badan_ular.unshift({
    x: x,
    y: y,
  });
}

function get_mid_number(x1, x2, persen) {
  let improve_value = (abs(x1 - x2) * persen);
  if (x1 > x2) {
    return x1 - improve_value;
  } else {
    return x1 + improve_value;
  }
}

function get_gradient_color(panjang_badan) {
  let gradient = [
    [255, 79, 79],
    [79, 252, 255],
    [167, 255, 79],
  ];
  let colors = [];


  let color_per_range = ceil(panjang_badan / gradient.length);
  let index_gradient = 0;
  for (let i = 0; i < panjang_badan; i++) {
    let new_color = {
      R: 0,
      G: 0,
      B: 0
    };
    if (i % color_per_range == 0) {
      index_gradient = (index_gradient + 1 >= gradient.length) ? 0 : index_gradient + 1;
    }

    let gradient_from = gradient[index_gradient];
    let index_g_to = (index_gradient + 1 >= gradient.length) ? 0 : index_gradient + 1;
    let gradient_to = gradient[index_g_to];


    let persentase = (i % color_per_range) / color_per_range;
    new_color.R = get_mid_number(gradient_from[0], gradient_to[0], persentase);
    new_color.G = get_mid_number(gradient_from[1], gradient_to[1], persentase);
    new_color.B = get_mid_number(gradient_from[2], gradient_to[2], persentase);

    colors.unshift(new_color);
  }

  return colors;
}

function cetak_ular() {
  noStroke();
  let colors = get_gradient_color(badan_ular.length);
  let i = 1;
  badan_ular.forEach(function (badan) {
    if (i == 1) { stroke(1); } else { noStroke() }
    let warnaRGB = colors[i - 1];
    let persen_length = (i / badan_ular.length);
    fill(warnaRGB.R, warnaRGB.G, warnaRGB.B);
    square(badan.x * size_kotak, badan.y * size_kotak, size_kotak);
    i += 1;
  });
}

function jalankan_ular() {
  var head = badan_ular[0];

  //RUN AI SNAKE !!!!
  UlarPintar.setBodySnake(badan_ular);
  UlarPintar.setHeadSnake(head);
  UlarPintar.setFoodPos({
    x: makanan_x,
    y: makanan_y
  });
  let process = UlarPintar.findPath();
  if (process == false) {
    gameOver == true;
  }
  let nextStep = UlarPintar.nextStep();
  dx = nextStep.x;
  dy = nextStep.y;

  head.x += dx;
  head.y += dy;
  if (head.x + 1 > widthCanvas / size_kotak) {
    head.x = 0;
  } else if (head.x < 0) {
    head.x = widthCanvas / size_kotak;
  }
  if (head.y + 1 > heightCanvas / size_kotak) {
    head.y = 0;
  } else if (head.y < 0) {
    head.y = heightCanvas / size_kotak
  }
  if (is_nabrak_badan(head)) {
    gameOver = true;
  }
  tambah_badan(head.x, head.y);
  badan_ular.pop();
  if (is_makan(head.x, head.y)) {
    score += 10;
    tambah_ekor();
    kasi_umpan();
  }

}

function cetak_makanan() {
  stroke(0);

  fill(0, 255, 100);
  square(makanan_x * size_kotak, makanan_y * size_kotak, size_kotak);
}

function is_makan(pos_x, pos_y) {
  return pos_x == makanan_x && pos_y == makanan_y
}

function tambah_ekor() {
  var ekor = badan_ular[badan_ular.length - 1];
  badan_ular.push(ekor);
}

function kasi_umpan() {
  makanan_x = Math.floor(Math.random() * widthCanvas / size_kotak);
  makanan_y = Math.floor(Math.random() * heightCanvas / size_kotak);
  if (is_nabrak_badan({
    x: makanan_x,
    y: makanan_y
  })) {
    kasi_umpan();
  }
}

function is_nabrak_badan(kepala) {

  for (let i = 2; i < badan_ular.length - 1; i++) {
    let badan = badan_ular[i];
    if (badan.x == kepala.x && badan.y == kepala.y) {
      return true;
    }
  }
  return false;
}

function showGameOver() {
  textSize(50);
  var tulisan = 'Game Over';
  let len_text = tulisan.split('').length;
  text(tulisan, widthCanvas / 2 - (14 * len_text), heightCanvas / 2);


  textSize(20);
  var tulisan2 = 'Tekan enter untuk ulangi';
  let len_text2 = tulisan2.split('').length;
  text(tulisan2, widthCanvas / 2 - (4.5 * len_text2), heightCanvas / 2 + 40);
}

function showScore() {
  textSize(20);
  text(`Score : ${score}`, 10, 30);
}

function reset() {
  score = 0;
  gameOver = false;
  badan_ular = [];

  let init_ular = 10;
  for (let i = 0; i < init_ular; i++) {
    tambah_badan(i, 10);
  }
  goingRight = true;
  dx = 1;
  dy = 0;
}