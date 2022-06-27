const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);
router.get('/concerts/:id', ConcertsController.getId);
router.post('/concerts', ConcertsController.postNew);
router.put('/concerts/:id', ConcertsController.putById);
router.delete('/concerts/:id', ConcertsController.delId);

module.exports = router;
