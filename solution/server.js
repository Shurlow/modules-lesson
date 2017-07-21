'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const guestsAsync = require('./guestsAsync');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/guests', (_req, res, next) => {
  guestsAsync.getGuests((err, guests) => {
    if (err) return next(err)
    res.send(guests)
  })
});

app.get('/guests/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  guestsAsync.getGuestByID(id, (err, guest) => {
    if (err) return next(err);
    res.send(guest)
  })
});

app.post('/guests', (req, res, next) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  guestsAsync.addGuest(name, (err, guest) => {
    if (err) return next(err);
    res.send(name)
  })

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
