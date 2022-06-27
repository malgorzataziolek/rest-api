const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Seat.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getId = async (req, res) => {
	try {
		const se = await Seat.findById(req.params.id);
		if (!se) res.status(404).json({ message: 'Not found' });
		else res.json(se);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.postNew = async (req, res) => {
	try {
		const { id, day, seat, client, email } = req.body;
		const se = new Seat({
			id: id,
			day: day,
			seat: seat,
			client: client,
			email: email,
		});
		await se.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.putId = async (req, res) => {
	const { day, seat, client, email } = req.body;
	try {
		const se = await Seat.findById(req.params.id);
		if (se) {
			se.day = day;
			se.seat = seat;
			se.client = client;
			se.email = email;
			await se.save();
			res.json({ message: 'OK', document: se });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.delId = async (req, res) => {
	try {
		const se = await Seat.findById(req.params.id);
		if (se) {
			await se.deleteOne();
			res.json(se);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
