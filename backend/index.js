const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 5000;
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

app.use(cors())
app.use(express.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});
connection.connect();

const upload = multer({ dest: 'images/' });

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/products', (req, res) => {
    const catId = req.query.catId;
    try {
        connection.query(`SELECT products.*
        FROM products
        JOIN categories ON products.category_id = categories.id
        WHERE categories.id = ${catId}`, function (error, results, fields) {
            if (error) throw (error);
            else res.json({ status: 200, products: results });
        });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
})

app.post('/set_category', upload.single('banner'), (req, res) => {
    const catToSet = req.body;
    catToSet.banner = `images/categories/${catToSet.name.replace(/\s+/g, '_')}.jpg`
    fs.renameSync(req.file.path, catToSet.banner)
    try {
        connection.query(`INSERT INTO categories(name, description, banner, created_at, updated_at) VALUES ('${catToSet.name}','${catToSet.description}','${catToSet.banner}','${new Date().toISOString()}','${new Date().toISOString()}')`, function (error, results, fields) {
            if (error) throw (error);
            else res.json({ status: 200, category: { ...req.body, id: results.insertId } });
        });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
});

app.get('/categories', (req, res) => {
    try {
        connection.query('select * from categories', function (error, results, fields) {
            if (error) throw (error);
            else res.json({ status: 200, categories: results });
        });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
});

// api endpoints to signin
app.post('/signin', upload.none(), async (req, res) => {
    try {
        const { user, password } = req.body;
        // const users = await client.get('users');
        // if (!users) {
        //     return res.json({ status: 401, message: 'Users not found' });
        // }
        // const userObj = JSON.parse(users).find(use => (use.email === user || use.username === user));
        // if (!userObj || userObj.password !== password) {
        if (user !== 'admin' && password !== 'admin') {
            return res.json({ status: 401, message: 'Invalid credentials' });
        }
        // delete userObj.password;
        delete req.body.password;
        res.json({ status: 200, user: { username: user } });
    } catch (error) {
        console.log(error);
        res.json({ status: 500, message: 'Error logging in' });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));