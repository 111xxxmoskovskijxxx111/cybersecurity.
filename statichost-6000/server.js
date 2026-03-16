    const express = require("express");
    const cors = require("cors");
    const app = express();
    const PORT = 6000;

    app.use(cors());
    app.use(express.static(__dirname));

    const mode = process.argv[2] || "normal";

    app.get("/react-mock.js", (req, res) => {

        if (mode === "breach") {
            res.send('alert("CRITICAL: CDN Compromised! Stealing data...");');
        } else {
            res.send('console.log("React v1.0.0 loaded from CDN");');
        }
    
    });

    app.listen(PORT, () => {
        console.log("StaticHost running on http://localhost:6000");
    });