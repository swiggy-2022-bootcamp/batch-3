import userController from "./user.controller";

export default [
  {
    path: "/user",
    method: "get",
    handler: [userController.fetchAll]
  },
  {
    path: "/user",
    method: "post",
    handler: [userController.create]
  },
  {
    path: "/user/loggeduser",
    method: "get",
    handler:[userController.getLoggedUser]
  },
  {
    path: "/login",
    method: "post",
    escapeAuth:true,
    handler:[userController.logIn]
  },
  // {
  //   path: "/logout",
  //   method: "post",
  //   escapeAuth: true,
  //   handler: [userController.logIn]
  // },
  {
    path: "/signup",
    method: "post",
    escapeAuth:true,
    handler:[userController.signUp]
  },
  {
    path: "/follower/:id",
    method: "post",
    handler:[userController.addFollower]
  },
  {
    path: "/following/:id",
    method: "post",
    handler:[userController.addFollowing]
  },
  {
    path: "/followrequest/:id",
    method: "post",
    handler:[userController.addFolowRequest]
  },
  {
    path: "/user/:id",
    method: "get",
    handler: [userController.fetch]
  },
  {
    path: "/user/:id",
    method: "patch",
    handler: [userController.update]
  }
];

