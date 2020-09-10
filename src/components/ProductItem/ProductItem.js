import React from 'react';

const ProductItem = (props) => {
    const { name, quantity, key, price } = props.product;
    // const reviewItemStyle = {
    //     borderBottom: '1px solid lightgray',
    //     marginLeft: '200px',
    //     paddingBottom: '15px',
    //     marginBottom: '5px'
    // };

    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <h5>Quantity: {quantity}</h5>
            <p>${price}</p>
            <br />
            <button
                className="main-button"
                onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ProductItem;