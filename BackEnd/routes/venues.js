const { Router } = require("express");
const VenueController = require("../controllers/venues");
const checkAuth = require('../middlewares/checkAuth');

const router = Router();

// Tout le monde peut lister les lieux
router.get("/venues", checkAuth, VenueController.cget);
// On ajoutera les routes create, update, delete protégées pour les admins plus tard

module.exports = router;
