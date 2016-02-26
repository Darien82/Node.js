'use strict'
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
	'.htm': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.gif': 'image/jpeg',
	'.png': 'image/png',
}
function webserver(req, res) {

	let baseURI = url.parse(req.url);
	let filepath = __dirname + (baseURI.pathname === '/' ? 'index.htm' : baseURI.pathname);
	
	fs.access(filepath, fs.F_0K, error => {
		if(!error) {
			fs.readFile(filepath, (error, content) => {
				if(!error) {
					console.log('Serving: ', filepath);
				let contentType = mimes[path.extname(filepath)];
				res.writeHead(200, {'Content-type': contentType});
				res.end(content, 'utf-8');
		} else {
					res.writeHead(500);
					res.end('The server could nor read file requested');
		}
	});
		} else {
			res.writeHead(404);
			res.end('Content not found!');
		}		
	});
}

http.createServer(webserver).listen(3000, () => {
	console.log('Webserver running on port 3000');
});