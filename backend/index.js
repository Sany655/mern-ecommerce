// express server setup

const express = require('express');
const app = express();
const port = 3000;

// middleware setup

app.use(express.json());

// API endpoints

app.get('/', (req, res) => {
    res.send("hello world!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));