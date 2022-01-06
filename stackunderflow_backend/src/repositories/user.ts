import { getRepository } from "typeorm";
import { Users } from "../entities/user";

export const getUsers = async (): Promise<Array<Users>> => {
  console.log("Inside the user repository")
  const userRepository = getRepository(Users);
  return userRepository.find();
};
