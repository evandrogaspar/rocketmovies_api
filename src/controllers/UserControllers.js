const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

const { hash, compare } = require("bcryptjs")

const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")


class UsersController {
  async create(request, response){
    const { name, email, password } = request.body

   const userRepository = new UserRepository()
   const userCreateService = new UserCreateService(userRepository)

   await userCreateService.execute({ name, email, password})

    return response.status(201).json()
  }

  async update(request, response){
    const { name, email, password, old_password } = request.body
/*     const { id } = request.params */
    const user_id = request.user.id

    const database = await sqliteConnection()
    
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user){
      throw new AppError("Usuário não encontrado.")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este email já está em uso")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError("Informe a senha antiga para definir a senha nova")
    }

    if(password && old_password){
      const verifyOldPassword = await compare(old_password, user.password)

      if(!verifyOldPassword){
        throw new AppError("A senha antiga não condiz com a digitada.")
      }

      user.password = await hash(password, 8)
    }


    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id])

    return response.json()
  }
}


module.exports = UsersController