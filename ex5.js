import mysql from 'mysql2/promise';
import express from 'express';
import { config } from 'dotenv';

config();
const app = express();
app.use(express.json()); 


const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'lithembar#.2',
    database: process.env.DB_NAME || 'shopleft'
});


const productsRouter = express.Router();

// Get all products
productsRouter.get('/', async (req, res) => {
    const [results] = await db.query('SELECT * FROM products');
    res.json(results);
});

// Get a single product
productsRouter.get('/:id', async (req, res) => {
    const [results] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(results[0]); 
});

// Insert a new product
productsRouter.post('/', async (req, res) => {
    const [results] = await db.query('INSERT INTO products SET ?', req.body);
    res.json({ message: 'Product inserted', insertId: results.insertId });
});

// Delete a product
productsRouter.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
});

// Update a product
productsRouter.put('/:id', async (req, res) => {
    await db.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id]);
    res.json({ message: 'Product updated' });
});

app.use('/products', productsRouter);

// Users Router
const usersRouter = express.Router();

// Get all users
usersRouter.get('/', async (req, res) => {
    const [results] = await db.query('SELECT * FROM users');
    res.json(results);
});

// Get a single user
usersRouter.get('/:id', async (req, res) => {
    const [results] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(results[0]);
});

// Insert a new user
usersRouter.post('/', async (req, res) => {
    const [results] = await db.query('INSERT INTO users SET ?', req.body);
    res.json({ message: 'User inserted', insertId: results.insertId });
});

// Delete a user
usersRouter.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
});

// Update a user
usersRouter.put('/:id', async (req, res) => {
    await db.query('UPDATE users SET ? WHERE id = ?', [req.body, req.params.id]);
    res.json({ message: 'User updated' });
});

app.use('/users', usersRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
