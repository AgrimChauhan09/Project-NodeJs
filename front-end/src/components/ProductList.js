import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    const deleteproduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    console.warn('products', products);
 
    const searchHandle = async (event) => {
        let key=event.target.value;
        if(key){
            let result= await fetch(`http://localhost:5000/search/${key}`)
            result=await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts()
        }
    }
    return (
        <div className="ProductList">
            <h3>Product list</h3>
            <input className="search-product-box" type="text" placeholder="search product"
                onChange={searchHandle}
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>price</li>
                <li>Category</li>
                <li>Operations</li>
                <li>Update</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteproduct(item._id)}>Delete</button></li>
                        <li><Link to={"/update/" + item._id}> Update </Link></li>
                    </ul>
                )
                :<h1>No Result found</h1>
            }
        </div>
    )
}

export default ProductList;