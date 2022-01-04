import { User } from "./user.schema";
import { IUserModel } from "./user.schema";
import bcrypt from 'bcrypt';
import { HTTP401Error } from "../../lib/utils/httpErrors";

export class UserModel {

  private default = 'username email'
  public async fetchAll() {

    const data = User.find().select(this.default).lean();

    return data;
  }


  public async isUserExist(body: any) {
    if (body.email && body.password) {
      const user = await User.findOne({ email : body.email});
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
    try {
      if (body.password && body.email) {
        const IsUser = await this.isUserExist(body);
        if (IsUser && IsUser.alreadyExisted) {
          return {username :IsUser.user.username , alreadyExisted : IsUser.alreadyExisted};
        }
      }

      if (body.password) {
        body.password = await bcrypt.hash(body.password, 12);
      }
      const q: IUserModel = new User(body);
      const data: IUserModel = await q.addNewUser();
      return { username : data.username, alreadyExisted: false };
    } catch (e) {
      throw new HTTP401Error(e.errmsg);
    }
  };

  public async login(body: any) {
    if (body.email && body.password) {
      let IsUser = await this.isUserExist(body);
      if (IsUser && IsUser.alreadyExisted) {
        let u: IUserModel = await User.findOne({ email: body.email }).select('+password');
        let isCorrect = await u.correctPassword(body.password, u.password);
        if (isCorrect) {
          return { success: true };
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