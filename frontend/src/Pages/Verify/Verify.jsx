import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  const success = searchparams.get("success");
  const orderId = searchparams.get("orderId");
  const {url}=useContext(StoreContext)
  const nav = useNavigate()

  const verifyPayment =async () =>{
    const res =await axios.post(url+"/api/order/verify",{success,orderId})
    if(res.data.success){
        nav('/myorders')
    }
    else{
        nav('/')
    }
  }
  useEffect(()=>{
    verifyPayment()
  },[])
  return(
    <div className="verify">
        <div className="spinner">

        </div>
    </div>
  )
  
};

export default Verify;
