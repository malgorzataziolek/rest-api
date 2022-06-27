const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);
router.get('/seats/:id', SeatsController.getId);
router.post('/seats', SeatsController.postNew);
router.put('/seats/:id', SeatsController.putId);
router.delete('/seats/:id', SeatsController.delId);

module.exports = router;
