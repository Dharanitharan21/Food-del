import { Profiler, useContext, useState } from "react";
import { assets } from "../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const Navbar = ({ setshowlogin }) => {
  const [menu, setmenu] = useState("");
  const {getTotalCartAmount ,token ,setToken}  =useContext(StoreContext)
  const nav =useNavigate()
  const logout =()=>{
     localStorage.removeItem('token')
     setToken("")
     nav('/')
  }

  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setmenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setmenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setmenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
      
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?  <button onClick={() => setshowlogin(true)}>sign in</button>
        : <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>nav('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
           </div>}
       
      </div>
    </div>
  );
};

export default Navbar;
