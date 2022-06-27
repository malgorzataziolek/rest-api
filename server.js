const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');

const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testimonialsRouter = require('./routes/testimonials.routes.js');
const concertsRouter = require('./routes/concerts.routes.js');
const seatsRouter = require('./routes/seats.routes.js');

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', testimonialsRouter);
app.use('/api/', concertsRouter);
app.use('/api/', seatsRouter);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send('404 not found...');
});

const io = socketIo(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});
io.on('connection', socket => {
	console.log('New socket!');
	socket.on('disconnect', reason => {
		console.log(reason);
	});
});

mongoClient.connect('mongodb://localhost:27017/NewWaveDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

server.listen(PORT, err => {
	if (err) console.log(err);
	console.log('Server running on Port', PORT);
});
