const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Visualizasions = require('./visualizationsModel');
const router = express.Router();

router.get('/', function (req, res) {
  Visualizasions.findAll()
    .then((visualizasions) => {
      res.status(200).json(visualizasions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Visualizasions.findById(id)
    .then((visualizasions) => {
      if (visualizasions) {
        res.status(200).json(visualizasions);
      } else {
        res.status(404).json({ error: 'VisualizasionsNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const visualizasions = req.body;
  if (visualizasions) {
    const id = visualizasions.id || 0;
    Visualizasions.findById(id)
      .then(
        Visualizasions.update(id, visualizasions)
          .then((updated) => {
            res.status(200).json({
              message: 'visualizasions created',
              visualizasions: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update visualizasions '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find visualizasions '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Visualizasions.findById(id).then((city) => {
      Visualizasions.remove(city.id).then(() => {
        res
          .status(200)
          .json({ message: `visualizasions '${id}' was deleted.`, city: city });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete visualizasions with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
