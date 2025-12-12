const { Category } = require('../models');

module.exports = {
  // GET /categories
  cget: async (req, res, next) => {
    try {
      res.json(await Category.findAll());
    } catch (error) {
      next(error);
    }
  },
  // On ajoutera create, get, update, delete plus tard
};
