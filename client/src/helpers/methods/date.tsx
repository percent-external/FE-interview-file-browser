export const getFormattedDate = (date: Date) => {
  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
};

export const getFormattedTime = (date: Date) => {
  const hoursNumber = date.getHours();
  let hours = hoursNumber.toString();
  let am_pm = "AM";
  if (hoursNumber < 10) {
    hours = "0" + hours;
    am_pm = "AM";
  } else if (hoursNumber < 12) {
    am_pm = "AM";
  } else if (hoursNumber === 12) {
    am_pm = "PM";
  } else {
    hours = (hoursNumber - 12).toString();
    hours = hours.length > 1 ? hours : "0" + hours;
    am_pm = "PM";
  }

  let minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : "0" + minutes;

  return hours + ":" + minutes + " " + am_pm;
};

export const getFormattedDateTime = (date: Date) => {
  const dateString = getFormattedDate(date);
  const timeString = getFormattedTime(date);
  return dateString + " " + timeString;
};
