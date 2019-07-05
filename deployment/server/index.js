const express = require("express");

const port = 8080;

const app = express();
app.use(express.static("public"));
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
