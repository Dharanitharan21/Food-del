import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartitems, food_list, removeFromcart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  // ✅ Early exit if data not ready
  if (!food_list || !cartitems) return <div>Loading cart...</div>

  // ✅ Filter only items added to cart
  const cartFoodItems = food_list.filter(item => cartitems[item._id] > 0)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartFoodItems.length === 0 ? (
          <p className='empty-cart'>Your cart is empty.</p>
        ) : (
          cartFoodItems.map(item => (
            <div key={item._id}>
              <div className="cart-items-item cart-items-title">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartitems[item._id]}</p>
                <p>₹{item.price * cartitems[item._id]}</p>
                <p onClick={() => removeFromcart(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 60}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 60}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')} disabled={getTotalCartAmount() === 0}>
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
