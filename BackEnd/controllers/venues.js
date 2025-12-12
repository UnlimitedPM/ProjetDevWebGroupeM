const { Venue } = require('../models');

module.exports = {
  // GET /venues
  cget: async (req, res, next) => {
    try {
      res.json(await Venue.findAll());
    } catch (error) {
      next(error);
    }
  },
  // On ajoutera create, get, update, delete plus tard
};
