const express = require('express');
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);
router.get('/testimonials/random', TestimonialsController.getRandom);
router.get('/testimonials/:id', TestimonialsController.getId);
router.post('/testimonials', TestimonialsController.postNew);
router.put('/testimonials/:id', TestimonialsController.putId);
router.delete('/testimonials/:id', TestimonialsController.delId);

module.exports = router;
