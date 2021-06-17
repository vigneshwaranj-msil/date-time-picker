import { generateDatePickerUI } from "./dom-creator";
import Picker from "./picker";

export default class DatePicker extends Picker {
  constructor(options = undefined) {
    super(options);

    this.showNextMonth = this.showNextMonth.bind(this);
    this.showPrevMonth = this.showPrevMonth.bind(this);
    this.initializeUI();
  }

  resetPicker() {
    super.resetPicker();
    this._pickerContainer = generateDatePickerUI.call(this);
  }

  showPicker() {
    super.showPicker();
    if (this._pickerContainer) {
      this._pickerContainer.style.top = `${this.pickerStyle.top}px`;
      this._pickerContainer.style.left = `${this.pickerStyle.left}`;
      this._inputEl &&
        this._inputEl.parentElement && 
        this._inputEl.parentElement.appendChild(this._pickerContainer);
    }
  }

  showPrevMonth() {
    this.currentDateTime.goPrevMonth();
    this.showPicker();
  }

  showNextMonth() {
    this.currentDateTime.goNextMonth();
    this.showPicker();
  }
}
