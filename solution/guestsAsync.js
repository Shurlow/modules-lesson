const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

function getGuests(cb) {
  fs.readFile(guestsPath, 'utf8', (err, json) => {
    if (err) {
      return cb(err)
    }

    cb(null, JSON.parse(json))
  })
}

function getGuestByID(id, cb) {
  getGuests((err, guests) => {
    if (err || id < 0 || id >= guests.length || isNaN(id)) {
      cb('Error reading guests.')
    }
    cb(null, guests[id])
  })
}

function addGuest(guest, cb) {
  getGuests((err, guests) => {
    if (err) {
      return cb(err)
    }

    guests.push(guest)
    const newGuestsJSON = JSON.stringify(guests)

    fs.writeFile(guestsPath, newGuestsJSON, 'utf8', (err) => {
      if (err) {
        return cb(err)
      }
      cb(null, guest)
    })

  })
}

module.exports = {
  getGuests,
  getGuestByID,
  addGuest
}
