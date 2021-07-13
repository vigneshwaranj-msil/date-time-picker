import {
  SelectorCss,
  SelectorProps,
  FullMOnths,
  Start_end
} from "../../js/constants";

function generateTitle(value) {
  if (typeof value === "string") {
    var valueEl = document.createElement("div");
    valueEl.classList.add(SelectorCss.Yearvalue); //value
    valueEl.innerText = value;
    return valueEl;
  } else {
    var valueEl_m = document.createElement("div");
    valueEl_m.classList.add(SelectorCss.Monthvalue); //value_m
    valueEl_m.innerText = value;
    return valueEl_m;
  }
}

function generateSelectorEl() {
  var selectorElement = document.createElement("div");
  selectorElement.classList.add(SelectorCss.main); //selector-container
  selectorElement.classList.add(this.__options.className || "-");
  var selectionContainer = document.createElement("div");
  selectionContainer.classList.add(SelectorCss.selectionContainer); //options-and-value
  var titleContainer = document.createElement("div");
  titleContainer.classList.add(SelectorCss.valueContainer); //title-conatiner
  if (Start_end.start_year - 1 < this.activeValue) {
    titleContainer.append(generateTitle(this.activeValue));
  } else {
    var m = this.activeValue - 1;
    var str = FullMOnths[m];
    titleContainer.append(generateTitle(str));
  }
  selectionContainer.append(titleContainer);
  selectorElement.appendChild(selectionContainer);
  return selectorElement;
}

export default class Title {
  constructor(props = {}) {
    this.__options = Object.assign({}, SelectorProps, props);
    this.values = this.__options.values || [];
    if (!this.values.length) {
      throw new Error("Empty values cannot create a drop-down");
    }
    this.activeValue = this.__options.active
      ? this.__options.active
      : this.values[0];
    this.selectorEl = null;
    this.initUI = this.initUI.bind(this);
    this.onChange = this.onChange.bind(this);
    this.initUI();
  }

  initUI() {
    this.selectorEl = generateSelectorEl.call(
      this,
      this.values,
      this.activeValue,
      this.onChange
    );
  }

  onChange(value) {
    if (value) {
      this.activeValue = value;
      this.initUI();
      this.__options.onChange && this.__options.onChange(this.activeValue);
    }
  }
}
