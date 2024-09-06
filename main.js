//캔버스 세팅
let canvas;
let ctx; //이미지 그리는 용도
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
//  우주선 좌표
let spaceshipX = canvas.width / 2 - 33;
let spaceshipY = canvas.height - 66;
function loadImage() {
	backgroundImage = new Image();
	backgroundImage.src = "images/space_bg.jpg";
	spaceshipImage = new Image();
	spaceshipImage.src = "images/jet.png";
	bulletImage = new Image();
	bulletImage.src = "images/bullet.png";
	enemyImage = new Image();
	enemyImage.src = "images/enemy.png";
	gameOverImage = new Image();
	gameOverImage.src = "images/gameover.png";
}

function render() {
	// .drawImage(image, dx, dy, dWidth, dHeight);
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
	render();
	requestAnimationFrame(main);
}

loadImage();
main();

function checkKey(e) {
	let event = window.event ? window.event : e;
	console.log(event.keyCode);
}
