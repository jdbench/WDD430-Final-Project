const Event = require("../models/event");
var express = require("express");

var router = express.Router();

router.get("/", (req, res, next) => {
  Event.find()
    .then((event) => {
      res.status(200).json({
        message: "Retrieved events from database.",
        event: event,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving events from the database.",
        error: err,
      });
    });
});

router.post("/event/new", (req, res, next) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });
  event
    .save()
    .then((createdEvent) => {
      res.status(201).json({
        message: "event added successfully.",
        event: createdEvent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the event.",
        error: err,
      });
    });
});

router.put("/event/update", (req, res, next) => {
  Event.findOne({ id: req.params.id })
    .then((Event) => {
      Event.name = req.body.name;
      Event.description = req.body.description;
      Event.url = req.body.url;

      Event.updateOne({ id: req.params.id }, Event)
        .then(() => {
          res.status(204).json({
            message: "event updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the event.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "event not found.",
        error: err,
      });
    });
});

router.delete("/event/delete", (req, res, next) => {
  Event.findOne({ id: req.params.id })
    .then(() => {
      Event.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "event deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the event.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "event not found.",
        error: err,
      });
    });
});

module.exports = router;