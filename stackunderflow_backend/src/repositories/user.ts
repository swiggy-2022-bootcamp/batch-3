import { getRepository } from "typeorm";
import { Users } from "../entities/user";

export const getUsers = async (): Promise<Array<Users>> => {
  const userRepository = getRepository(Users);
  return userRepository.find();
};

export const findUserByPk = async (pk: number) :Promise<Users> => {
  const userRepository = getRepository(Users);
  return await userRepository.findOne({
    where: {pk: pk}
  });
} 

export const findUserByUsername = async (name :String) :Promise<Users> => {
  const userRepository = getRepository(Users);
  return await userRepository.findOne({
    where: {username: name}
  });
} 

export const createUser = async (registrationName :string, username :string, hashedPassword :string) => {
  const userRepository = getRepository(Users);
  await userRepository.insert({username: username, registrationName: registrationName, password: hashedPassword});
}

export const updateUser = async (pk: number, registrationName :String, username :String, hashedPassword :String, reputation: number) => {
  const userRepository = getRepository(Users);
  await userRepository.save({
    pk: pk,
    username: username,
    registrationName: registrationName,
    password: hashedPassword,
    reputation: reputation
  });
}
