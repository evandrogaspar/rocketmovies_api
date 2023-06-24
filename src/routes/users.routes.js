const { Router } = require("express")

const UsersController = require("../controllers/UserControllers")

const verifyAuthentication = require("../middlewares/verifyAuthentication")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)

usersRoutes.put("/", verifyAuthentication, usersController.update)


module.exports = usersRoutes