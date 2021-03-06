const mongoose = require("mongoose");

const Todolist = mongoose.model(
    "todolist",
    new mongoose.Schema({
        judul: String,
        description: String,
        status: Boolean,
        users: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        ],
    })
)
module.exports = Todolist;