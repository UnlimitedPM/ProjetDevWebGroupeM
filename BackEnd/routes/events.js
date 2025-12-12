const { Router } = require("express");
const EventController = require("../controllers/events");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");

const router = Router();

router.get("/events", EventController.cget);
router.post("/events", checkAuth, checkRole({ role: "ADMIN" }), EventController.create);
router.get("/events/:id", EventController.get);
router.patch(
  "/events/:id",
  checkAuth,
  checkRole({ role: "ADMIN" }),
  EventController.update
);
router.delete(
  "/events/:id",
  checkAuth,
  checkRole({ role: "ADMIN" }),
  EventController.delete
);

module.exports = router;
