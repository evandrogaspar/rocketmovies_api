const path = require("path")

const multer = require("multer")
const crypto = require("crypto")

//Arquivo temporário
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
//Arquivo onde ficará permanentemente
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER = {
  //Onde mandar o arquivo
  storage: multer.diskStorage({
    destination:TMP_FOLDER,
    //configuração do nome do arquivo
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex")
      //Como estará estruturado o nome do arquivo
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
