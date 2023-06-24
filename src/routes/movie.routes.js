const { Router } = require("express")

const MovieController = require("../controllers/MovieController")

const verifyAuthentication = require("../middlewares/verifyAuthentication")

const movieRoutes = Router()

const movieController = new MovieController()

movieRoutes.use(verifyAuthentication)

movieRoutes.post("/", movieController.create)

movieRoutes.get("/", movieController.index)

movieRoutes.get("/:id", movieController.show)

movieRoutes.delete("/:id", movieController.delete)



module.exports = movieRoutes