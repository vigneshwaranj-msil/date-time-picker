import { Selectors, TimeSelectors } from "./constants";
import CurrentDate from "./current-date";

export function generateInputContainer() {
  var inputContainerEl = document.createElement("div");
  inputContainerEl.classList.add(Selectors.defaultContainer);
  var input = document.createElement("input");
  input.readOnly = true;
  input.type = "text";
  input.placeholder = " Select Time";
  inputContainerEl.appendChild(input);
  return inputContainerEl;
}

export function generateTimePickerUI(className) {
  var timePickerEl = document.createElement("div");
  timePickerEl.classList.add(TimeSelectors.main);
  timePickerEl.classList.add(className || "-");

  var timeWrapper = document.createElement("div");
  const timeUpdateFunction = (value) => {
    this.isPickerClicked = true;
    this.currentDateTime.goTo(value);
    !value.time && this.__showPickerWithInputFocused();
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
    generateSeperator(),
    generateTimeSelector(
      0,
      59,
      (value) =>
        timeUpdateFunction({
          min: value
        }),
      this.currentDateTime.minute
    ),
    generateSeperator(),
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

  timePickerEl.append(timeWrapper);
  return timePickerEl;
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

  var up = document.createElement("div");
  up.classList.add("prev");
  up.innerText = " ˄ ";

  up.addEventListener("mousedown", function (e) {
    onChange && onChange(parseInt(activeValue + 1, 10));
  });
  for (var i = start; i <= stop; i++) {
    var timeEl = document.createElement("div");
    timeEl.classList.add(TimeSelectors.time);
    timeEl.innerText = CurrentDate.getFormattedDateValues(activeValue);
  }

  var down = document.createElement("div");
  down.classList.add("next");
  down.innerText = " ˅ ";
  down.addEventListener("mousedown", function () {
    onChange && onChange(parseInt(activeValue - 1, 10));
  });
  timeCol.append(up, timeEl, down);
  return timeCol;
}

function generateSeperator() {
  var seperator = document.createElement("div");
  seperator.classList.add("seperator");
  seperator.innerText = " : ";
  return seperator;
}
