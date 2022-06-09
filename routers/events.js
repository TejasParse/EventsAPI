const express = require("express");
const router = express.Router();
const { getEventById, addEventPost, updateEventPut, deleteEventById } = require("../controllers/events");
const path = require("path");
const { upload } = require("../middlewares/middlewares");  


router.get("/events", getEventById);

router.post("/events", upload.any("files") ,addEventPost);

router.put("/events/:id", upload.any("files") ,updateEventPut);

router.delete("/events/:id", deleteEventById);


module.exports = router;