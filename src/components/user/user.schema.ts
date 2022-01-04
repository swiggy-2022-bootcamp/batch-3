import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'

export interface IUserModel extends IUser,Document {
  addNewUser(): any;
  correctPassword(pass1:string,pass2:string):boolean;
}

export const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      sparse:true,
      required: true
    },
    password: {
      type: String,
      select: false,
      sparse:true
    },
    email: {
      type: String,
      minlength: 3,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.addNewUser = async function () {
     return this.save();
}


UserSchema.methods.correctPassword = async function (candidatePassword:string, userPassword:string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);