var { userController } = require('./../components/users/userController');

function initialize(server) {
    // User
    userRoutes(server);
}

function userRoutes(server) {
    // POST     /api/users
    server.post("/api/users", userController.createUser);

    // PUT      /api/users/:id
    server.put("/api/users/:id", userController.updateUser);

    // GET      /api/users
    server.get("/api/users", userController.getUsers);

    // GET      /api/users/:id
    server.get("/api/users/:id", userController.getUser);

    // DELETE   /api/users/:id
    server.del("/api/users/:id", userController.deleteUser);
        
    server.get("/api/users/:page/:pageSize", userController.getPagedUsers);
}

module.exports = { initialize }