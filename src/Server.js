require("express-async-errors")

const express = require("express")

const migrationRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")

const app = express()

app.use(express.json())


migrationRun()









const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))