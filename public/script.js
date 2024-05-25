// Отправляем post запрос на сервер
const FEEDBACK_FORM = document.querySelector('#feedback-form');

// Функция отправки обратной связи
function sendFeedBack(feedback){
    fetch("/api/feedback", {
        method: 'POST',
        headers: {
            "Content-Tipe": "application/json"
        },
        body: JSON.stringify(feedback),
    }).then((response) => response.json()).then(data => {
        console.log(data);
        alert('Коментарий отправлен');
    }).catch((error) => {
        console.error(error);
        alert('Ошибка');
    })
}

// Добавляем событие при нажатии на кнопку "Отправить"
FEEDBACK_FORM.addEventListener('submit', (e) => {
    // Чтобы страница не перезагружалась при нажатии на кнопку
    e.preventDefault();
    // Создаём переменную в которую помещаем данные, которые ввёл пользователь
    const feedbackFormData = new FormData(e.target);
    console.log('feedbackFormData', feedbackFormData);
    const feedback = Object.fromEntries(feedbackFormData);
    console.log('feedback', feedback);

    // Вызов функции отправки формы с преедачей данных
    sendFeedBack(feedback);
})