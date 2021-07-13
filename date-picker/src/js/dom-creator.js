import { Days, Selectors, Start_end } from "./constants";
import { Title } from "../js/titles";

export function generateInputContainer() {
  var inputContainerEl = document.createElement("div");
  inputContainerEl.classList.add(Selectors.defaultContainer);
  var input = document.createElement("input");
  input.readOnly = true;
  input.type = "text";
  input.placeholder = "Choose your date";
  inputContainerEl.appendChild(input);
  return inputContainerEl;
}

export function generateDatePickerUI(className) {
  var datePickerElement = document.createElement("div");
  datePickerElement.classList.add(Selectors.main);
  datePickerElement.classList.add(className || "-");
  var dateWrapper = document.createElement("div");
  dateWrapper.classList.add(Selectors.wrapper);
  var yearSelector = document.createElement("div"),
    dateSelector = document.createElement("div");
  yearSelector.classList.add(Selectors.yearSelector);
  var prev1 = document.createElement("div");
  prev1.classList.add(Selectors.prevYear);
  prev1.innerText = "<<";
  prev1.addEventListener("mousedown", this.showPrevYear);

  var prev = document.createElement("div");
  prev.classList.add(Selectors.preMonth);
  prev.innerText = "< ";
  prev.addEventListener("mousedown", this.showPrevMonth);

  var dateMonthYearPicker = document.createElement("div");
  dateMonthYearPicker.classList.add(Selectors.selector);

  const valueChangeCallback = (newValue) => {
    this.currentDateTime.goTo(newValue);
    !newValue.date && this.__showPickerWithInputFocused();
    newValue.date && this.updateValue(this.currentDateTime.toInputDateString());
  };
  var currentYear = new Date().getFullYear();
  const YEAR_OFFSET = 5;
  dateMonthYearPicker.append(
    generateSelector(
      Start_end.start_year,
      (this.currentDateTime.year > currentYear
        ? this.currentDateTime.year
        : currentYear) + YEAR_OFFSET,
      (value) => valueChangeCallback({ year: value }),
      this.currentDateTime.year
    ),
    generateSelector(
      Start_end.start_month,
      Start_end.end_month,
      (value) => valueChangeCallback({ month: value }),
      this.currentDateTime.month
    )
  );
  var next = document.createElement("div");
  next.classList.add(Selectors.nextMonth);
  next.innerText = " >";
  next.addEventListener("mousedown", this.showNextMonth);

  var next1 = document.createElement("div");
  next1.classList.add(Selectors.nextYear);
  next1.innerText = ">>";
  next1.addEventListener("mousedown", this.showNextYear);
  yearSelector.append(prev1, prev, dateMonthYearPicker, next, next1);

  dateSelector.classList.add(Selectors.dateSelector);
  dateSelector.append(
    generateDaysRow.call(this.currentDateTime),
    generateDateRows.call(this.currentDateTime, (value) => {
      this.currentDateTime.goTo({ date: value });
      this.updateValue(this.currentDateTime.toInputDateString());
    })
  );
  dateWrapper.append(yearSelector, dateSelector);
  datePickerElement.appendChild(dateWrapper);
  return datePickerElement;
} //1

function generateRange(start, end) {
  if (start === end) return [start];
  else return Object.assign([], [start, ...generateRange(start + 1, end)]);
} //3

function generateSelector(
  start,
  end,
  changeCallback = undefined,
  activeValue = undefined
) {
  return new Title({
    values: generateRange(start, end),
    active: activeValue,
    onChange: (v) => changeCallback(parseInt(v, 10))
  }).selectorEl;
} //2

function generateDaysRow() {
  var daysContainer = document.createElement("div");
  daysContainer.classList.add(Selectors.row, Selectors.days);
  for (var i = 0; i < Days.length; i++) {
    var day = Days[i],
      dayEl = document.createElement("div");
    dayEl.classList.add(Selectors.day);
    dayEl.innerText = day.substring(0, 3);
    dayEl.classList.toggle(Selectors.active, this.dayOfWeek === i);
    daysContainer.appendChild(dayEl);
  }
  return daysContainer;
} //4

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
} //5
