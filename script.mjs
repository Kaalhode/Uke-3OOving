import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

const poem = "Ensom Alene i stillhet, går vi hver vår vei Ensomheten fyller oss Glede er noe vi ikke kjenner til. Men vi vet noe i livet. Sannheten. Snart vil folk forstå. Enn så lenge, gjør vi som vi gjør. Vi vet da, hva som skjer i morgen. I morgen møter vi verden med vår ensomhet. Dikt skrevet av Snowder (ris og ros) tatt fra dikt.org";

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

server.get('/tmp/poem', (req, res) => {
    res.send(poem);
})

server.get("/", getRoot);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});