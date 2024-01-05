const timeSpan = document.getElementById("stop-watch-time");
const recordContainer = document.getElementById("record-container");
const circleBtns = document.getElementsByClassName("circle-button");

//reset local storage when refresh the page
window.localStorage.clear();
localStorage.setItem("times", "[]");

time = 0;
interval = setInterval(() => {}, 0);
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
  getStoredRecords() {
    return JSON.parse(localStorage.getItem("times"));
  }
  setStoredRecords(records) {
    localStorage.setItem("times", JSON.stringify(records));
  }
  isChecked(button) {
    return Array.from(button.classList).includes("ri-checkbox-circle-line");
  }
  checkAllSelect(buttons, targetBtn) {
    let isAllChecked = true;
    console.log(targetBtn);
    for (const button of buttons) {
      if (!this.isChecked(button)) {
        isAllChecked = false;
        break;
      }
    }
    if (isAllChecked) {
      targetBtn.button.classList.remove("ri-circle-line");
      targetBtn.button.classList.add("ri-checkbox-circle-line");
    } else {
      targetBtn.button.classList.remove("ri-checkbox-circle-line");
      targetBtn.button.classList.add("ri-circle-line");
    }
  }
}

class StartButton extends StopwatchButton {
  // Change time accoring button click
  startStopWatch() {
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
    this.addClickToCheckBox(circleBtns[circleBtns.length - 1]); // add eventListener to new checkbox list
  }
  // Show check when click circle buttons
  addClickToCheckBox(circleBtn) {
    circleBtn.addEventListener("click", () => {
      this.toggleCheckbox(circleBtn);
      this.checkAllSelect(circleBtns, allSelBtn);
    });
  }
  toggleCheckbox(button) {
    button.classList.toggle("ri-circle-line");
    button.classList.toggle("ri-checkbox-circle-line");
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
  isChecked(circleBtn) {
    return Array.from(circleBtn.button.classList).includes(
      "ri-checkbox-circle-line"
    );
  }
  checkAllSelect(buttons, targetBtn) {
    let isAllChecked = true;
    for (const button of buttons) {
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
  // All selection Button
  clickAllSelect() {
    this.toggleCheckbox(allSelBtn);
    if (this.isChecked(allSelBtn)) {
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
}

class TrashButton extends CircleButton {
  // Delete when click a trash button
  deleteRecord(circleBtns) {
    const checkedDivs = [];
    for (const circleBtn of circleBtns) {
      // erase from localStorage
      if (this.isChecked(circleBtn)) {
        const targetText = circleBtn.button.nextElementSibling.innerText;
        const records = this.getStoredRecords();
        const recordsFiltered = records.filter((record) => {
          return record != targetText;
        });
        this.setStoredRecords(recordsFiltered);
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
  trashBtn.deleteRecord(
    Array.from(circleBtns).map((btn) => new CircleButton(btn))
  );
});
