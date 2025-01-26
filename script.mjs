import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

const poem = "Ensom Alene i stillhet, går vi hver vår vei<br> Ensomheten fyller oss Glede er noe vi ikke kjenner til.<br> Men vi vet noe i livet. Sannheten.<br> Snart vil folk forstå.<br> Enn så lenge, gjør vi som vi gjør.<br> Vi vet da, hva som skjer i morgen.<br> I morgen møter vi verden med vår ensomhet.<br> Dikt skrevet av Snowder (ris og ros) fra dikt.org";

const quotes = [
    "A thought about yourself is an opinion, not a fact.<br> You are good enough, and you deserve to be happy.",
    "Because i have this movie, I'll get to see you every time i watch it.<br>No matter how many times I forget you...<br> I'll remember you again and again.",
    "...the way it blurred the line between fact and fiction, for me, that was a good puzzle.",
    "I won't regret it one bit! I can't! Because I know that what I did was definitely not wrong!",
    "Im a idiot.<br> Im even bad at being depressed",
    "I say I have no reason to win, but why is it so painful when I lose?<br> I am so half-hearted about everything"
]

function getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

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

const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]

const ranks = ["Ace", "2", "3", "4", "5","6","7","8","9","10","Jack","Queen","King"]

let decks = []
let deckcounter = 0;

function createDeck(){
    let deck = [];
    for(let suit of suits){
        for(let rank of ranks){
            deck.push({suit, rank})
        }
    }
    return deck;
}

server.post('/temp/deck', (req, res) => {
    const deckId = ++deckcounter;
    decks[deckId] = createDeck();
    res.send({ deck_id: deckId });
});

server.patch('/temp/deck/shuffle/:deck_id', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId]) {
        decks[deckId] = decks[deckId].sort(() => Math.random() - 0.5);
        res.send({ status: 'shuffled', deck_id: deckId });
    } else {
        res.status(404).send({ error: 'Deck not found' });
    }
});
server.get('/temp/deck/:deck_id', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId]) {
        res.send(decks[deckId]);
    } else {
        res.status(404).send({ error: 'Deck not found' });
    }
});

server.get('/temp/deck/:deck_id/card', (req, res) => {
    const deckId = req.params.deck_id;
    if (decks[deckId] && decks[deckId].length > 0) {
        const card = decks[deckId].splice(Math.floor(Math.random() * decks[deckId].length), 1)[0];
        res.send(card);
    } else {
        res.status(404).send({ error: 'Deck not found or empty' });
    }
});

server.use(express.static('public'));