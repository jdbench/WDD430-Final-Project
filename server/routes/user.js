const User = require("../models/user");
const { encrypt, decrypt } = require("../utils/crypto");
var express = require("express");
const jwt = require("jsonwebtoken");

var router = express.Router();

router.post("/", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        return res.status(404).json({
          message: "User does not exist",
        });
      if (decrypt(user.password) === req.body.password) {
        const username = user.username;
        const email = user.email;
        const token = jwt.sign(
          { user_id: user._id, email },
          "PIp0u90waeg:OSDJFOIWHEGHdsufh8whef809",
          {
            expiresIn: "2h",
          }
        );
        return res.status(201).json({
          message: "Retrieved user from database.",
          user: { _id: user.id, username, email, token },
        });
      } else {
        return res.status(403).json({
          status: 403,
          message: "Username or password were not correct",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "There was a problem",
        error: err,
      });
    });
});

router.post("/new", async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: encrypt(req.body.password),
  });

  const oldEmail = await User.findOne({ email: req.body.email });
  const oldUser = await User.findOne({ username: req.body.username });
  if (oldUser) {
    return res.status(403).json({
      message: "An account with that username already exists!",
      status: 403,
    });
  } else if (oldEmail) {
    return res.status(403).json({
      message: "An account with that email already exists!",
      status: 403,
    });
  } else {
    user
      .save()
      .then((createdUser) => {
        const username = createdUser.username;
        const email = createdUser.email;
        const token = jwt.sign(
          { user_id: createdUser._id, email },
          "PIp0u90waeg:OSDJFOIWHEGHdsufh8whef809",
          {
            expiresIn: "2h",
          }
        );
        return res.status(201).json({
          message: "user added successfully.",
          user: { _id: createdUser.id, username, email, token },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "There was a problem creating the user.",
          error: err,
        });
      });
  }
});

router.put("/update", (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = encrypt(req.body.password);

      user
        .updateOne({ id: req.params.id }, user)
        .then(() => {
          res.status(204).json({
            message: "user updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the user.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "user not found.",
        error: err,
      });
    });
});

router.delete("/delete/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      user
        .deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "user deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the user.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "user not found.",
        error: err,
      });
    });
});

module.exports = router;
