const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model");
db.todolist = require("./todolist.model");

db.ROLES = ["user", "admin"];

module.exports = db;