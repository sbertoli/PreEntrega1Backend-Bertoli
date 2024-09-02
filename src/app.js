import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`ESCUCHANDO EN ${PORT}`))

app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productsRouter)
app.use('/api/carts',cartsRouter)
app.use(express.json())