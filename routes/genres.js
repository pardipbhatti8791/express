const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const {Genre, validateGenre} = require('../model/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/**
 * @ { Getting genre }
 */
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

/**
 * @ { Posting data }
 */
router.post("/", auth, async (req, res) => {

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });

  try {
    genre = await genre.save();
    res.send(genre);
  } catch (error) {
    console.log(error.message);
  }
});

/**
 * @ { update genre }
 */
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true
      }
    );

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @ { delete post }
 */
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

/**
 * @ { Single genre }
 */
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
