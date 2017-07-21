'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const guestsPath = path.join(__dirname, 'guests.json');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/guests', (req, res, next) => {
  // Refactor the code bellow to a module
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      return next(err);
    }

    const guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', (req, res, next) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      return next(err);
    }

    const id = parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.post('/guests', (req, res, next) => {
  fs.readFile(guestsPath, 'utf8', (readErr, guestsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const guests = JSON.parse(guestsJSON)
    guests.push(name);

    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(name);
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
