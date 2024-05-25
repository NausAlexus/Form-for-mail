// Подключаем фрэймворки
const express = require ('express')
const nodemailer = require ('nodemailer')

// Создаём сервер
const server = express();

// Обработка статических файлов
server.use(express.static(__dirname +'/public'));
server.use(express.json());

// При get запросе отдаём index.html
server.get('/', (req, res) => {
    res.sendFile("public/index.html", {root: __dirname})
})

// Обработчик для post запроса
server.post("/api/feedback", async(req, res) => {
    try{
    // Объект для подключения к почтовоу серверу
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth:{
            // Указываем нашу почту
            user: "Mail",
            pass: "paswordMail"
        }
    });

    // Получаем поля формы  из тела запроса
    const {name, comment} = req.body;

    // Отправляем поля формы на почту
    await transporter.sendMail({
        from: "Mail",
        to: "Mail",
        subject: `Письмо от ${name}`,
        text: `${name} ${comment}`,
        html:
        `
        <p>${name}</p>
        <p>${comment}</p>
        `
    });

    // При успешной отправке письма
    return res.status(200).send({
        status: 200,
        message: 'Успешная отправка'
    })

    // При ошибке
    } catch(e) {
        return res.status(500).send({
            status: 500,
            message: 'Ошибка при запросе'
        });
    }
})

// Слушаем 3000 порт
server.listen(3000, () => {
    console.log('Слушаем 3000 порт');
})