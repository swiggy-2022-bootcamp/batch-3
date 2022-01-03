import { Document, Model, model, Schema } from "mongoose";
import { NextFunction } from "express";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'

export interface IUserModel extends IUser,Document {
  addNewUser(): any;
  correctPassword(pass1:string,pass2:string):boolean;
}

export const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      required: true
    },
    lastName: {
      type: String,
      minlength: 2,
      required: true
    },
    username: {
      type: String,
      unique: true,
      sparse:true
      //required: true,
    },
    password: {
      type: String,
      select: false,
      unique: true,
      sparse:true
    },
    email: {
      type: String,
      minlength: 3,
    },
    dateOfBirth: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true
    },
    facebookId: {
      type:String
    },
    phone: {
      type:String
    },
    otp: Number,
    isVerified: {
      type: Boolean,
      default:false
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