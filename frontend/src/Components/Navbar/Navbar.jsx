import { useRef, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom"; 
import './Navbar.css'
import nav_dropdown from '../Assets/dropdown_icon.png'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {

        const [menu, setMenu] = useState("shop");
        const {getTotalCartItems} = useContext(ShopContext);
        const menuRef = useRef();

        const dropdown_toggle = (e) => {
            menuRef.current.classList.toggle("nav-menu-visible");
            e.target.classList.toggle('open');
        }
    return(
        <div class="navbar">
            <div class="nav-logo">
                <img src={logo} alt="Logo"/>
                <p>SHOPPER</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul className="nav-menu" ref={menuRef}>
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu==="womens"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="Cart Icon"/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar