const AppError = require("../utils/AppError")

const { hash } = require("bcryptjs")

class UserCreateService {
  constructor(userRepository){
    this.userRepository = userRepository;
  }


async execute({ name, email, password}){

  const verifyUserEmailExists = await this.userRepository.findByEmail(email)

  if(verifyUserEmailExists){
    throw new AppError("Este email está a ser utilizado")
  }

  const hashedPassword = await hash(password, 8)

  const userCreated = await this.userRepository.create({ name, email, password: hashedPassword})

  return userCreated;
}
}

module.exports = UserCreateService;

