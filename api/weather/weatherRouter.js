const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Weather = require('./weatherModel');
const router = express.Router();

router.get('/', function (req, res) {
  Weather.findAll()
    .then((weather) => {
      res.status(200).json(weather);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Weather.findById(id)
    .then((weather) => {
      if (weather) {
        res.status(200).json(weather);
      } else {
        res.status(404).json({ error: 'WeatherNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const weather = req.body;
  if (weather) {
    const id = weather.id || 0;
    Weather.findById(id)
      .then(
        Weather.update(id, weather)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'weather added', weather: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update weather '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find weather '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Weather.findById(id).then((city) => {
      Weather.remove(city.id).then(() => {
        res
          .status(200)
          .json({ message: `Weather '${id}' was deleted.`, city: city });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete weather with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
