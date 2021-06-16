import { Selectors } from "./constants";
import { generateTimePickerUI } from "./dom-creator";
import Picker from "./picker";
export default class TimePicker extends Picker {
  constructor(_options = undefined) {
    super(_options);

    this.initializeUI();
  }

  resetPicker() {
    super.resetPicker();
    this._pickerContainer = generateTimePickerUI.call(this);
  }

  showPicker() {
    super.showPicker();
    if (this._pickerContainer) {
      this._pickerContainer.style.top = `${this.pickerStyle.top}px`;
      this._pickerContainer.style.left = `${this.pickerStyle.left}px`;
      this._rootContainer &&
        this._rootContainer.appendChild(this._pickerContainer);
      var activeHrAndMin = this._pickerContainer.querySelectorAll(
        `.${Selectors.active}`
      );
      if (activeHrAndMin) {
        activeHrAndMin.forEach((comp) => {
          comp.parentElement.scrollTop =
            parseInt(comp.innerHTML, 10) * comp.clientHeight;
        });
      }
    }
  }
}
