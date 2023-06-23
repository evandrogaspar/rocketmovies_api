const { Router } = require("express")

const usersRouter = require("./users.routes")
const movieRouter = require("./movie.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/movienotes", movieRouter)
routes.use("/tags", tagsRouter)



module.exports = routes