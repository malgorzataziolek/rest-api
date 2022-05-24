const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
	res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
	const { day, seat, client, email } = req.body;
	const isTaken = db.seats.some(
		dbSeat => dbSeat.day === day && dbSeat.seat === seat
	);
	console.log(isTaken);

	if (!isTaken) {
		db.seats.push({ id: uuidv4(), day, seat, client, email });
	} else {
		res.status(200).json({
			message: 'added',
			data: db.seats,
		});
	}
});

router.route('/seats/:id').delete((req, res) => {
	const deletedSeats = db.seats.filter(item => item.id === req.params.id);
	const indexOfSeats = db.seats.indexOf(deletedSeats);
	db.seats.splice(indexOfSeats, 1);
	return res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
	const editedSeats = db.seats.filter(item => item.id === req.params.id);
	const indexOfSeats = db.seats.filter(item => item.id === req.params.id);
	const newSeats = {
		...editedSeats,
		day: req.body.day,
		seat: req.body.seat,
		client: req.body.client,
		email: req.body.email,
	};
	db.seats[indexOfSeats] = newSeats;
	return res.json({ message: 'OK' });
});

module.exports = router;
