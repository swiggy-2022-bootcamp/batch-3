import userController from "./user.controller";

export default [
  {
    path: "/user",
    method: "post",
    handler: [userController.create],
    escapeAuth:true
  },
  {
    path: "/login",
    method: "post",
    handler: [userController.login],
    escapeAuth:true
  }
];

