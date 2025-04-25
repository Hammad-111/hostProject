const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    // Zarurat ho to aur fields bhi add kar sakte ho, e.g. devices
});

module.exports = mongoose.model('Room', RoomSchema);
