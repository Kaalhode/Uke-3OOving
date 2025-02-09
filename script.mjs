import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import {poem, quotes, getRandomQuote} from './modules/poetry.mjs'
import {decks, incrementDeckCounter, deckCounter,createDeck} from './modules/decks.mjs'

const server = express();
const port = (process.env.PORT || 8000);


server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

server.get('/tmp/poem', (req, res) => {
    res.send(poem);
})

server.get('/tmp/quote', (req, res) => {
    getRandomQuote(quotes);
    let randomquote = getRandomQuote(quotes);
    res.send(randomquote);
})

server.post('/tmp/sum/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    const sum = a + b;
    res.send(sum.toString());
})

server.get("/", getRoot);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});

server.post('/temp/deck', (req, res) => {
    const deckId = incrementDeckCounter();
    decks[deckId] = createDeck();
    res.send({ deck_id: deckId });
});

server.patch('/temp/deck/shuffle/:deck_id', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId]) {
        decks[deckId] = decks[deckId].sort(() => Math.random() - 0.5);
        res.send({ status: 'shuffled', deck_id: deckId });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send({ error: 'Deck not found' });
    }
});
server.get('/temp/deck/:deck_id', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId]) {
        res.send(decks[deckId]);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send({ error: 'Deck not found' });
    }
});

server.get('/temp/deck/:deck_id/card', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId] && decks[deckId].length > 0) {
        const card = decks[deckId].splice(Math.floor(Math.random() * decks[deckId].length), 1)[0];
        res.send(card);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send({ error: 'Deck not found or empty' });
    }
});

server.use(express.json());
server.use(express.static('public'));
const savedsessionpath = require(__dirname,'modules','sessions.json');

function createSessionId(){
    return Math.random(36).toString.substr(2,18);
}