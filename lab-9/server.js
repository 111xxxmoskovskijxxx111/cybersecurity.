const express = require('express');
const app = express();
const PORT = 3000;


const bookings = [];


app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}

app.post('/book', (req, res) => {
    
    let { name, surname, email, age, date } = req.body;

    
    if (!name || !surname || !email || !age || !date) {
        return res.status(400).send("<h1>400 Bad Request: All fields are required.</h1>");
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("<h1>400 Bad Request: Invalid email format.</h1>");
    }

    
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
        return res.status(400).send("<h1>400 Bad Request: Age must be a number between 5 and 100.</h1>");
    }

    
    if (isNaN(Date.parse(date))) {
        return res.status(400).send("<h1>400 Bad Request: Invalid date format.</h1>");
    }

   
    const safeName = escapeHTML(name);
    const safeSurname = escapeHTML(surname);

    
    const newBooking = { name: safeName, surname: safeSurname, email, age: ageNum, date };
    bookings.push(newBooking);

    
    res.send(`
        <h2>Booking Confirmed!</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Surname:</strong> ${safeSurname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Age:</strong> ${ageNum}</p>
        <p><strong>Date:</strong> ${date}</p>
        <hr>
        <p><a href="/">Go back</a></p>
    `);
});

app.listen(PORT, () => {
    console.log(`Camp Booking Server is running on http://localhost:${PORT}`);
});