const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novamber",
  "December",
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const cols = document.querySelectorAll(".col");
const deadlineText = document.querySelector(".deadline__text");

const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

const deadlineDone = document.getElementById("alert-done");
const deadlineInvalid = document.getElementById("alert-deadline");
const interAlert = document.getElementById("alert-inter");

let minutesIn = document.getElementById("inMinutes");
let hoursIn = document.getElementById("inHours");
let daysIn = document.getElementById("inDays");
let monthesIn = document.getElementById("inMonthes");
let yearsIn = document.getElementById("inYears");

const deadlineBtn = document.getElementById("deadline__btn");
let timeInterval;

const observer = new IntersectionObserver((entris) => {
  entris.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translate(0,0)";
    }
  });
});
cols.forEach((col) => {
  observer.observe(col);
});

const timeFormat = (time, string) => {
  return time === 1
    ? `<span class="fs-1">${time}</span> ${string}`
    : `<span class="fs-1">${time}</span> ${string}s`;
};

const displayDeadline = () => {
  const interdYears = yearsIn.value;
  const interdMonths = monthesIn.value;
  const interdDays = daysIn.value;
  const interdHours = hoursIn.value;
  const interdMinutes = minutesIn.value;

  const deadlineDate = new Date(
    interdYears,
    interdMonths-1,
    interdDays,
    interdHours,
    interdMinutes,
    0
  );

  const deadlineMinutes = deadlineDate.getMinutes();
  const deadlineHour = deadlineDate.getHours();
  const deadlineWeekDay = deadlineDate.getDay();
  deadlineWeekDay = weekDays[deadlineWeekDay];
  const deadlineMonthDay = deadlineDate.getDate();
  const deadlineMonth = deadlineDate.getMonth();
  deadlineMonth = months[deadlineMonth];
  const deadlineYear = deadlineDate.getFullYear();

  deadlineText.innerText = `
      Deadline ends on ${deadlineWeekDay}, ${deadlineMonthDay} ${deadlineMonth} ${deadlineYear} ${deadlineHour}:${deadlineMinutes}
  `;

  const deadlineDateToCalc = deadlineDate.getTime();
  const now = new Date().getTime();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth()+1;
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // if (interdYears<currentYear||
  //     interdMonths<currentMonth||
  //     interdDays<currentDay) {

  // }
};
// Deadline ends on weekday, day month year hours:minutes am

console.log(new Date().getHours());
