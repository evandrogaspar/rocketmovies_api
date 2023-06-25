const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../Providers/DiskStorage")


class AvatarController {
  async update(request, response){
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    //verificar a existência do usuário
    if(!user){
      throw new AppError("Somente usuários autenticados podem alterar o avatar", 401)
    }

    //caso exista um avatar no perfil, apagar.
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

    //salvar o avatar
    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    //Actualização do avatar do user na base de dados
    await knex("users").update(user).where({ id : user_id})

    return response.json(user)
  }
}

module.exports = AvatarController;