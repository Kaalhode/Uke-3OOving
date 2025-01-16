import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

const poem = "Ensom Alene i stillhet, går vi hver vår vei<br> Ensomheten fyller oss Glede er noe vi ikke kjenner til.<br> Men vi vet noe i livet. Sannheten.<br> Snart vil folk forstå.<br> Enn så lenge, gjør vi som vi gjør.<br> Vi vet da, hva som skjer i morgen.<br> I morgen møter vi verden med vår ensomhet.<br> Dikt skrevet av Snowder (ris og ros) fra dikt.org";

const quotes = [
    
]

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

server.get('/tmp/poem', (req, res) => {
    res.send(poem);
})

server.get('/tmp/quote', (req, res) => {
    res.send(quote);
})
server.get("/", getRoot);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});