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

const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

let yearsIn = document.getElementById("inYears");
let monthesIn = document.getElementById("inMonthes");
let daysIn = document.getElementById("inDays");
let hoursIn = document.getElementById("inHours");
let minutesIn = document.getElementById("inMinutes");

const format = document.getElementById("format");
const deadlineBtn = document.getElementById("deadline__btn");
const timerContainer = document.getElementById("timer-container");
const cols = document.querySelectorAll(".col");
const deadlineText = document.querySelector(".deadline__text");
let timeInterval;

// Make project interactive
const observer = new IntersectionObserver(
  (entris) => {
    entris.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0,0)";
      }
    });
  },
  {
    rootMargin: "100px",
  }
);
cols.forEach((col) => {
  observer.observe(col);
});

// Format time
const timeFormat = (time, string) => {
  return time === 1
    ? `<span class="fs-1">${time}</span> ${string}`
    : `<span class="fs-1">${time}</span> ${string}s`;
};

// Handle time in text
const handleTimeNumbers = (time) => {
  return time<10? `0${time}`: time;
};

const displayDeadline = () => {
  // Date intered from user
  const interdYears = yearsIn.value;
  const interdMonths = monthesIn.value;
  const interdDays = daysIn.value;
  const interdMinutes = minutesIn.value;

  // Handle hour
  let interdHours =
    format.value == "pm" ? String(Number(hoursIn.value) + 12) : hoursIn.value;
  if (format.value == "pm" && hoursIn.value == 12) {
    interdHours = 12;
  } else if (format.value == "am" && hoursIn.value == 12) {
    interdHours = 24;
  }

  // Get deadline date to calculate
  const interdDate = new Date(
    interdYears,
    interdMonths - 1,
    interdDays,
    interdHours,
    interdMinutes,
    0
  );

  // Current Date
  const currentDate = new Date();
  // Diffrance time
  const diff = (interdDate.getTime() - currentDate.getTime()) / 1000;

  if (diff < 0) {
    clearInterval(timeInterval);
    deadlineText.innerHTML = "<p>Invalid deadline!</p>";
  } else {
    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    const seconds = Math.floor(diff % 60);
    daysElem.innerHTML = timeFormat(handleTimeNumbers(days), "day");
    hoursElem.innerHTML = timeFormat(handleTimeNumbers(hours), "hour");
    minutesElem.innerHTML = timeFormat(handleTimeNumbers(minutes), "min");
    secondsElem.innerHTML = timeFormat(handleTimeNumbers(seconds), "sec");

    // Display deadline line as text
    let deadMinute = interdDate.getMinutes();
    deadMinute = handleTimeNumbers(deadMinute);
    let deadHour = interdDate.getHours();
    let deadWeekDay = interdDate.getDay();
    deadWeekDay = weekDays[deadWeekDay];
    const deadMonthDay = interdDate.getDate();
    let deadMonth = interdDate.getMonth();
    deadMonth = months[deadMonth];
    const deadYear = interdDate.getFullYear();
    const deadFormat = format.value;
    if (deadHour > 12) {
      deadHour -= 12;
    }
    deadHour = handleTimeNumbers(deadHour);
    // Enter your deadline.
    deadlineText.innerHTML = `
    <p class="deadline__text">Deadline ends on ${deadWeekDay}, ${deadMonthDay} ${deadMonth} ${deadYear}, ${deadHour}:${deadMinute}${deadFormat}</p>
    `;
    return diff;
  };
  return diff;
};
deadlineBtn.addEventListener("click", () => {
  displayDeadline();
  timeInterval = setInterval(displayDeadline, 1000);
});
