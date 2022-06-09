const express = require("express");
const router = express.Router();
const { getEventById, addEventPost, addEventPut, deleteEventById } = require("../controllers/events");
const path = require("path");
const { upload } = require("../middlewares/middlewares");  


router.get("/events", getEventById);

router.post("/events", upload.any("files") ,addEventPost);

router.put("/events", addEventPut);

router.delete("/events/:id", deleteEventById);


module.exports = router;