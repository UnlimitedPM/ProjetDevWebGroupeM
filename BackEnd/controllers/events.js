const Article = require("../models/articles");

module.exports = {
  cget: async (req, res, next) => {
    res.json(await Article.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await Article.create(req.body));
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.sendStatus(404);
    }
    res.json(article);
  },
  update: async (req, res, next) => {
    try {
      const [nbUdated, [updatedArticle]] = await Article.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        individualHooks: true,
      });
      if (nbUdated === 0) {
        return res.sendStatus(404);
      }
      res.json(updatedArticle);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    const nbDeleted = await Article.destroy({ where: { id: req.params.id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  },
};
