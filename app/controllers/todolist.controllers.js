const Todolist = require("../models/todolist.model");
var jwt = require("jsonwebtoken");


exports.create = (req, res) => {
    const todolist = new Todolist({
      judul : req.body.judul,
      description : req.body.description,
      status : req.body.status
    });
  
    todolist.save((err, todolist) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.users) {
        Todolist.find(
          {
            username: { $in: req.body.users }
          },
          (err, users) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            todolist.users = users.map(user => user._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "Todolist was inserted successfully!" });
            });
          }
        );
      } else {
        Todolist.findOne({ username: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          todolist.users = [user._id];
          todolist.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "Todolist was inserted successfully!" });
          });
        });
      }
    });
  };

exports.findOne = (req,res) => {
    Todolist.findOne(req.params.todolistId)
    .then(todolist => {
        if(!todolist) {
            return res.status(404).send({
                message: "Todolist not found with id " + req.params.todolistId
            });            
        }
        res.send(todolist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todolist not found with id " + req.params.todolistId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving todolist with id " + req.params.todolistId
        });
    });
};


exports.findAll = (req,res) => {
    Todolist.find()
    .then(notes => {
        res.send(todolists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todolist."
        });
    });
};



exports.update = (req, res) => {
     // Validate Request
     if(!req.body.description) {
        return res.status(400).send({
            message: "Todolist description can not be empty"
        });
     }

  // Find note and update it with the request body
    Todolist.findByIdAndUpdate(req.params.todolistId, {
        judul: req.body.judul || "Untitled Note",
        description: req.body.description,
        status: req.body.status 
    }, {new: true})
    .then(todolist => {
        if(!todolist) {
            return res.status(404).send({
                message: "Todolist not found with id " + req.params.todolistId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todolist not found with id " + req.params.todolistId
            });                
        }
        return res.status(500).send({
            message: "Error updating todolist with id " + req.params.todolistId
        });
    });
};

exports.delete = (req, res) => {
  Todolist.findByIdAndRemove(req.params.todolistId)
  .then(todolist => {
      if(!todolist) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.todolistId
          });
      }
      res.send({message: "Todolist deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Todolist not found with id " + req.params.todolistId
          });                
      }
      return res.status(500).send({
          message: "Could not delete todolist with id " + req.params.todolistId
      });
  });
};