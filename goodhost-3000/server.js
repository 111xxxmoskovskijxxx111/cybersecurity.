let sessions = [];
const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const cors = require("cors");
const https = require("https"); 
const http = require("http");   

const app = express();
const PORT_HTTP = 3000;
const PORT_HTTPS = 3443;


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const config = JSON.parse(fs.readFileSync("config.json"));
const version = fs.readFileSync("version.txt", "utf-8");

console.log(`[System] Starting ${config.appName} v${version}...`);


app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    next();
});


if (config.mode === "mode1") {
    app.use(cors());
}

if (config.mode === "csp-strict") {
    app.use((req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self';"
        );
        next();
    });
}

if (config.mode === "csp-balanced") {
    app.use((req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; img-src *; style-src *; script-src 'self' http://localhost:4000 http://localhost:6000;"
        );
        next();
    });
}

const emails = [
    { id: 1, sender: "admin@company.com", subject: "Welcome!", body: "Welcome to SecureMail Pro!" },
    { id: 2, sender: "boss@company.com", subject: "Meeting", body: "Meeting at 3 PM today." }
];

app.use(express.static(__dirname));

app.get("/emails", (req, res) => {
    res.json(emails);
});

const users = {
    john: "123",
    anna: "456"
};

app.get('/login', (req, res) => {
    const username = req.query.username;

    if (users[username]) {
        const sessionID = `${username}-session`;
        const csrfToken = crypto.randomBytes(16).toString("hex");

        sessions.push({
            id: sessionID,
            time: Date.now(),
            csrf: csrfToken
        });

        
        res.setHeader('Set-Cookie', `SessionID=${sessionID}; Path=/; HttpOnly; SameSite=Strict; Secure`);
        res.json({ message: "Login successful", csrfToken });
    } else {
        res.status(401).send("User not found");
    }
});

app.get("/api/emails", (req, res) => {
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).send("Unauthorized");

    const sessionID = cookie.split("=")[1];
    const session = sessions.find(s => s.id === sessionID);

    if (!session) return res.status(401).send("Invalid session");

    if (Date.now() - session.time > 2 * 60 * 1000) {
        sessions = sessions.filter(s => s.id !== sessionID);
        return res.status(401).send("Session expired");
    }

    res.json(emails);
});

app.get("/api/logout", (req, res) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        const sessionID = cookie.split("=")[1];
        sessions = sessions.filter(s => s.id !== sessionID);
    }
    res.send("Logged out");
});

app.post("/api/emails/delete/:id", (req, res) => {
    const cookie = req.headers.cookie;
    const token = req.headers["x-csrf-token"];

    if (!cookie) return res.status(401).send("Unauthorized");

    const sessionID = cookie.split("=")[1];
    const session = sessions.find(s => s.id === sessionID);

    if (!session) return res.status(401).send("Invalid session");
    if (session.csrf !== token) return res.status(403).send("Forbidden");

    const id = parseInt(req.params.id);
    const index = emails.findIndex(e => e.id === id);
    if (index !== -1) emails.splice(index, 1);

    res.send("Deleted securely");
});


https.createServer(options, app).listen(PORT_HTTPS, () => {
    console.log(`[System] Secure Server running on https://localhost:${PORT_HTTPS}`);
});

http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://localhost:${PORT_HTTPS}${req.url}` });
    res.end();
}).listen(PORT_HTTP, () => {
    console.log(`[System] HTTP Redirect server running on http://localhost:${PORT_HTTP}`);
});