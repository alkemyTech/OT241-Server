const { activities } = require("../models");
let { body, validationResult } = require("express-validator");

const getActivities = async (req, res) => {
  try {
    const allActivities = await activities.findAll();
    return res.status(200).json(allActivities);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, content } = req.body;
    let myActivity = await activities.create({
      name: name,
      content: content,
    });

    if (!myActivity) {
      const error = "There is been an error creating the activity";
      throw error;
    }

    return res.status(200).json(myActivity);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await activities.findByPk(id);

    if (!exists) {
      const error = "There is not an entry with that ID";
      throw new Error(error);
    }

    const update = await activities.update(
      { ...req.body },
      {
        where: {
          id: id,
        },
      }
    );

    if (update) {
      const updatedActivity = await activities.findByPk(id);
      return res.status(200).json(updatedActivity);
    } else {
      const error = "Error: Activity could not be updated";
      throw new Error(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await activities.destroy({
      where: {
        id: id,
      },
    });
    if (deleted) {
      return res.status(200).json({ deleted: deleted });
    } else {
      const error = "There's not a activity with the specified ID";
      throw new Error(error);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const findActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await activities.findByPk(id);
    if (activity) {
      return res.status(200).json(activity);
    } else {
      const error = "There is not an activity with that ID";
      throw new Error(error);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createActivity,
  updateActivity,
  findActivityById,
  getActivities,
  deleteActivity,
};
