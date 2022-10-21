const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

router.post("/add", async (req, res, next) => {
  const { name, email, cell, age } = req.body;
  console.log(name, email, cell, age);

  const user = await User.findOne({ email: email });

  if (user) {
    return res.json({ msg: 0 });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      cell: cell,
      age: age,
      createdAt: Date.now(),
    });
    newUser
      .save()
      .then((data) => res.status(200).json({ msg: 1 }))
      .catch((err) => res.status(err));
  }
});

router.get("/", (req, res, next) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(err));
});

router.get("/:name", (req, res, next) => {
  User.find({ name: req.params.name })
    .then((data) => res.json(data))
    .catch((err) => res.status(err));
});

module.exports = router;
