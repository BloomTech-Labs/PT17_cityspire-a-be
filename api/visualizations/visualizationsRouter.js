const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Visualizations = require('./visualizationsModel.js');
const router = express.Router();

router.get('/', function (req, res) {
  Visualizations.findAll()
    .then((visualizations) => {
      res.status(200).json(visualizations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Visualizations.findById(id)
    .then((visualizations) => {
      if (visualizations) {
        res.status(200).json(visualizations);
      } else {
        res.status(404).json({ error: 'VisualizationsNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const visualizations = req.body;
  if (visualizations) {
    const id = visualizations.id || 0;
    Visualizations.findById(id)
      .then(
        Visualizations.update(id, visualizations)
          .then((updated) => {
            res.status(200).json({
              message: 'visualizations created',
              visualizasions: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update visualizations '${id}'`,
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
    Visualizations.findById(id).then((city) => {
      Visualizations.remove(city.id).then(() => {
        res
          .status(200)
          .json({ message: `visualizations '${id}' was deleted.`, city: city });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete visualizations with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
