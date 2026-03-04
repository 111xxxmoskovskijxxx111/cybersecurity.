const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.static(__dirname));


app.get("/messages", (req, res) => {
    res.json({ message: "No new messages." });
});

app.listen(PORT, () => {
    console.log("TrustCo running on http://localhost:4000");
});