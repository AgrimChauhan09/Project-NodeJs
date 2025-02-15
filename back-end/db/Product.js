
const mongoose = require('mongoose');

// Define the user schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    company: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("products", productSchema);
