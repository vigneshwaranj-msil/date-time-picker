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
    this.toDateString = this.toDateString.bind(this);
    this.toInputDateString = this.toInputDateString.bind(this);
    this.toInputTimeString = this.toInputTimeString.bind(this);
    this.toString = this.toString.bind(this);
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
    var newDate = new Date(this.currentDate.getTime());
    newDate.setMonth(this.month);
    if (newDate.getTime() <= Date.now()) {
      this.goTo({
        month: this.month + 1
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

  toDateString() {
    return `${CurrentDate.getFormattedDateValues(
      this.date
    )}/${CurrentDate.getFormattedDateValues(this.month)}/${this.year}`;
  }

  toInputDateString() {
    return `${this.year}-${CurrentDate.getFormattedDateValues(
      this.month
    )}-${CurrentDate.getFormattedDateValues(this.date)}`;
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

  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
}
