import teamController from "./team.controller";

export default [
  {
    path: "/team",
    method: "post",
    handler: [teamController.create]
  },
  {
    path: "/team/meeting/:id",
    method: "post",
    handler: [teamController.createMeeting]
  },
  {
    path: "/team/meetings/:id",
    method: "get",
    handler: [teamController.fetchAll]
  },
  {
    path: "/team/leave/:id",
    method: "delete",
    handler: [teamController.leave]
  }
];

