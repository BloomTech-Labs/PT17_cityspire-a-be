const express = require('express');
const authRequired = require('../middleware/authRequired');
const Zillow = require('./zillowModel');
const router = express.Router();

router.post('/', authRequired, (req, res) => {
  const rentInfo = req.body;
  Zillow.add(rentInfo)
    .then((rent) => {
      res.status(201).json(rent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the rental to the database: ',
        err,
      });
    });
});

router.get('/', function (req, res) {
  Zillow.findAll()
    .then((zillow) => {
      res.status(200).json(zillow);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Zillow.findById(id)
    .then((zillow) => {
      if (zillow) {
        res.status(200).json(zillow);
      } else {
        res.status(404).json({ error: 'BuildingsNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const zillow = req.body;
  if (zillow) {
    const id = zillow.id || 0;
    Zillow.findById(id)
      .then(
        Zillow.update(id, zillow)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'zillow created', city: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update zillow '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find zillow '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Zillow.findById(id).then((zillow) => {
      Zillow.remove(zillow.id).then(() => {
        res
          .status(200)
          .json({ message: `zillow '${id}' was deleted.`, zillow: zillow });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete zillow with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
