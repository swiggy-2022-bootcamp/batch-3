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
    handler: [teamController.fetchTeamMeets]
  },
  {
    path: "/team/leave/:id",
    method: "delete",
    handler: [teamController.leave]
  },
  {
    path: "/team",
    method: "get",
    handler: [teamController.fetchAll]
  },
  {
    path: "/team/member",
    method: "delete",
    handler: [teamController.removeFromTeam]
  }
];

