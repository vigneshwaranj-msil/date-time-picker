import { generateDatePickerUI } from "./dom-creator";
import Picker from "./picker";

export default class DatePicker extends Picker {
  constructor(options = undefined) {
    super(options);
    this.showNextMonth = this.showNextMonth.bind(this);
    this.showPrevMonth = this.showPrevMonth.bind(this);
    this.showPrevYear = this.showPrevYear.bind(this);
    this.showNextYear = this.showNextYear.bind(this);
    this.__showPickerWithInputFocused = this.__showPickerWithInputFocused.bind(
      this
    );
    this.initializeUI();
  }

  resetPicker() {
    super.resetPicker();
    this._pickerContainer = generateDatePickerUI.call(
      this,
      this._options.pickerClass
    );
  }

  showPicker() {
    super.showPicker();
    if (this._pickerContainer) {
      this._pickerContainer.style.top = `${this.pickerStyle.top}px`;
      if (this.pickerStyle.left) {
        this._pickerContainer.style.left = `${this.pickerStyle.left}px`;
      }
      this._inputEl &&
        this._inputEl.parentElement &&
        this._inputEl.parentElement.appendChild(this._pickerContainer);
    }
  }
  __showPickerWithInputFocused() {
    setTimeout(() => {
      this._inputEl.focus();
      this.showPicker();
    }, 0.01e3);
  }
  showPrevYear() {
    this.currentDateTime.goPrevYear();
    this.__showPickerWithInputFocused();
  }
  showPrevMonth() {
    this.currentDateTime.goPrevMonth();
    this.__showPickerWithInputFocused();
  }
  showNextYear() {
    this.currentDateTime.goNextYear();
    this.__showPickerWithInputFocused();
  }

  showNextMonth() {
    this.currentDateTime.goNextMonth();
    this.__showPickerWithInputFocused();
  }
}
