const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain')
const P2pServer = require('./p2p_server');

const HTTP_PORT = process.env.HTTP_PORT;
const HOST = 'localhost';

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
});

app.post('/new_mine', (req, res) => {
	p2pServer.syncChains();
});

//
// var sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
// }, app);

const options = {
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
};

const sslServer = https.createServer(options);


//sslServer.listen((HTTP_PORT, HOST, () => console.log(`Secure Blockchain server on port ${HTTP_PORT}`)));

sslServer.listen(HTTP_PORT, HOST, function(err) {
    if (err) return console.log(err);
    console.log("Listening at http://%s:%s", HOST, HTTP_PORT);
});

//app.listen(HTTP_PORT, () => { console.log(`Blockchain server listening on port ${HTTP_PORT}`) });

p2pServer.listen();
