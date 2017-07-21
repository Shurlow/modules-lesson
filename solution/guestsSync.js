const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

function getGuests() {
  const guestsJSON = fs.readFileSync(guestsPath, 'utf8')
  return JSON.parse(guestsJSON)
}

function getGuestByID(id) {
  const guestsJSON = fs.readFileSync(guestsPath, 'utf8')
  return JSON.parse(guestsJSON)[id]
}

function addGuest(guest) {
  const guests = getGuests()
  guests.push(guest);
  const newGuestsJSON = JSON.stringify(guests)
  fs.writeFileSync(guestsPath, newGuestsJSON)
  return guest
}

module.exports = {
  getGuests,
  getGuestByID,
  addGuest
}
