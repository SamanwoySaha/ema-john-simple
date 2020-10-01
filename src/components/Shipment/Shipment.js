import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

    fetch('https://boiling-beach-72821.herokuapp.com/addOrders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('Your order placed successfully');
      }
    })
  };

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}
      <input name="address" ref={register({ required: true })} placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
      {errors.phone && <span className="error">Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;