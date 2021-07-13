import { generateTimePickerUI } from "./dom-creator";
import Picker from "./picker";

export default class TimePicker extends Picker {
  constructor(_options = undefined) {
    super(_options);
    const time = ["hour", "min", "sec"];
    var values = this._options.value
      ? this._options.value.split(":")
      : undefined;
    if (values && values.length) {
      var obj = {};
      values.forEach((v, i) => {
        obj[time[i]] = parseInt(v, 10);
      });
      this.currentDateTime.goTo(obj);
    }
    this.initializeUI();
  }
  __showPickerWithInputFocused() {
    setTimeout(() => {
      this._inputEl.focus();
      this.showPicker();
    }, 0.01e3);
  }

  resetPicker() {
    super.resetPicker();
    this._pickerContainer = generateTimePickerUI.call(
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
}
