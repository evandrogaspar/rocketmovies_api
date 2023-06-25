const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UserControllers")

const AvatarController = require("../controllers/AvatarController")

const verifyAuthentication = require("../middlewares/verifyAuthentication")

const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const avatarController = new AvatarController()

usersRoutes.post("/", usersController.create)

usersRoutes.put("/", verifyAuthentication, usersController.update)

usersRoutes.patch("/avatar", verifyAuthentication, upload.single("avatar"), avatarController.update)


module.exports = usersRoutes