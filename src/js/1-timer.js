//! Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
//* оголоси поза межами методу let змінну, наприклад, userSelectedDate, і після валідації її в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну.

//* Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
//* Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.

//* Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
// *Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання.

// *Відлік часу:
//* Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

//* Кількість днів може складатися з більше, ніж двох цифр.
//* Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю 00:00:00:00.

// *Після запуску таймера натисканням кнопки Старт кнопка Старт і інпут стають неактивним, щоб користувач не міг обрати нову дату, поки йде відлік часу. Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його — необхідно перезавантажити сторінку.

//* Форматування часу:
//* Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart() і перед відмальовуванням інтерфейсу форматує значення.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//----------------------------------------------------------------------------------
import {
  addLeadingZero,
  convertMs,
  timerDay,
  timerHour,
  timerMinute,
  timerSecond,
} from './helpers/timer-functions.js';

//----------------------------------------------------------------------------------

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('.start-btn');
// const timerDay = document.querySelector('[data-days]');
// const timerHour = document.querySelector('[data-hours]');
// const timerMinute = document.querySelector('[data-minutes]');
// const timerSecond = document.querySelector('[data-seconds]');

startButton.addEventListener('click', startTimer);

let userSelectedDate;
let timerInterval;

//налаштування flatppickr------------------------------------------------------------
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Отримуємо обрану дату
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',

        messageColor: '#FFF',
        titleColor: '#FFF',

        backgroundColor: '#ef4040',
        borderBottom: '2px solid #ffbebe',
        borderRadius: '4px',
        padding: '20px',
        width: '302px',
        height: '64px',
        timeout: 5000, // Время отображения
      });

      // window.alert('Please choose a date in the future');

      startButton.disabled = true; // Вимикаємо кнопку
    } else {
      startButton.disabled = false; // Активуємо
    }
    // console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

//відображення таймера(скільки лишилось часу)---------------------------------
function timerUpdate(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  timerDay.textContent = addLeadingZero(days);
  timerHour.textContent = addLeadingZero(hours);
  timerMinute.textContent = addLeadingZero(minutes);
  timerSecond.textContent = addLeadingZero(seconds);
}
//-------------------------------------------------------------------------------------

startButton.disabled = true; // робимо кнопку на початку неактивною

function startTimer() {
  // Робимо кнопку та поле вибору дати неактивними після кліку
  startButton.disabled = true;
  datetimePicker.disabled = true;

  // Визначаємо різницю у часі
  const currentDate = new Date();
  const timeDiff = userSelectedDate - currentDate;

  // Оновлюємо таймер кожну секунду
  timerInterval = setInterval(() => {
    // Визначаємо різницю у часі
    const currentDate = new Date();
    const timeDiff = userSelectedDate - currentDate;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      timerUpdate(0); // Відображаємо 00:00:00:00

      startButton.disabled = false; // знову активно
      datetimePicker.disabled = false; // знову активно
    }

    timerUpdate(timeDiff);

    // console.log(timeDiff);
  }, 1000);

  timerUpdate(timeDiff);

  //зупиняємо таймер, коли вже 0
  if (timeDiff <= 0) {
    clearInterval(timerInterval);

    timerUpdate(0); // Відображаємо 00:00:00:00
    startButton.disabled = false; // знову активно
    datetimePicker.disabled = false;
  }
}

//----------------------------------------------------------------------------------
