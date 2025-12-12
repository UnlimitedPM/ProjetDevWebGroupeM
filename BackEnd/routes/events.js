const { Router } = require("express");
const EventController = require("../controllers/events");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");

const router = Router();

router.get("/events", EventController.cget);
router.post(
  "/events",
  checkAuth,
  checkRole({ role: "ADMIN" }),
  EventController.create
);
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

// Registration routes
router.post("/events/:id/register", checkAuth, EventController.register);
router.delete("/events/:id/register", checkAuth, EventController.unregister);
router.get(
  "/events/:id/participants",
  checkAuth,
  EventController.getParticipants
);
router.get(
  "/events/:id/check-registration",
  checkAuth,
  EventController.checkRegistration
);

module.exports = router;
