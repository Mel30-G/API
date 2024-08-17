const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS para permitir solicitudes desde http://localhost:3334
app.use(cors({
  origin: 'http://localhost:3334',
  optionsSuccessStatus: 200
}));


let products = [
  { id: 1, nombre: 'Smartphone Galaxy S22', precio: 700.0, imagen: 'https://m.media-amazon.com/images/I/81Ulnpn3ZpL._AC_SL1500_.jpg', stock: 25 },
  { id: 2, nombre: 'Laptop Dell XPS 13', precio: 200.0, imagen: 'https://m.media-amazon.com/images/I/41lQpwNA39L._AC_.jpg', stock: 15 },
  { id: 3, nombre: 'Tablet Honor Pad X9', precio: 200.0, imagen: 'https://1800-laptops.com/wp-content/uploads/2024/03/pad-x9.jpg', stock: 30 },
  { id: 4, nombre: 'Apple AirPods Max', precio: 350.0, imagen: 'https://www.apple.com/v/airpods/v/images/overview/airpods_max__f265q4g4ddym_large.png', stock: 40 },
  { id: 5, nombre: 'Smart TV LG OLED55CX', precio: 149999.0, imagen: 'https://m.media-amazon.com/images/I/81h0yglj66L._AC_UF894,1000_QL80_.jpg', stock: 10 }
];

app.get('/', (req, res) => {
    res.send('Node JS api');
})
// GET: Obtener todos los productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET: Obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

// POST: Crear un nuevo producto
app.post('/api/products', (req, res) => {
  const { nombre, precio, imagen, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    nombre,
    precio,
    imagen,
    stock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Actualizar un producto por ID
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');

  const { nombre, precio, imagen, stock } = req.body;
  product.nombre = nombre;
  product.precio = precio;
  product.imagen = imagen;
  product.stock = stock;

  res.json(product);
});

// DELETE: Eliminar un producto por ID
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Producto no encontrado');

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
});
