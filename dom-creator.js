import { Days, Selectors, TimeSelectors } from "./constants";
import CurrentDate from "./current-date";

export function generateDatePickerUI(className) {
  var datePickerEl = document.createElement("div");
  datePickerEl.classList.add(Selectors.main);
  datePickerEl.classList.add(className || "");
  //Wrapper element container calendar
  var dateWrapper = document.createElement("div");
  dateWrapper.classList.add(Selectors.wrapper);
  var yearSelector = document.createElement("div"),
    dateSelector = document.createElement("div");
  //year selector
  yearSelector.classList.add(Selectors.yearSelector);
  var prev = document.createElement("div");
  prev.innerText = "<";
  prev.addEventListener("click", this.showPrevMonth);
  var dateMonthYearPicker = document.createElement("div");
  dateMonthYearPicker.classList.add(Selectors.selector);
  const valueChangeCallback = (newValue) => {
    this.currentDateTime.goTo(newValue);
    this.showPicker();
    newValue.date && this.updateValue(this.currentDateTime.toInputDateString());
  };
  var currentYear = new Date().getFullYear();
  const YEAR_OFFSET = 5;
  dateMonthYearPicker.append(
    generateSelector(
      1999,
      (this.currentDateTime.year > currentYear ? this.currentDateTime.year : currentYear)+YEAR_OFFSET,
      (value) => valueChangeCallback({ year: value }),
      this.currentDateTime.year
    ),
    generateSelector(
      1,
      12,
      (value) => valueChangeCallback({ month: value }),
      this.currentDateTime.month
    ),
    generateSelector(
      1,
      this.currentDateTime.numberOfDaysInMonth,
      (value) => valueChangeCallback({ date: value }),
      this.currentDateTime.date
    )
  );
  var next = document.createElement("div");
  next.innerText = ">";
  next.addEventListener("click", this.showNextMonth);
  yearSelector.append(prev, dateMonthYearPicker, next);
  //** year selector ends here
  //date selector begins
  dateSelector.classList.add(Selectors.dateSelector);
  dateSelector.append(
    generateDaysRow.call(this.currentDateTime),
    generateDateRows.call(this.currentDateTime, (value) => {
      this.currentDateTime.goTo({
        date: value
      });
      this.updateValue(this.currentDateTime.toInputDateString());
    })
  );
  //** dateSelector ends here
  dateWrapper.append(yearSelector, dateSelector);
  datePickerEl.appendChild(dateWrapper);
  return datePickerEl;
}

export function generateTimePickerUI(className) {
  var timePickerEl = document.createElement("div");
  timePickerEl.classList.add(TimeSelectors.main);
  timePickerEl.classList.add(className || "");
  var timeWrapper = document.createElement("div");
  const timeUpdateFunction = (value) => {
    this.currentDateTime.goTo(value);
    this.updateValue(this.currentDateTime.toInputTimeString());
  };
  timeWrapper.classList.add(TimeSelectors.wrapper);
  timeWrapper.append(
    generateTimeSelector(
      0,
      23,
      (value) =>
        timeUpdateFunction({
          hour: value
        }),
      this.currentDateTime.hour
    ),
    generateTimeSelector(
      0,
      59,
      (value) =>
        timeUpdateFunction({
          min: value
        }),
      this.currentDateTime.minute
    ),
    generateTimeSelector(
      0,
      59,
      (value) =>
        timeUpdateFunction({
          sec: value
        }),
      this.currentDateTime.second
    )
  );
  //time wrapper ends here
  timePickerEl.appendChild(timeWrapper);
  return timePickerEl;
}

export function generateInputContainer() {
  var inputContainerEl = document.createElement("div");
  inputContainerEl.classList.add(Selectors.defaultContainer);
  var input = document.createElement("input");
  input.readOnly = true;
  input.type = "text";
  input.placeholder = "Select the date";
  inputContainerEl.appendChild(input);
  return inputContainerEl;
}

function generateTimeSelector(
  start,
  stop,
  onChange = undefined,
  activeValue = undefined
) {
  activeValue = activeValue || start;
  var timeCol = document.createElement("div");
  timeCol.classList.add(TimeSelectors.col);
  for (var i = start; i <= stop; i++) {
    var timeEl = document.createElement("div");
    timeEl.classList.add(TimeSelectors.time);
    timeEl.innerText = CurrentDate.getFormattedDateValues(i);
    timeEl.addEventListener("mousedown", function (e) {
      onChange && onChange(parseInt(e.target.innerHTML, 10));
    });
    if (i === activeValue) {
      timeEl.classList.add(Selectors.active);
      timeCol.scrollTop = i * timeEl.offsetHeight;
    }
    timeCol.appendChild(timeEl);
  }
  return timeCol;
}

function generateSelector(
  start,
  end,
  changeCallback = undefined,
  activeValue = undefined
) {
  var selectorEl = document.createElement("select");
  activeValue = activeValue || start;
  for (var i = start; i <= end; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.selected = activeValue === i;
    option.innerText = i;
    selectorEl.appendChild(option);
  }
  selectorEl.addEventListener("change", (e) => {
    var value = e.target.value;
    if (typeof value === "string") {
      value = parseInt(value, 10);
    }
    changeCallback && changeCallback(value);
  });
  return selectorEl;
}

function generateDaysRow() {
  var daysContainer = document.createElement("div");
  daysContainer.classList.add(Selectors.row, Selectors.days);
  for (var i = 0; i < Days.length; i++) {
    var day = Days[i],
      dayEl = document.createElement("div");
    dayEl.classList.add(Selectors.day);
    dayEl.innerText = day.charAt(0);
    dayEl.classList.toggle(Selectors.active, this.dayOfWeek === i);
    daysContainer.appendChild(dayEl);
  }
  return daysContainer;
}

function generateDateRows(changeCallback = undefined) {
  var datesContainer = document.createElement("div");
  datesContainer.classList.add(Selectors.dates);
  const dateCallback = (e) => {
    changeCallback &&
      e.target &&
      e.target.innerText &&
      changeCallback(parseInt(e.target.innerText, 10));
  };
  for (var row = 0; row < this.numberOfRows; row++) {
    var rowEl = document.createElement("div");
    rowEl.classList.add(Selectors.row);
    for (var day = 0; day < Days.length; day++) {
      var date = Days.length * row + day + 1 - this.startDayOfTheMonth,
        dateEl = document.createElement("div");
      dateEl.classList.add(Selectors.date);
      dateEl.classList.toggle(Selectors.active, date === this.date);
      if (date <= this.numberOfDaysInMonth) {
        if (row === 0) {
          if (day >= this.startDayOfTheMonth) {
            dateEl.innerText = date;
          }
        } else {
          dateEl.innerText = date;
        }
        dateEl.addEventListener("mousedown", dateCallback);
        rowEl.append(dateEl);
      }
    }
    datesContainer.appendChild(rowEl);
  }

  return datesContainer;
}
