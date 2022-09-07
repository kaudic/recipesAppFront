// importation des différents package
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT ?? 3002;

app.use(express.static(path.join(__dirname, "build")));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app listenning to port
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});