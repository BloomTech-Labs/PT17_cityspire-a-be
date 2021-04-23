const express = require('express');
const authRequired = require('../middleware/authRequired');
const Schools = require('./schoolsModel');
const router = express.Router();

router.post('/', authRequired, (req, res) => {
  const schoolInfo = req.body;
  Schools.add(schoolInfo)
    .then((school) => {
      res.status(201).json(school);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the school to the database: ',
        err,
      });
    });
});

router.get('/', function (req, res) {
  Schools.findAll()
    .then((schools) => {
      res.status(200).json(schools);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Schools.findById(id)
    .then((school) => {
      if (school) {
        res.status(200).json(school);
      } else {
        res.status(404).json({ error: 'SchoolNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const school = req.body;
  if (school) {
    const id = school.id || 0;
    Schools.findById(id)
      .then(
        Schools.update(id, school)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'School added', school: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update school '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find school '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Schools.findById(id).then((school) => {
      Schools.remove(school.id).then(() => {
        res
          .status(200)
          .json({ message: `School '${id}' was deleted.`, school: school });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete school with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
