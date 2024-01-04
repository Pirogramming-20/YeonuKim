const maxTryNum = 9;
let tryNum = maxTryNum;

// make 3 random number
const answers = [];
let numList = [];
for (let i = 0; i < 10; i++) {
  numList.push(i);
}
for (let i = 0; i < 3; i++) {
  let idx = Math.floor(Math.random() * numList.length);
  answers.push(numList[idx]);
  numList = numList.filter((item) => item != numList[idx]);
}

// game start!
// if press enter, we can click button "확인하기"
const sendBtns = document.getElementsByClassName("submit-button");
const input1 = document.getElementById("number1");
const input2 = document.getElementById("number2");
const input3 = document.getElementById("number3");
// let inputValues = [];
let inputErrFlag = false;

input1.focus();
for (const sendBtn of sendBtns) {
  // if press enter, click sendBtn, click sendBtn
  input1.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
      sendBtn.click();
    }
  });
  input2.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
      sendBtn.click();
    }
  });
  input3.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
      sendBtn.click();
    }
  });

  // if press arrow button, click sendBtn
  input1.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") input2.focus();
  });
  input2.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") input3.focus();
  });

  // Get input and valid check
  sendBtn.addEventListener("click", () => {
    let inputValues = [
      parseInt(input1.value),
      parseInt(input2.value),
      parseInt(input3.value),
    ];

    for (const value of inputValues) {
      if (value < 0 || value > 9 || isNaN(value)) {
        inputErrFlag = true;
        alert("0~9까지의 값을 입력해주세요.");
        break;
      }
      inputErrFlag = false;
    }

    const inputSet = new Set(inputValues);
    console.log(answers);
    console.log(inputValues);
    console.log(inputSet);
    console.log(inputValues.length);
    console.log(inputSet.size);
    if (inputErrFlag == false && inputSet.size !== inputValues.length) {
      alert("중복되지 않는 값을 입력해주세요.");
      inputErrFlag = true;
      console.log("Check!");
    }

    if (!inputErrFlag) {
      check_numbers(inputValues);
    }

    // Reset input
    input1.value = null;
    input2.value = null;
    input3.value = null;

    input1.focus();
  });
}

function check_numbers(inputValues) {
  let strike = 0;
  let ball = 0;
  // Check ball and strike
  if (inputValues == undefined) return;
  for (const value of inputValues) {
    for (const answer of answers) {
      if (value == answer) {
        if (inputValues.indexOf(value) == answers.indexOf(answer)) {
          strike++;
        } else {
          ball++;
        }
      }
    }
  }

  tryNum--;
  if (tryNum == 0) {
    displayEnd("fail");
    return;
  } else if (strike == 3) {
    displayEnd("success");
  } else {
    displayResult(inputValues, strike, ball);
  }
}

function displayResult(inputValues, strike, ball) {
  const container = document.querySelector(".result-display");
  if (inputValues == undefined) return;
  if (strike == 0 && ball == 0) {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="check-result">
      <div class="left">
        ${inputValues[0]} ${inputValues[1]} ${inputValues[2]}
      </div>
      :
      <div class="right">
        <div class="out num-result">O</div>
      </div>
    </div>`
    );
  } else if (strike == 0) {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="check-result">
      <div class="left">
        ${inputValues[0]} ${inputValues[1]} ${inputValues[2]}
      </div>
      :
      <div class="right">
        ${ball}
        <div class="ball num-result">B</div>
      </div>
    </div>`
    );
  } else if (ball == 0) {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="check-result">
      <div class="left">
        ${inputValues[0]} ${inputValues[1]} ${inputValues[2]}
      </div>
      :
      <div class="right">
        ${strike}
        <div class="strike num-result">S</div>
      </div>
    </div>`
    );
  } else {
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="check-result">
      <div class="left">
        ${inputValues[0]} ${inputValues[1]} ${inputValues[2]}
      </div>
      :
      <div class="right">
        ${strike}
        <div class="strike num-result">S</div>
        ${ball}
        <div class="ball num-result">B</div>
      </div>
    </div>`
    );
  }
}

function displayEnd(result) {
  const End = document.getElementById("game-result-img");
  End.src = `./assets/img/${result}.png`;
}
