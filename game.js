var lvlCounter = 0;
var randNum = 0;
var num = [];
var isStart = false;
var numInd = 0;

function animateBox() {
  for (let i = 0; i < num.length; i++) {
    setTimeout(() => {
      $("." + num[i])
        .animate({ opacity: 0.5 })
        .animate({ opacity: 1 });
    }, i * 1000);
  }
}

function startGame() {
  $("h1").text("Level " + lvlCounter);

  randNum = Math.ceil(Math.random() * 4);

  num.push(randNum);
  animateBox();
  console.log(num);
}

function gameOver() {
  num = [];
  numInd = 0;
  $("h1").text("Game Over.Press Any Key To Restart");
  isStart = false;
  lvlCounter = 0;
}

function nextBtn(curBtnClicked) {
  console.log("Index:" + numInd);
  console.log("selected Number from Arr:" + num[numInd]);

  if (curBtnClicked.classList.contains(num[numInd])) {
    if (numInd == num.length - 1) {
      console.log("here");
      numInd = 0;
      lvlCounter += 1;
      setTimeout(() => {
        startGame();
      }, 1000);
      // startGame();
    } else {
      numInd += 1;
    }

    console.log(numInd);
  } else {
    gameOver();
  }
}
$(document).on("keypress", () => {
  if (!isStart) {
    isStart = true;
    lvlCounter += 1;
    startGame();
  }
});

$(".box").on("click", (event) => {
  let curBtnClicked = event.currentTarget;
  $(event.target).animate({ opacity: 0.5 }).animate({ opacity: 1 });
  // console.log(numInd);

  nextBtn(curBtnClicked);
});

$(document).on("keypress", () => {
  if (lvlCounter == 0) {
    lvlCounter += 1;
  }
  while (lvlCounter > 0) {
    $("h1").text("Level " + lvlCounter);
    randNum = Math.ceil(Math.random() * 4);
    animateBox(randNum);
    num.push(randNum);
    num.forEach((el) => {
      let elm = $("." + el)[0];
      $(".box").on("click", (event) => {
        if (event.target != elm) {
          num = [];
          $("h1").text("Game Over");
          lvlCounter = 0;
        }
      });
      lvlCounter += 1;
    });
  }
});
