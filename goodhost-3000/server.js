const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;


const config = JSON.parse(fs.readFileSync("config.json"));
const version = fs.readFileSync("version.txt", "utf-8");

console.log(`[System] Starting ${config.appName} v${version}...`);


if (config.mode === "mode1") {
    app.use(cors());
}


const emails = [
    {
        sender: "admin@company.com",
        subject: "Welcome!",
        body: "Welcome to SecureMail Pro!"
    },
    {
        sender: "boss@company.com",
        subject: "Meeting",
        body: "Meeting at 3 PM today."
    }
];

app.use(express.static(__dirname));

app.get("/emails", (req, res) => {
    res.json(emails);
});

app.listen(PORT, () => {
    console.log("GoodHost running on http://localhost:3000");
});