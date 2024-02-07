const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

const deadlineDone = document.getElementById("alert-done");
const deadlineInvalid = document.getElementById("alert-deadline");
const interAlert = document.getElementById("alert-inter");

let daysIn = document.getElementById("inDays");
let monthesIn = document.getElementById("inMonthes");
let yearsIn = document.getElementById("inYears");

const deadlineBtn = document.getElementById("deadline__btn");
let timeInterval;

const timeFormat = (time, string) => {
  return time == 1
    ? `<span class="fs-1">${time}</span> ${string}`
    : `<span class="fs-1">${time}</span> ${string}s`;
};


const startCountdown = () => {
  let daysIntered = daysIn.value;
  let monthesIntered = monthesIn.value;
  let yearsIntered = yearsIn.value;
  let countdownDateIntered = new Date(
    yearsIntered,
    monthesIntered - 1,
    daysIntered
  );

  let countdown = new Date(countdownDateIntered).getTime();
  let now = new Date().getTime();
  let diff = (countdown - now) / 1000;

  if(now > countdown) {
    clearInterval(timeInterval);
    deadlineDone.classList.remove('d-n');
    setTimeout(()=>{deadlineDone.classList.add('d-n')},2000);
  } else if ((yearsIntered.length > 4 || yearsIntered.length < 4) || 
  monthesIntered.length > 2 || daysIntered.length > 2 || 
  (yearsIntered=='' || monthesIntered=='' || daysIntered=='') ||
  diff < 0) {
    clearInterval(timeInterval);
    deadlineInvalid.classList.remove('d-n');
    setTimeout(() => {deadlineInvalid.classList.add('d-n')}, 2000);
  } else {
    let days = Math.floor( diff / (60*60*24) );
    let hours = Math.floor( (diff % (60*60*24)) / (60*60) );
    let minutes = Math.floor( (diff % (60*60)) / 60 );
    let seconds = Math.floor(diff % 60);
    daysElem.innerHTML = timeFormat(days, "day");
    hoursElem.innerHTML = timeFormat(hours, "hour");
    minutesElem.innerHTML = timeFormat(minutes, 'minute');
    secondsElem.innerHTML = timeFormat(seconds, "second");
  }

};

deadlineBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startCountdown();
  timeInterval = setInterval(startCountdown, 1000);
});
