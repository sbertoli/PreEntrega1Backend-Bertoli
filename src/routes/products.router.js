import { Router } from "express";

const productsRouter = Router()


let products = [
    {
        "id":1,
        "products":[
            {
                "product":4,
                "quantity":1
            }
        ]
    },
    {
        "id":2,
        "products":[]
    },
    {
        
    }
];

// Rutas para el manejo de productos
productsRouter.get('/', (req, res) => {
    const limit = req.query.limit;
    let limitedProducts = limit ? products.slice(0, parseInt(limit, 10)) : products;
    res.json(limitedProducts);
});

productsRouter.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid, 10);
    const product = products.find(product => product.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

productsRouter.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
    }

    const newProduct = {
        id: generateId(products),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    products.push(newProduct);
    
    res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid, 10);
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...req.body };
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

productsRouter.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid, 10);
    products = products.filter(product => product.id !== productId);
    res.json({ message: 'Producto eliminado exitosamente' });
});



export default productsRouter