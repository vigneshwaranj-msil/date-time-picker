import { SelectorCss, SelectorProps } from "./constants";

function generateTitle(value) {
  var valueEl = document.createElement("div");
  valueEl.classList.add(SelectorCss.value);
  valueEl.innerText = value;
  return valueEl;
}

function generateArrow() {
  var arrow = document.createElement("div");
  arrow.classList.add(SelectorCss.arrow);
  return arrow;
}

function generateOptions(values, activeValue, onClick) {
  var optionsEl = document.createElement("div");
  optionsEl.classList.add(SelectorCss.optionContainer);
  for (var i = 0; i < values.length; i++) {
    var val = values[i],
      isActive = activeValue === val,
      valEl = document.createElement("div");
    valEl.classList.add(SelectorCss.option);
    valEl.classList.toggle(SelectorCss.active, isActive);
    valEl.innerText = val;
    valEl.dataset.index = i;
    if (isActive) {
      optionsEl.active = valEl;
      optionsEl.dataset.id = i;
    }
    valEl.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      var previousActive = valEl.parentElement.querySelector(
          `.${SelectorCss.active}`
        ),
        currEl = e.target;
      if (previousActive) {
        previousActive.classList.remove(SelectorCss.active);
      }
      currEl.classList.add(SelectorCss.active);
      onClick(currEl.innerText);
    });
    optionsEl.appendChild(valEl);
  }
  return optionsEl;
}

function generateSelectorEl() {
  var selectorElement = document.createElement("div");
  selectorElement.classList.add(SelectorCss.main);
  selectorElement.classList.add(this.__options.className || "-");
  var selectionContainer = document.createElement("div");
  selectionContainer.classList.add(SelectorCss.selectionContainer);
  var titleContainer = document.createElement("div");
  titleContainer.classList.add(SelectorCss.valueContainer);
  titleContainer.append(generateTitle(this.activeValue), generateArrow());
  titleContainer.addEventListener("mousedown", this.toggleDropDown);
  var optionsContainer = generateOptions(
    this.values,
    this.activeValue,
    this.onChange
  );
  selectionContainer.append(titleContainer, optionsContainer);
  selectorElement.options = optionsContainer;
  selectorElement.appendChild(selectionContainer);
  return selectorElement;
}

export default class DropDown {
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
    this.toggleDropDown = this.toggleDropDown.bind(this);

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

  toggleDropDown(e = undefined) {
    e && e.preventDefault();
    if (this.selectorEl) {
      this.selectorEl.classList.toggle(SelectorCss.active);
      if (this.selectorEl.classList.contains(SelectorCss.active)) {
        this.selectorEl.options.scrollTop =
          parseInt(this.selectorEl.options.dataset.id, 10) *
          this.selectorEl.options.active.clientHeight;
      }
    }
  }

  onChange(value) {
    if (value) {
      this.activeValue = value;
      this.initUI();
      this.__options.onChange && this.__options.onChange(this.activeValue);
    }
  }
}
