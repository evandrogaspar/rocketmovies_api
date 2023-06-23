const knex = require("../database/knex")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const AppError = require("../utils/AppError")
const { sign } = require("jsonwebtoken")

class SessionsController{
  async create(request, response){
    const { email, password } = request.body;

    //Validação do email
    const user = await knex("users").where({ email }).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorrecto(a)", 401)
    }

    //Validação da senha
    const passwordVerification = await compare(password, user.password)

    if(!passwordVerification){
      throw new AppError("E-mail e/ou senha incorrecto(a)", 401)
    }

    //Criação do token do usuário, onde é passado o id.
    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController