const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
	try {
		const test = await Testimonial.find({});
		res.json(test);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const count = await Testimonial.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const test = await Testimonial.findOne().skip(rand);
		if (!test) res.status(404).json({ message: 'Not found' });
		else res.json(test);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getId = async (req, res) => {
	try {
		const test = await Testimonial.findById(req.params.id);
		if (!test) res.status(404).json({ message: 'Not found' });
		else res.json(test);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.postNew = async (req, res) => {
	try {
		const { id, author, text } = req.body;
		const test = new Testimonial({
			id: id,
			author: author,
			text: text,
		});
		await test.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.putId = async (req, res) => {
	const { id, author, text } = req.body;
	try {
		const test = await Testimonial.findById(req.params.id);
		if (test) {
			test.id = id;
			test.author = author;
			test.text = text;
			await test.save();
			res.json({ message: 'OK', document: test });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.delId = async (req, res) => {
	try {
		const test = await Testimonial.findById(req.params.id);
		if (test) {
			await test.deleteOne();
			res.json(test);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
