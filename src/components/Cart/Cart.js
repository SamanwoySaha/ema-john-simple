import React from "react";
import "./Cart.css";

const Cart = (props) => {
    const cart = props.cart;
    const total = Number(
        cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
    );
    let shipping = total > 35 ? 0 : total > 15 ? 4.99 : total > 0 ? 12.49 : 0;
    const tax = Number((total / 10).toFixed(2));
    const grandTotal = Number((total + shipping + tax).toFixed(2));

    return (
        <div className="cart">
            <h3 className="cart-header">Order Summary</h3>
            <p className="cart-items">Items Ordered: {cart.length}</p>
            <div className="cart-body">
                <p>Product Price: {total}</p>
                <p>
                    <small>Shipping Cost: {shipping}</small>
                </p>
                <p>
                    <small>Tax + VAT: {tax}</small>
                </p>
                <p className="total-price">Total Price: {grandTotal}</p>
            </div>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
