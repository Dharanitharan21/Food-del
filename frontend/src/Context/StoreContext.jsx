import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});

  const url = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState("");
  const [food_list, setfoodlist] = useState([]);

  const addtocart = async (itemId) => {
    if (!cartitems[itemId]) {
      setcartitems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url +"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromcart =async (itemId) => {
    setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
     if(token){
      await axios.post(url +"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {

    let totalAmount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartitems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodlist = async () => {
    const res = await axios.get(url + "/api/food/list");
    setfoodlist(res.data.data);
  };
const loadCardData =async(token) =>{
  const res =await axios.post(url+'/api/cart/get',{},{headers:{token}})
  setcartitems(res.data.cartData)
}

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCardData(localStorage.getItem('token'))
      }
    }
    loadData()
  }, []);
  const contextValue = {
    food_list,
    cartitems,
    setcartitems,
    addtocart,
    removeFromcart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
