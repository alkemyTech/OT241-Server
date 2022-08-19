const { Router } = require("express");
const { postActivity } = require("./controllers/post.controller");
const {
  getActivities,
  updateActivity,
  deleteActivity,
  findActivityById,
} = require("../../controllers/activitiesControllers");

const activitiesRouter = Router();

activitiesRouter.route("/").get(getActivities).post(postActivity);
activitiesRouter.route("/:id").put(updateActivity).delete(deleteActivity).get(findActivityById);

module.exports = activitiesRouter;
