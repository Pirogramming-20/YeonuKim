const timeSpan = document.getElementById("stop-watch-time");
const recordContainer = document.getElementById("record-container");

let time = 0;
let interval = setInterval(() => {}, 0);

class StopwatchButton {
  constructor(elementId) {
    this.button = document.getElementById(elementId);
  }
  // Make button shadow animations
  setButtonShadow() {
    this.button.style.boxShadow = "none";
    setTimeout(() => {
      this.button.style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.2)";
    }, 100);
  }
}

class StartButton extends StopwatchButton {
  // Change time accoring button click
  startStopWatch() {
    clearInterval(interval);
    interval = setInterval(() => {
      ++time;
      let miliseconds = Math.floor(time % 100);
      let seconds = Math.floor(time / 100);
      timeSpan.innerText = `${String(seconds).padStart(2, "0")}:${String(
        miliseconds
      ).padStart(2, "0")}`;
    }, 10);
  }
}

class StopButton extends StopwatchButton {
  stopStopWatch() {
    clearInterval(interval);
    this.addRecord(timeSpan.innerText);
  }
  // Record when click a stop button using local storage
  addRecord(record) {
    const records = this.getStoredRecords();
    records.push(record);
    this.setStoredRecords(records);
    recordContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="record">
    <i class="ri-circle-line circle-button"></i>
    <span>${record}</span>
  </div>
    `
    );
    const newCircleBtn =
      recordContainer.lastElementChild.querySelector(".circle-button");
    if (newCircleBtn) {
      const addCircleButton = new CircleButton(newCircleBtn);
      circleBtns.push(addCircleButton);
      this.addClickToCheckBox(addCircleButton); // Add eventListener to a new circleButton
    }
  }
  // Show check when click circle buttons
  addClickToCheckBox(circleBtn) {
    circleBtn.button.addEventListener("click", () => {
      circleBtn.toggleCheckbox();
      allSelBtn.checkAllSelect(circleBtns);
    });
  }
  getStoredRecords() {
    return JSON.parse(localStorage.getItem("times"));
  }
  setStoredRecords(records) {
    localStorage.setItem("times", JSON.stringify(records));
  }
}

class ResetButton extends StopwatchButton {
  resetStopWatch() {
    time = 0;
    clearInterval(interval);
    timeSpan.innerText = "00:00";
  }
}

class CircleButton {
  constructor(element) {
    this.button = element;
  }
  getStoredRecords() {
    return JSON.parse(localStorage.getItem("times"));
  }
  setStoredRecords(records) {
    localStorage.setItem("times", JSON.stringify(records));
  }
  toggleCheckbox() {
    this.button.classList.toggle("ri-circle-line");
    this.button.classList.toggle("ri-checkbox-circle-line");
  }
  isChecked() {
    return Array.from(this.button.classList).includes(
      "ri-checkbox-circle-line"
    );
  }
  checkAllSelect(buttons) {
    let isAllChecked = true;
    for (const button of buttons) {
      if (!button.isChecked()) {
        isAllChecked = false;
        break;
      }
    }
    if (isAllChecked) {
      this.button.classList.remove("ri-circle-line");
      this.button.classList.add("ri-checkbox-circle-line");
    } else {
      this.button.classList.remove("ri-checkbox-circle-line");
      this.button.classList.add("ri-circle-line");
    }
  }
  // All selection Button
  clickAllSelect() {
    this.toggleCheckbox(allSelBtn);
    if (allSelBtn.isChecked()) {
      for (const circleBtn of circleBtns) {
        circleBtn.button.classList.remove("ri-circle-line");
        circleBtn.button.classList.add("ri-checkbox-circle-line");
      }
    } else {
      for (const circleBtn of circleBtns) {
        circleBtn.button.classList.remove("ri-checkbox-circle-line");
        circleBtn.button.classList.add("ri-circle-line");
      }
    }
  }
}

class TrashButton {
  constructor(element) {
    this.button = element;
  }
  // Delete when click a trash button
  deleteRecord(circleBtns) {
    const checkedDivs = [];
    for (const circleBtn of circleBtns) {
      // erase from localStorage
      if (circleBtn.isChecked()) {
        const targetText = circleBtn.button.nextElementSibling.innerText;
        const records = circleBtn.getStoredRecords();
        const recordsFiltered = records.filter((record) => {
          return record != targetText;
        });
        circleBtn.setStoredRecords(recordsFiltered);
        checkedDivs.push(circleBtn.button.parentNode);
      }
    }
    this.eraseElementsFromDOM(checkedDivs);
  }

  eraseElementsFromDOM(elementList) {
    while (elementList.length != 0) {
      elementList[0].remove();
      elementList.shift();
    }
  }
}

const startBtn = new StartButton("start-button");
const stopBtn = new StopButton("stop-button");
const resetBtn = new ResetButton("reset-button");
const allSelBtn = new CircleButton(
  document.getElementById("all-select-button")
);
const trashBtn = new TrashButton(document.getElementById("trash-button"));
const circleBtns = Array.from(
  document.getElementsByClassName("circle-button")
).map((btn) => new CircleButton(btn));

//reset local storage when refresh the page
window.localStorage.clear();
localStorage.setItem("times", "[]");

startBtn.button.addEventListener("click", () => {
  startBtn.setButtonShadow(startBtn);
  startBtn.startStopWatch();
});

stopBtn.button.addEventListener("click", () => {
  stopBtn.setButtonShadow(stopBtn);
  stopBtn.stopStopWatch();
});

resetBtn.button.addEventListener("click", () => {
  resetBtn.setButtonShadow(resetBtn);
  resetBtn.resetStopWatch();
});

allSelBtn.button.addEventListener("click", () => {
  allSelBtn.clickAllSelect();
});

// Delete data when click a trash button
trashBtn.button.addEventListener("click", () => {
  trashBtn.deleteRecord(circleBtns);
});
