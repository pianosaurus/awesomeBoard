module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.emit('news', {
			hello: 'world'
		});

		socket.on('my other event', function (data) {
			console.log(data);
		});

		socket.on('get user', function (respond) {
			respond('test user data');
		});
	});
};
