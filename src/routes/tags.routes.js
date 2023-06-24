const { Router } = require("express")

const TagsController = require("../controllers/TagsController")

const verifyAuthentication = require("../middlewares/verifyAuthentication")

tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get("/",verifyAuthentication, tagsController.index)

module.exports =  tagsRoutes