export function isValidDate(date = undefined) {
  if (typeof date === "string") {
    date = date ? new Date(date) : new Date();
  } else if (typeof date === "undefined") {
    date = new Date();
  } else {
    //do nothing
  }
  return !isNaN(date.getTime());
}
