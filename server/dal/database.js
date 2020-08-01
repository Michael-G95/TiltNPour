const url = process.env.DATABASE_CONNSTR;
const mongoose = require('mongoose');

console.log("Connecting...");
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (x = null, y = null) => console.log(x, y));
db.once('open', function () {
    console.log("Connected OK");
});

module.exports = db;