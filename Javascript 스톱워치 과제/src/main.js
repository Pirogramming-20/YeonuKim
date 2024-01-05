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

startBtn.addEventListener("click", () => {
  setButtonShadow(startBtn);
  startStopWatch();
});

stopBtn.addEventListener("click", () => {
  setButtonShadow(stopBtn);
  stopStopWatch();
});

resetBtn.addEventListener("click", () => {
  setButtonShadow(resetBtn);
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
    miliseconds = Math.floor(time % 100);
    seconds = Math.floor(time / 100);
    timeSpan.innerText = `${String(seconds).padStart(2, "0")}:${String(
      miliseconds
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

// Make button shadow animations
function setButtonShadow(button) {
  button.style.boxShadow = "none";
  setTimeout(() => {
    button.style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.2)";
  }, 100);
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
    toggleCheckbox(circleBtn);
    checkAllSelect(circleBtns, allSelBtn);
  });
}

// All selection Button
function clickAllSelect() {
  toggleCheckbox(allSelBtn);
  if (isChecked(allSelBtn)) {
    for (const circleBtn of circleBtns) {
      circleBtn.classList.remove("ri-circle-line");
      circleBtn.classList.add("ri-checkbox-circle-line");
    }
  } else {
    for (const circleBtn of circleBtns) {
      circleBtn.classList.remove("ri-checkbox-circle-line");
      circleBtn.classList.add("ri-circle-line");
    }
  }
}

function toggleCheckbox(button) {
  button.classList.toggle("ri-circle-line");
  button.classList.toggle("ri-checkbox-circle-line");
}

function isChecked(button) {
  return Array.from(button.classList).includes("ri-checkbox-circle-line");
}

function checkAllSelect(buttons, targetBtn) {
  let isAllChecked = true;
  for (const button of circleBtns) {
    if (!isChecked(button)) {
      isAllChecked = false;
      break;
    }
  }
  if (isAllChecked) {
    targetBtn.classList.remove("ri-circle-line");
    targetBtn.classList.add("ri-checkbox-circle-line");
  } else {
    targetBtn.classList.remove("ri-checkbox-circle-line");
    targetBtn.classList.add("ri-circle-line");
  }
}

// Delete when click a trash button
function deleteRecord(circleBtns) {
  const checkedDivs = [];
  for (const circleBtn of circleBtns) {
    // erase from localStorage
    if (isChecked(circleBtn)) {
      const targetText = circleBtn.nextElementSibling.innerText;
      const records = getStoredRecords();
      const recordsFiltered = records.filter((record) => {
        return record != targetText;
      });
      setStoredRecords(recordsFiltered);
      checkedDivs.push(circleBtn.parentNode);
    }
  }
  eraseElementsFromDOM(checkedDivs);
}

function getStoredRecords() {
  return JSON.parse(localStorage.getItem("times"));
}

function setStoredRecords(records) {
  localStorage.setItem("times", JSON.stringify(records));
}

function eraseElementsFromDOM(elementList) {
  while (elementList.length != 0) {
    elementList[0].remove();
    elementList.shift();
  }
}
