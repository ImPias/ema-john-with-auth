import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placedOrder, setPlacedOrder] = useState(false)
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map( key => {
            const products = fakeData.find(pd => pd.key === key);
            products.quantity = savedCart[key];
            return products;
        });
        setCart(cartProducts);
        // console.log(cart)
        // console.log(cartProducts);
    }, [])
    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory()
    const handleProcedCart = () => {
        history.push('/shipment');
    }
    let thankyou;
    if(placedOrder){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems product={pd} key={pd.key} handleRemoveItem={handleRemoveItem}></ReviewItems>)
                }
                { thankyou }
            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProcedCart} className="main-button">Proced Cart</button>
                    </Cart>
            </div>
        </div>
    );
};

export default Review;