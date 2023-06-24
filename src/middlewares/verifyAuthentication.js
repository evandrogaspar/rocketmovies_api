const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

//Função que vai verificar se o token do usuário existe.
function verifyAuthentication(request, response, next){
  const authHeader = request.headers.authorization;

  //verificar se a pessoa te um jwt
  if(!authHeader){
    throw new AppError("JWT não informado", 401)
  }
  
  //pegar simplesmente o token da requisação
  const [, token ] = authHeader.split(" ")

  try {
    //verificar se o jwt corresponde com o usuário.
    //O sub é o conteúdo do token que é apelidado por user_id
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id:Number(user_id),
    }

    return next()
  }catch {
    throw new AppError("jwt inválido", 401)
  }
}

module.exports = verifyAuthentication