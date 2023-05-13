const { Router } = require("express")

const usersRouter = require("./users.routes")
const movieRouter = require("./movie.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movienotes", movieRouter)


module.exports = routes