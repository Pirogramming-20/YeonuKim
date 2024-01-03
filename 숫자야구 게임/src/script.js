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
console.log(answers);

// game start!
// if press enter, we can click button "확인하기"
const sendBtns = document.getElementsByClassName("submit-button");
const input1 = document.getElementById("number1");
const input2 = document.getElementById("number2");
const input3 = document.getElementById("number3");
let inputValues = [];
let inputErrFlag = false;

for (const sendBtn of sendBtns) {
  // Get input and valid check
  sendBtn.addEventListener("click", () => {
    inputValues = [
      parseInt(input1.value),
      parseInt(input2.value),
      parseInt(input3.value),
    ];

    for (const value of inputValues) {
      if (value < 0 || value > 9 || isNaN(value)) {
        inputErrFlag = true;
        break;
      }
      inputErrFlag = false;
    }
    if (!inputErrFlag) {
      check_numbers(inputValues);
      // Reset input
      input1.value = null;
      input2.value = null;
      input3.value = null;
    }
  });
}

function check_numbers(inputValues) {
  let strike = 0;
  let ball = 0;
  console.log(answers);
  console.log(inputValues);
  // Check ball and strike
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
  console.log(strike);
  console.log(ball);

  tryNum--;
  if (tryNum == 0) {
    displayFail();
    console.log("Fail");
    return;
  } else if (strike == 3) {
    displaySuccess();
    console.log("Success");
  } else {
    displayResult(inputValues, strike, ball);
    console.log(`Strike: ${strike}, Ball: ${ball}`);
  }
}

function displayResult(inputValues, strike, ball) {
  const container = document.querySelector(".result-display");
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

function displaySuccess() {
  const container = document.querySelector(".result-display");
  container.insertAdjacentHTML(
    "beforeend",
    `<img id="success-img" src="assets/img/success.png" />`
  );
}

function displayFail() {
  const container = document.querySelector(".result-display");
  container.insertAdjacentHTML(
    "beforeend",
    `<img id="success-img" src="assets/img/fail.png" />`
  );
}
