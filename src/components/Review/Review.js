import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProductItem from '../ProductItem/ProductItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://boiling-beach-72821.herokuapp.com/productsByKeys', {
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const thankyou = orderPlaced ? <img src={happyImage} alt="" /> : null;

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => <ProductItem
                        product={product}
                        key={product.key}
                        removeProduct={removeProduct}
                    ></ProductItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;