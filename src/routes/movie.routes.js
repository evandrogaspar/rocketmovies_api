const { Router } = require("express")

const MovieController = require("../controllers/MovieController")

const movieRoutes = Router()

const movieController = new MovieController()

movieRoutes.post("/:user_id", movieController.create)

movieRoutes.get("/", movieController.index)

movieRoutes.get("/:id", movieController.show)

movieRoutes.delete("/:id", movieController.delete)



module.exports = movieRoutes