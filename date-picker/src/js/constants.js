export const Selectors = {
    main: "date-picker", //
    wrapper: "date-wrapper", //
    dateSelector: "date-selector",
    yearSelector: "year-selector", //
    selector: "selector",
    row: "row",
    days: "days",
    day: "day",
    active: "active",
    dates: "dates",
    date: "date",
    defaultContainer: "default-container", //
    // disable: "disable",
    prevYear: "prev1",
    preMonth: "prev",
    nextMonth: "prev",
    nextYear: "prev1"
  },
  DefaultPickerProps = {
    value: undefined,
    container: undefined,
    pickerClass: undefined,
    onchange: undefined
  }, //
  Days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ],
  Start_end = {
    start_year: 1999,
    start_month: 1,
    end_month: 12
  },
  SelectorCss = {
    main: "selector-container",
    active: "active",
    selectionContainer: "option-and-value",
    valueContainer: "title-container",
    Yearvalue: "value",
    Monthvalue: "value_m"
  },
  SelectorProps = {
    start: [],
    stop: [],
    active: undefined,
    className: undefined,
    onChange: undefined
  },
  FullMOnths = [
    "January",
    "February",
    " March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    " December"
  ];
