import meetController from "./meet.controller";

export default [
    {
        path: "/meeting",
        method: "post",
        handler: [meetController.create],
    },
    {
        path: "/user/meetings",
        method: "get",
        handler: [meetController.fetchAll]
    },
    {
        path: "/user/meetings/:id",
        method: "get",
        handler: [meetController.fetchById]
    },
    {
        path: "/user/meetings/:id",
        method: "get",
        handler: [meetController.fetchById]
    },
    {
        path: "/user/meetings/:id",
        method: "delete",
        handler: [meetController.dropOff]
    }
];

