import React, { useEffect } from 'react';
import {useParams,useNavigation, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    // State variables to store product details
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    // const [error, setError] = React.useState(false);
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])
    
    const getProductDetails=async ()=>{
        console.warn (params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result =await result.json(); 
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    // Function to update product
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name, price, category, company}),
            headers:{
                'content-type':"application/json"
            }
        });
        result= await result.json();
        console.warn(result);
        navigate('/');
    }

return (
    <div className='product'>
        <h1>Update  Product</h1>
        {/* Input fields to enter product details */}
        <input type="text" placeholder='Enter product name' className='inputbox' value={name} onChange={(e) => setName(e.target.value)} />

        <input type="text" placeholder='Enter product price' className='inputbox' value={price} onChange={(e) => setPrice(e.target.value)} />

        <input type="text" placeholder='Enter product category' className='inputbox' value={category} onChange={(e) => setCategory(e.target.value)} />

        <input type="text" placeholder='Enter product company' className='inputbox' value={company} onChange={(e) => setCompany(e.target.value)} />

        {/* Button to trigger addProduct function */}
        <button onClick={updateProduct} className='appbutton2'>update Product</button>
    </div>
);
}


export default UpdateProduct;