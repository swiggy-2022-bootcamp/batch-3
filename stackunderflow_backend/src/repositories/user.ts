import { getRepository } from "typeorm";
import { Users } from "../entities/user";

export const getUsers = async (): Promise<Array<Users>> => {
  console.log("Inside the user repository")
  const userRepository = getRepository(Users);
  return userRepository.find();
};

export const findUserByUsername = async (name :String) :Promise<Users> => {
  console.log("Inside find user by username")
  const userRepository = getRepository(Users);
  console.log(name);
  return await userRepository.findOne({
    where: {username: name}});
} 

export const createUser = async (registrationName :string, username :string, hashedPassword :string) => {
  const userRepository = getRepository(Users);
  await userRepository.insert({username: username, registrationName: registrationName, password: hashedPassword});
}
