const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain')
const P2pServer = require('./p2p_server');

const HTTP_PORT = process.env.HTTP_PORT;

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


app.listen(HTTP_PORT, () => { console.log(`Blockchain server listening on port ${HTTP_PORT}`) });

p2pServer.listen();
