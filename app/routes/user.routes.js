const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const todolists = require('../controllers/todolist.controller.js');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


  // Create a new Note
  app.post('/api/todolists', [authJwt.verifyToken], todolists.create);

  // Retrieve all Notes
  app.get('/api/todolists',  [authJwt.verifyToken], todolists.findAll);

  // Retrieve a single Note with noteId
  app.get('/api/todolists:todolistId',  [authJwt.verifyToken], todolists.findOne);

  // Update a Note with noteId
  app.put('/api/todolists/update/:todolistId',  [authJwt.verifyToken], todolists.update);

  // Delete a Note with noteId
  app.delete('/api/todolists/delete/:todolistId',  [authJwt.verifyToken] ,todolists.delete);
};