import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://boiling-beach-72821.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [productKey])

    return (
        <div className="mx-auto">
            <h1>Your Product Detail</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;