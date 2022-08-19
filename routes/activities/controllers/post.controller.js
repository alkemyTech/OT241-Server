let { body } = require("express-validator");
const { createActivity } = require("../../../controllers/activitiesControllers");

const postActivity = [
  body("name", "Ingrese un nombre").exists().notEmpty(),
  body("content", "Ingrese un contenido válido").exists().notEmpty(),
  createActivity,
];

module.exports = { postActivity };
