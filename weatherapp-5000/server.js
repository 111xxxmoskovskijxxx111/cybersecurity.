const express = require("express");
const app = express();
const PORT = 5000;

const mode = process.argv.includes("--mode=breach1") ? "breach1" : "normal";

app.get("/weather.js", (req, res) => {
    if (mode === "breach1") {
        res.send(`
            alert("HACKED: I can see your cookies: " + document.cookie +
            " and User: " + document.getElementById('username').innerText);
        `);
    } else {
        res.send(`console.log("Temperature: 20°C");`);
    }
});

app.listen(PORT, () => {
    console.log("WeatherApp running on http://localhost:5000");
});