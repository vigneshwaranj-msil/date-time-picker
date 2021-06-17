import CurrentDate from "./current-date";
import { DefaultPickerProps } from "./constants";
import { generateInputContainer } from "./dom-creator";

export default class Picker {
  constructor(options = undefined) {
    options = options || DefaultPickerProps;
    if (!options.container) {
      throw new Error("No root element specified");
    }
    this._options = options;
    this.currentDateTime = new CurrentDate(this._options.value);
    this._rootContainer = null;
    this._inputEl = null;
    this._pickerContainer = null;
    this.pickerStyle = {
      top: 0,
      left: 0
    };

    this.initializeUI = this.initializeUI.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.resetPicker = this.resetPicker.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  initializeUI() {
    var rootContainer = document.querySelector(this._options.container);
    if (rootContainer) {
      this._rootContainer = rootContainer;
      var inputContainer = generateInputContainer();
      this._inputEl = inputContainer.querySelector("input");
      this._rootContainer.appendChild(inputContainer);
      this.initInputListener();
    } else {
      throw new Error("Container selector invalid");
    }
  }

  initInputListener() {
    if (this._inputEl) {
      this._inputEl.addEventListener("focus", this.showPicker.bind(this));
    }
  }

  showPicker() {
    this.resetPicker();
    var inputContainer = this._inputEl.parentElement;
    this.pickerStyle.top =
      inputContainer.offsetTop + 3 + inputContainer.offsetHeight;
    this.pickerStyle.left = "-100%";
  }

  resetPicker() {
    if (this._pickerContainer) {
      this._pickerContainer.remove();
    }
  }

  updateValue(value) {
    if (this._inputEl) {
      this._inputEl.value = value;
      this.resetPicker();
    }
  }
}
