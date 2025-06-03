export function addLeadingZero(value) {
  return String(value).padStart(2, '0'); //додаєм "0" вперед одинарної цифри

  // return value < 10 ? `0${value}` : value;
}

//конвертація мілісекунд--------------------------------------------------------------

export function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

export const timerDay = document.querySelector('[data-days]');
export const timerHour = document.querySelector('[data-hours]');
export const timerMinute = document.querySelector('[data-minutes]');
export const timerSecond = document.querySelector('[data-seconds]');
