const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Concert.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getId = async (req, res) => {
	try {
		const con = await Concert.findById(req.params.id);
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.postNew = async (req, res) => {
	try {
		const { id, performer, genre, price, day, image } = req.body;
		const con = new Concert({
			id: uuidv4(),
			performer: req.body.performer,
			genre: req.body.genre,
			price: req.body.price,
			day: req.body.day,
			image: req.body.image,
		});
		await con.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.putById = async (req, res) => {
	const { id, performer, genre, price, day, image } = req.body;
	try {
		const con = await Concert.findById(req.params.id);
		if (con) {
			con.id = id;
			con.performer = performer;
			con.genre = genre;
			con.price = price;
			con.day = day;
			con.image = image;
			await con.save();
			res.json({ message: 'OK', document: con });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.delId = async (req, res) => {
	try {
		const con = await Concert.findById(req.params.id);
		if (con) {
			await con.deleteOne();
			res.json(con);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
