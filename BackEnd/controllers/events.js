const { Event, User, Category, Venue } = require("../models");

module.exports = {
  cget: async (req, res, next) => {
    try {
      const events = await Event.findAll({
        include: [
          { model: User, as: 'creator', attributes: ['name'] },
          { model: Category, as: 'category' },
          { model: Venue, as: 'venue' },
        ]
      });
      res.json(events);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const eventData = { ...req.body, creatorId: req.user.id };
      res.status(201).json(await Event.create(eventData));
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
        const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.sendStatus(404);
    }
    res.json(event);
  },
  update: async (req, res, next) => {
    try {
      const [nbUdated, [updatedEvent]] = await Event.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        individualHooks: true,
      });
      if (nbUdated === 0) {
        return res.sendStatus(404);
      }
      res.json(updatedEvent);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    const nbDeleted = await Event.destroy({ where: { id: req.params.id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  },
};
