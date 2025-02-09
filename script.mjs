import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import path from 'path';
import {writeFileSync} from 'fs';
import {poem, quotes, getRandomQuote} from './modules/poetry.mjs'
import {decks, incrementDeckCounter, deckCounter,createDeck} from './modules/decks.mjs'
import {__filename,__dirname,savedsessionpath, createSessionId, readSessionData} from './modules/session.mjs'

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

server.use((req, res, next) => {
    let sessionId = req.headers['session-id'];
    if (!sessionId) {
        sessionId = createSessionId();
        res.setHeader('Set-Session-Id', sessionId);
    }

    let sessionData = readSessionData();

    let session = sessionData[sessionId];

    if (!session) {
        session = { sessionId, views: 0 };
        sessionData[sessionId] = session;
    }

    req.session = session;

    next();
});

server.get('/views', (req, res) => {
    req.session.views++;
    let sessionData = readSessionData();

    sessionData[req.session.sessionId] = req.session;
    writeFileSync(savedsessionpath, JSON.stringify(sessionData, null, 2), 'utf-8');

    res.json({ views: req.session.views });
});

server.get('/reset', (req, res) => {
    let sessionData = readSessionData();
    delete sessionData[req.headers['session-id']];
    writeFileSync(savedsessionpath, JSON.stringify(sessionData, null, 2), 'utf-8');

    res.send('session reset');
});