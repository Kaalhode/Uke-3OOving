import express from 'express'
import galleryRouter from './routes/gallery.mjs';

const server = express();
const port = 8001;

server.use(express.json());

server.use(express.static('public'));

server.use('/gallery', galleryRouter);

server.get('/', (req, res) => {
    res.redirect('/gallery');
});

server.listen(port, () => {
    console.log(`Gallery app listening at http://localhost:${port}`);
});