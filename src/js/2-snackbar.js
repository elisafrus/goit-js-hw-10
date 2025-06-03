// Напиши скрипт, який після сабміту форми створює проміс.

// *В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися(при fulfilled) або відхилятися(при rejected), залежно від обраної опції в радіокнопках.

// *Значенням промісу, яке передається як аргумент у методи resolve / reject, має бути значення затримки в мілісекундах.

// *Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// *Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

//* `✅ Fulfilled promise in ${delay}ms`

// *Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

// *`❌ Rejected promise in ${delay}ms`;
//-----------------------------------------------------------------------------------------------------------------------------

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayEl = form.querySelector("input[name='delay']"); //введене значення затримки
// const stateEl = form.querySelector("input[name='state']");

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  // Отримуємо значення з поля введення та перетворюємо його в число
  const delayValue = parseInt(delayEl.value);

  // Отримуємо обраний стан з радіокнопок
  const btnState = event.currentTarget.elements.state.value;

  // console.log(btnState);

  // Створюємо новий проміс
  const promise = new Promise((resolve, reject) => {
    // Встановлюємо таймер
    setTimeout(() => {
      //перевіряємо стан обраної кнопки
      if (btnState === 'fulfilled') {
        resolve(delayValue);
      } else if (btnState === 'rejected') {
        reject(delayValue);
      }
    }, delayValue);
  });

  //обробляємо проміс
  promise
    .then(delay => {
      iziToast.show({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,

        messageColor: '#FFF',
        titleColor: '#FFF',

        backgroundColor: '#59A10D',
        borderBottom: '2px solid #ffbebe',
        borderRadius: '4px',
        padding: '20px',
        width: '383px',
        height: '64px',
        timeout: 5000,
        closeOnClick: true,
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,

        messageColor: '#FFF',
        titleColor: '#FFF',

        backgroundColor: '#ef4040',
        borderBottom: '2px solid #ffbebe',
        borderRadius: '4px',
        padding: '20px',
        width: '302px',
        height: '64px',
        timeout: 5000,
        closeOnClick: true,
      });
    });
}
