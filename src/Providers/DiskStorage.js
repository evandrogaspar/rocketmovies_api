const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage{
  async saveFile(file){
    //mudar o avatar do arquivo temporário para o permanente
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file

  }

  async deleteFile(file){
    //Buscar pelo arquivo na pasta de upload
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      //retornar o estado do arquivo, para verificar se existe mesmo ou não usando o metódo stat.
      await fs.promises.stat(filePath)
    }catch {
      return
    }

    //deletar o arquivo usando o metódo unlink
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage;