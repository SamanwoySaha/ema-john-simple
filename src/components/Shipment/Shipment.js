import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} placeholder="Your Name"/>
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}
      <input name="address" ref={register({ required: true })} placeholder="Your Address"/>
      {errors.address && <span className="error">Address is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder="Your Phone"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;