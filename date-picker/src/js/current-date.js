import { isValidDate } from "./utils";

export default class CurrentDate {
  constructor(date = undefined) {
    date = date || new Date();
    if (!isValidDate(date)) {
      date = new Date();
    }
    this.currentDate = new Date(date);

    this.goTo = this.goTo.bind(this);
    this.goNextMonth = this.goNextMonth.bind(this);
    this.goPrevMonth = this.goPrevMonth.bind(this);
    this.goPrevYear = this.goPrevYear.bind(this);
    this.goNextYear = this.goNextYear.bind(this);
    this.toInputDateString = this.toInputDateString.bind(this);
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

  get dayOfWeek() {
    return this.currentDate.getDay();
  }

  get startDayOfTheMonth() {
    return new Date(this.year, this.month - 1, 1).getDay();
  }

  get numberOfDaysInMonth() {
    return new Date(this.year, this.month, 0).getDate();
  }

  get numberOfRows() {
    return Math.ceil((this.numberOfDaysInMonth + this.dayOfWeek) / 7);
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

  goNextMonth() {
    this.goTo({
      month: this.month + 1
    });
  }
  goNextYear() {
    this.goTo({
      year: this.year + 1
    });
  }

  goPrevYear() {
    var end = 1999;
    if (end < this.year) {
      this.goTo({
        year: this.year - 1
      });
    }
  }

  goPrevMonth() {
    this.goTo({
      month: this.month - 1
    });
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

  toInputDateString() {
    return `${this.year}-${CurrentDate.getFormattedDateValues(
      this.month
    )}-${CurrentDate.getFormattedDateValues(this.date)}`;
  }
}
