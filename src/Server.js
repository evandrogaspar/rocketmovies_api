require("express-async-errors")

const express = require("express")

const migrationRun = require("./database/sqlite/migrations")

const routes = require("./routes")

const AppError = require("./utils/AppError")

//const uploadConfig = require("./configs/upload")

const app = express()

app.use(express.json())

app.use(routes)

//Para buscar arquivos estáticos no back-end
//app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


migrationRun()

app.use((error, request, response, next) => {
  if (error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message:error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})




const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))