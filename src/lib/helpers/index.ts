import {HTTP400Error} from '../utils/httpErrors';
import jwt from 'jsonwebtoken';
import {commonConfig} from '../../config';
/* All common helpers will come here */

/**
 * 4 digit otp generator.
 */
export const otpGenerator = (): number => Math.floor(1000 + Math.random() * 9000);

/**
 * **Crete new token**
 * ? This will create new jwt token for users every time.
 * @param user user Information here
 */
export const generateToken = async (user: any) => jwt.sign({user}, commonConfig.jwtSecretKey);


/**
 * This will convert valid timestamp into h:m AM/PM date MonthName
 * ? for example::  10:47 PM 26 May
 * @param time Timestamp
 */
// export const postTime = (time: string)=>{
//   const monthArr: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const hrs = new Date(time).getHours();
//   return `${hrs > 12? hrs-12 : hrs}:${new Date(time).getMinutes()} ${hrs > 12 ? "PM" : "AM"}, ${new Date(time).getDate()} ${monthArr[ new Date(time).getMonth()]}`;
// }

export const takeYMD = (time: string) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${checkTime(date.getMonth() + 1)}-${checkTime(date.getDate())}`;
};


const checkTime = (data: number) => {
  return data > 9 ? data : `0${data}`;
};


export const getTime = (date: string) => {
  return new Date(date).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};

export const getNextDate = (day: number = 2) => {
  return new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000);
};

export const isValidMongoId = (str: string) => {
  return str.match(/^[a-f\d]{24}$/i);
};

export const pruneFields = (body: any, fields: string) => {
  const fieldsArray = fields.split(' ');
  fieldsArray.forEach(field => {
    delete body[field];
  });
};
