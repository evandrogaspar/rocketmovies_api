const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("User", () => { 
  let userRepositoryInMemory = null
  let userCreateService = null
  
  beforeEach(() => {
     userRepositoryInMemory = new UserRepositoryInMemory()
     userCreateService = new UserCreateService(userRepositoryInMemory)
  })
  
  it("user should be create", async () => {
    const user = {
      name:" User test",
      email:"user@test.com",
      password:"1234"
    }
  
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be created with exists email", () => {
    const user1 = {
      name:"User Test 1",
      email: "user@test.com",
      password: "123",
    }

    const user2 = {
      name:"User Test 2",
      email: "user@test.com",
      password: "456",
    }

   userCreateService.execute(user1)

    expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email está a ser utilizado"))
  })
})
