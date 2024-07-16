const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid.js');


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

app.post('/api/notes', (req,res) => {
    const {noteTitle, text} = req.body;
    if (title && text) {
        const newNote = {
            noteTitle,
            text,
            note_id: uuid()
        }
    const noteString = JSON.stringify(newNote);

    // Write the string to a file
    fs.writeFile(`./db/${newNote.product}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.product} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
})

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)