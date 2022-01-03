// import { Interface } from "readline";

export interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: string;
    phone: string;
    facebookId:string;
    otp: number;
    isVerified: boolean;
    dateOfBirth: Date;
    followers: Array<string>;
    following: Array<string>;
}