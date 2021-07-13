import { isValidDate } from "./utils";

export default class CurrentDate {
  constructor(date = undefined) {
    date = date || new Date();
    if (!isValidDate(date)) {
      date = new Date();
    }
    this.currentDate = new Date(date);
    this.goTo = this.goTo.bind(this);
    this.toInputTimeString = this.toInputTimeString.bind(this);
    this.toTimeString = this.toTimeString.bind(this);
  }

  get date() {
    return this.currentDate.getDate();
  }

  get month() {
    return this.currentDate.getMonth() + 1;
  }

  get year() {
    return this.currentDate.getFullYear();
  }

  get hour() {
    return this.currentDate.getHours();
  }

  get minute() {
    return this.currentDate.getMinutes();
  }

  get second() {
    return this.currentDate.getSeconds();
  }

  goTo({ date, month, year, hour, min, sec }) {
    date = date || this.date;
    month = month || this.month;
    year = year || this.year;
    hour = hour || this.hour;
    min = min || this.minute;
    sec = sec || this.second;
    this.currentDate = new Date(year, month - 1, date, hour, min, sec);
  }

  static getFormattedDateValues(value) {
    return value < 10 ? "0" + value : value;
  }

  toTimeString() {
    return `${CurrentDate.getFormattedDateValues(
      this.hour
    )}:${CurrentDate.getFormattedDateValues(this.minute)}`;
  }

  toInputTimeString() {
    return `${this.toTimeString()}:${CurrentDate.getFormattedDateValues(
      this.second
    )}`;
  }
}
