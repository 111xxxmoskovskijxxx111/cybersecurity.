const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();


const PORT = 3001; 


const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error("Ошибка базы данных:", err.message);
    } else {
        console.log("База данных SQLite успешно создана в памяти!");
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER, date TEXT)`);
    db.run(`INSERT INTO bookings (name, email, age, date) VALUES ('Admin', 'admin@camp.com', 40, '2026-01-01')`);
    db.run(`INSERT INTO bookings (name, email, age, date) VALUES ('John', 'john@mail.com', 20, '2026-05-10')`);
    db.run(`INSERT INTO bookings (name, email, age, date) VALUES ('Alice', 'alice@mail.com', 25, '2026-06-15')`);
});


app.get('/search-bookings', (req, res) => {
    const searchName = req.query.name;
    
    
    const query = "SELECT * FROM bookings WHERE name = ?";
    
    console.log("Выполняем безопасный SQL запрос. Ищем буквально имя:", searchName);

    
    db.all(query, [searchName], (err, rows) => {
        if (err) return res.status(500).send("Database error: " + err.message);
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error("Ошибка при запуске сервера:", err.message);
});