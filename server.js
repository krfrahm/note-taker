const express = require('express');
const path = require('path');
const notes = require('./db/db.json');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/api/notes', (req,res) => {
    console.info(`${req.method} request recieved`)
    return res.json(notes)
})

app.listen(PORT, () =>
    console.log('app listening at http://localhost:${PORT}')
)