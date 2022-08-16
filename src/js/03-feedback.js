import throttle from 'lodash.throttle';

// const FEEDBACK_FORM_STATE = 'feedback-form-state';
const form = document.querySelector('form.feedback-form');

// создание const на обработку ошибок
const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getItemKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};


// отработка собития с помошью lodash.throttle
form.addEventListener('input', throttle(saveValue, 500));

// делегирование собития и создание объекта на прослушивание всей формы
let formData = getItemKey("feedback-form-state") || {};
function saveValue(e) {
  formData[e.target.name] = e.target.value;
  save("feedback-form-state", JSON.stringify(formData));
}

// запись данных в localStorage
localStorageValue();

function localStorageValue() {
  const proverka = getItemKey("feedback-form-state");
  if (proverka) {
    if (proverka.email) {
      form.email.value = proverka.email;
    }
    if (proverka.message) {
      form.message.value = proverka.message;
    }
  }
}

// Кнопка SABMIT (очишение localStorage и форм по нажатию кнопки sabmit);

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();   //отменяем действие по дефолту
  
  // проверяем заполнены поля или нет при отправке формы
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  removeKey("feedback-form-state");
  const formData = new FormData(form);
  const valuesFotm = Object.fromEntries(formData.entries());
  console.log(valuesFotm);
  e.currentTarget.reset();   // очищаем форму и localStorage после отправки формы (нажатия кнопки)
  localStorage.removeItem("feedback-form-state");
}

