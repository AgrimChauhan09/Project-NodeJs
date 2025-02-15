const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

const app = express();
const PORT = 5000; // Changed port from 3000 to 5000

app.use(express.json());
app.use(cors());

// User Registration
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();

    result = result.toObject();
    delete result.password; // Remove password before sending response

    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went Wrong  please try after sometime" });
        }
        res.send({ result, auth: token });
    })
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ result: "Missing email or password" });
        }

        let user = await User.findOne({ email, password }).select("-password");

        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went Wrong  please try after sometime" });
                }
                res.send({ user, auth: token });
            })
        } else {
            res.status(404).send({ result: "No user found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error during login" });
    }
});

// Add Product
app.post('/add-product', async (req, res) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ error: "Error adding product" });
    }
});

// Get All Products
app.get('/products', async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send({ result: "No products found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error fetching products" });
    }
});

// Delete Product by ID
app.delete('/product/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.send({ success: true, message: "Product deleted successfully" });
        } else {
            res.status(404).send({ result: "No product found to delete" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error deleting product" });
    }
});

// Get Product by ID
app.get("/product/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ result: "No record found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error fetching product" });
    }
});

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
});


app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
