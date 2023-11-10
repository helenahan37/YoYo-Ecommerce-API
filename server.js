const app = require('./app/app.js');
const http = require('http');

//create a server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
//listen server
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
