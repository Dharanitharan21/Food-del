import { useState } from "react";
import "./MyOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setdata] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setdata(res.data.data);    
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                 return item.name +" x "+ item.quantity
                            }else{
                                return item.name +" x "+item.quantity+" , "
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Treack Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default MyOrder;
