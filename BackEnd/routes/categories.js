const { Router } = require("express");
const CategoryController = require("../controllers/categories");
const checkAuth = require('../middlewares/checkAuth');

const router = Router();

// Tout le monde peut lister les catégories
router.get("/categories", checkAuth, CategoryController.cget);
// On ajoutera les routes create, update, delete protégées pour les admins plus tard

module.exports = router;
