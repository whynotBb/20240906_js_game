//캔버스 세팅
let canvas;
let ctx; //이미지 그리는 용도
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false; // true 이면, 게임 끝
let score = 0;

//  우주선 좌표
let spaceshipX = canvas.width / 2 - 33;
let spaceshipY = canvas.height - 66;
let bulletList = []; //총알들을 저장하는 리스트

function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 20;
        this.y = spaceshipY;
        this.alive = true; // true 면 유효한 총알 false 는
        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    };

    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (
                this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x &&
                this.x >= enemyList[i].x + 24
            ) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    };
}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

let enemyList = []; //적군들을 저장하는 리스트
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = generateRandomValue(0, canvas.width - 48);
        this.y = 0;
        enemyList.push(this);
    };
    this.update = function () {
        this.y += 2; // 적군의 속도 조절
        if (this.y >= canvas.height - 48) {
            gameOver = true;
            console.log("game over");
        }
    };
}

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

let keysDown = {};
function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
        if (event.keyCode == 32) {
            createBullet();
        }
    });
}

function createBullet() {
    console.log("bullet");
    let b = new Bullet();
    b.init();
    console.log("총알 리스트", bulletList);
}

function createEnemy() {
    // const interval = setInterval(호출하고 싶은 함수, 시간)
    const interval = setInterval(function () {
        let e = new Enemy();
        e.init();
    }, 1000);
}

function update() {
    if (39 in keysDown) {
        if (spaceshipX < canvas.width - 64) {
            spaceshipX += 5; // 우주선의 속도 : 변수로 빼서 레벨 설정 하는데 사용하면 좋을듯!
        }
    }
    if (37 in keysDown) {
        console.log(spaceshipX);
        if (spaceshipX > 0) {
            spaceshipX -= 5;
        }
    }

    // 총알의 y 좌표 업데이트 , 총알과 만났는지 확인 하는 함수 호출
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }
    // 적군의 y 좌표 업데이트 하는 함수 호출
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render() {
    // .drawImage(image, dx, dy, dWidth, dHeight);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }
    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if (!gameOver) {
        update(); // 좌표값을 업데이트 하고,
        render(); // 그려주고,
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameOverImage, 10, 100, 380, 380);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

//총알만들기
//1. 스페이스바 누르면 총알 발사
//2. 총알 발사 = 총알의 y값 -- / 총알의 x값은 우주선의 x 좌표
//3. 발사된 총알들은 총알 배열에 저장
//4. 총알들은 x,y 좌표값이 있어야한다.
//5. 총알 배열을 가지고 render 해준다.

// 적군이 죽는다.
// 총알이 적군에게 닿는다.
//
