import {generateToken, isValidMongoId, otpGenerator} from "../../lib/helpers";
import { User, UserSchema } from "./user.schema";
import { IUserModel } from "./user.schema";
import bcrypt from 'bcrypt';
import { HTTP400Error, HTTP401Error } from "../../lib/utils/httpErrors";

export class UserModel {
    public async fetchAll() {
        
        const data = User.find();

        return data;
    }

    public async fetch(id:string) {
      const data = User.findById(id);
      return data;
    }

    public async update(id:string, body:IUserModel) {
        const data = await User.findByIdAndUpdate(id, body, {
            runValidators:true,
            new:true
        })

        return data;
    }

  public async delete(id: string) {
    await User.deleteOne({ _id: id });
  }

    public async add(body: IUserModel) {
        try {
            console.log(body);
            if (body.password && body.username) {
                const IsUser = await this.isUserExist(body);
                console.log(IsUser);
                if (IsUser && IsUser.alreadyExisted) {
                    return IsUser;
                }
            }
            
            body.role = 'user';
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 12);
            }
            const q: IUserModel = new User(body);
            console.log("hiii",q);
            const data: IUserModel = await q.addNewUser();
            console.log(data);
            return { data, alreadyExisted: false };
        } catch (e) {
            throw new Error(e);
        }
    };

    public async isUserExist(body: any) {
        console.log("In here");
        if (body.username && body.password) {
            const user = await User.findOne({ username: body.username });
            if (user) {
                return {
                    user,
                    alreadyExisted: true
                }
            }
        }else
        {
            return {alreadyExisted:false};
        }
    };

    public async authenticateWithAccesToken(data: any) {
      try {
          //, { appleSub: data.id }
          let userInfo = await User.findOne({ $or: [{email:data.email},{ facebookId: data.id }] });
            console.log('User At Social Auth :', userInfo);
          if (userInfo) {
              console.log(userInfo,"User info here");
                // let token = await this.addNewToken(userInfo._id, userInfo);
                return { ...userInfo, isExisted: true };
            }
            else {
                return { ...data, isExisted: false };
            }
        } catch (e) {
            throw new Error(e);
        }
    }


  public async addFollower(id: string, userId: string) {
    
    const data = User.findOneAndUpdate({ id: userId }, {
        $push:{ "followers":id }
    })

    return data;
  };

  public async addFollowing(id: string, userId: string) {
    const data = User.findOneAndUpdate({ _id: userId }, {
      $push:{"following":id}
    })

    return data;
  };

  public async login(body: any) {
    const { username, password } = body;
      // 1>  check email and password exist
      if (!username || !password) {
        throw new Error("email or password does not exist");
      }
      // 2> check if user exist and password is correct
    const user = await User.findOne({ username: username }).select('+password');
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new HTTP401Error("username or password is incorrect");
    }
    
    return user;
  };

  public async addFollowRequest(id: string,userId:string) {
    const data = User.findOneAndUpdate({ id: userId }, {
      $push:{"followRequest":id}
    })

    return data;
  };

  public async acceptFollowRequest(id: string, userId: string) {
    const data = await User.findOneAndUpdate({ id: userId }, {
      $pull: { "followRequest": id }
    });

    if (data) {
      await User.findOneAndUpdate({ id: userId }, {
        $push:{"followRequest":id}
      })

      await User.findOneAndUpdate({ id }, {
        $push: { "following": userId }
      });
    }

    return data;
  };

  public async verifyUser(otp: string,id:string) {
    const user = await User.findById(id);

    if (user.otp && (user.otp.toString() == otp.toString())) {
      return { proceed: true };
    }

    return { proceed: false };
  }

  public async isUserVerified(id: string) {
    const user = await User.findById(id);

    if (user.isVerified) {
      return { proceed: true,phone:user.phone };
    }

    return { proceed: false };
  };
}

export default new UserModel();