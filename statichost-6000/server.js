const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 6000;

app.use(cors());
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log("StaticHost running on http://localhost:6000");
});