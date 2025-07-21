import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useState,useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
    const {getTotalCartAmount ,token ,food_list,cartitems,url}=useContext(StoreContext)

    const [data,setdata]=useState({
      firstName:'',
      lastName:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:""
    })
    const onChangeHandler =(event)=>{
      setdata({...data,[event.target.name]:event.target.value})
    }

    const placeOrder =async (event)=>{
      event.preventDefault()
      let orderItems=[]
      food_list.map((item)=>{
        if(cartitems[item._id]>0){
          let itemInfo =item
          itemInfo["quantity"]=cartitems[item._id]
          orderItems.push(itemInfo)
        }
      })
      let orderData ={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+60,

      }
      let res =await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(res.data.success){
        const {session_url}=res.data
        window.location.replace(session_url)
      }
      else{
        alert("error")
      }
    }
const nav =useNavigate()
    useEffect(()=>{
      if(!token){
        nav('/cart')
      }
      else if(getTotalCartAmount()===0){
        nav('/cart')
      }
    },[])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" type="text" onChange={onChangeHandler} value={data.firstName} placeholder="First name" />
          <input required name="lastName"type="text" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city}  placeholder="City" />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state}  placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode}  placeholder="Zip code" />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country}  placeholder="Country" />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone}  placeholder="Phone" />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivary Fee</p>
              <p>₹{getTotalCartAmount()===0?0:60}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+60}</b>
            </div>
  
          </div>
          <button type="submit" >Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
