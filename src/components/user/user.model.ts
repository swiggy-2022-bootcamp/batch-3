import { User } from "./user.schema";
import { IUserModel } from "./user.schema";
import bcrypt from 'bcrypt';
import { HTTP401Error } from "../../lib/utils/httpErrors";
import jwt from 'jsonwebtoken';
import { commonConfig } from "../../config";

export class UserModel {

  private default = 'username email'
  public async fetchAll() {

    const data = User.find().select(this.default).lean();

    return data;
  }

  private signToken = (id: string) => {
    return jwt.sign({ id }, commonConfig.jwtSecretKey, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  public async isUserExist(body: any) {
    if (body.email && body.password) {
      const user = await User.findOne({ email: body.email });
      if (user) {
        return {
          user,
          alreadyExisted: true
        }
      }
    } else {
      return { alreadyExisted: false };
    }
  };

  public async add(body: IUserModel) {
    if (body.password && body.email && body.username) {
      const IsUser = await this.isUserExist(body);
      if (IsUser && IsUser.alreadyExisted) {
        ;
      }
    } else {
      throw new HTTP401Error('Provide email, username and password')
    }

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12);
    }
    const q: IUserModel = new User(body);
    const data: IUserModel = await q.addNewUser();
    return { username: data.username, alreadyExisted: false };
  };

  public async login(body: any) {
    if (body.email && body.password) {
      let IsUser = await this.isUserExist(body);
      if (IsUser && IsUser.alreadyExisted) {
        let u: IUserModel = await User.findOne({ email: body.email }).select('+password');
        let isCorrect = await u.correctPassword(body.password, u.password);
        const token = this.signToken(u._id);
        if (isCorrect) {
          return { success: true, id: u._id, token };
        } else {
          throw new HTTP401Error('Password Incorrect')
        }
      } else {
        throw new HTTP401Error('Email does not exist')
      }
    } else {
      throw new HTTP401Error('Email or Password Not Provided')
    }
  }
}

export default new UserModel();