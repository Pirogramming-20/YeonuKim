const startBtn = document.getElementById("start-button");
const stopBtn = document.getElementById("stop-button");
const resetBtn = document.getElementById("reset-button");
const timeSpan = document.getElementById("stop-watch-time");
const recordContainer = document.getElementById("record-container");
const circleBtns = document.getElementsByClassName("circle-button");
const trashBtn = document.getElementById("trash-button");
const allSelBtn = document.getElementById("all-select-button");

//reset local storage when refresh the page
window.localStorage.clear();
localStorage.setItem("times", "[]");

// Make button shadow animations
startBtn.addEventListener("click", () => {
  startBtn.style.boxShadow = "none";
  setTimeout(() => {
    startBtn.style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.2)";
  }, 100);
  startStopWatch();
});

stopBtn.addEventListener("click", () => {
  stopBtn.style.boxShadow = "none";
  setTimeout(() => {
    stopBtn.style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.2)";
  }, 100);
  stopStopWatch();
});

resetBtn.addEventListener("click", () => {
  resetBtn.style.boxShadow = "none";
  setTimeout(() => {
    resetBtn.style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.2)";
  }, 100);
  resetStopWatch();
});

allSelBtn.addEventListener("click", () => {
  clickAllSelect();
});

// Delete data when click a trash button
trashBtn.addEventListener("click", () => {
  deleteRecord(circleBtns);
});

let time = 0;
let interval = setInterval(() => {}, 0);
// Change time accoring button click
function startStopWatch() {
  interval = setInterval(() => {
    time++;
    milisec = Math.floor(time % 100);
    sec = Math.floor(time / 100);
    timeSpan.innerText = `${String(sec).padStart(2, "0")}:${String(
      milisec
    ).padStart(2, "0")}`;
  }, 10);
}

function stopStopWatch() {
  clearInterval(interval);
  addRecord(timeSpan.innerText);
}

function resetStopWatch() {
  time = 0;
  clearInterval(interval);
  timeSpan.innerText = "00:00";
}

// Record when click a stop button using local storage
function addRecord(record) {
  const records = JSON.parse(localStorage.getItem("times"));
  records.push(record);
  localStorage.setItem("times", JSON.stringify(records));
  recordContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="record">
    <i class="ri-circle-line circle-button"></i>
    <span>${record}</span>
  </div>
    `
  );
  clickCheckBox(circleBtns[circleBtns.length - 1]); // add eventListener to new checkbox list
}

// Show check when click circle buttons
function clickCheckBox(circleBtn) {
  circleBtn.addEventListener("click", () => {
    if (circleBtn.className == "ri-circle-line circle-button") {
      circleBtn.className = "ri-checkbox-circle-line circle-button";
      let allCheckFlag = true;
      for (const checkBtn of circleBtns) {
        if (checkBtn.className == "ri-circle-line circle-button") {
          allCheckFlag = false;
          break;
        }
      }
      if (allCheckFlag) allSelBtn.className = "ri-checkbox-circle-line";
    } else if (circleBtn.className == "ri-checkbox-circle-line circle-button") {
      circleBtn.className = "ri-circle-line circle-button";
      allSelBtn.className = "ri-circle-line";
    }
  });
}

// All selection Button
function clickAllSelect() {
  if (allSelBtn.className == "ri-circle-line") {
    allSelBtn.className = "ri-checkbox-circle-line";
    for (const circleBtn of circleBtns) {
      circleBtn.className = "ri-checkbox-circle-line circle-button";
    }
  } else if (allSelBtn.className == "ri-checkbox-circle-line") {
    allSelBtn.className = "ri-circle-line";
    for (const circleBtn of circleBtns) {
      circleBtn.className = "ri-circle-line circle-button";
    }
  }
}
// Delete when click a trash button
function deleteRecord(circleBtns) {
  const checkedDivs = [];
  for (const circleBtn of circleBtns) {
    console.log(Array.from(circleBtn.classList));
    // erase from localStorage
    if (Array.from(circleBtn.classList).includes("ri-checkbox-circle-line")) {
      const targetText = circleBtn.nextElementSibling.innerText;
      const records = JSON.parse(localStorage.getItem("times"));
      console.log(records);
      console.log(circleBtn.nextElementSibling);
      console.log(targetText);
      const recordsFiltered = records.filter((record) => {
        return record != targetText;
      });
      checkedDivs.push(circleBtn.parentNode);
      localStorage.setItem("times", JSON.stringify(recordsFiltered));
      console.log(recordsFiltered);
      console.log(checkedDivs[0]);
    }
  }
  // erase from DOM
  while (checkedDivs.length != 0) {
    console.log(checkedDivs[0]);
    checkedDivs[0].remove();
    checkedDivs.shift();
  }
}
