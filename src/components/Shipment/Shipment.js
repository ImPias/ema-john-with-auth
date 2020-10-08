import React from 'react';
import './Shipment.css'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">This field is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">This field is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">This field is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">This field is required</span>}
            
            <input type="submit" />
        </form>
    );
};

export default Shipment;