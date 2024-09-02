import { Router } from "express";

const cartsRouter = Router();


let carts = [];

// Rutas para el manejo de carritos
cartsRouter.post('/', (req, res) => {
    const newCart = {
        id: generateId(carts),
        products: []
    };

    carts.push(newCart);
    res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid, 10);
    const cart = carts.find(cart => cart.id === cartId);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

cartsRouter.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid, 10);
    const productId = parseInt(req.params.pid, 10);
    const quantity = req.body.quantity || 1;

    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingProduct = cart.products.find(item => item.product === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    res.json(cart.products);
});




export default cartsRouter