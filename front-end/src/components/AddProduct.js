import React from 'react';

const AddProducts = () => {
    // State variables to store product details
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    // Function to add product
    const addProduct = async () => {
        // Validate input fields
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        // Get user ID from local storage
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        try {
            // Send POST request to add product
            const response = await fetch("http://localhost:3000/add-product", {
                method: 'POST',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json(); // Parse response JSON
            console.log(result); // Log the result

            // Clear form fields after successful submission
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            setError(false);

        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            {/* Input fields to enter product details */}
            <input  type="text" placeholder='Enter product name' className='inputbox' value={name}  onChange={(e) => setName(e.target.value)}  />
            {error && !name && <span className='invalid'>Enter Valid Name</span>}

            <input type="text" placeholder='Enter product price' className='inputbox' value={price}  onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid'>Enter Valid Price</span>}

            <input type="text" placeholder='Enter product category'  className='inputbox' value={category} onChange={(e) => setCategory(e.target.value)}  />
            {error && !category && <span className='invalid'>Enter Valid Category</span>}

            <input type="text" placeholder='Enter product company' className='inputbox' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid'>Enter Valid Company</span>}

            {/* Button to trigger addProduct function */}
            <button onClick={addProduct} className='appbutton2'>Add Product</button>
        </div>
    );
};

export default AddProducts;