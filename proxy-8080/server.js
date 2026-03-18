const express = require("express");
const http = require("http");

const app = express();
const PORT = 8080;


let mode = "breach"; 


app.get("/mode", (req, res) => {
    mode = req.query.type;
    res.send("Mode set to: " + mode);
});


app.use((req, res) => {
    const options = {
        hostname: "localhost",
        port: 3000,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    
    if (mode === "breach") {
        console.log("🍪 Intercepted Cookie:", req.headers.cookie);
    }

    const proxy = http.request(options, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
});

app.listen(PORT, () => {
    console.log("Proxy running on http://localhost:8080");
});