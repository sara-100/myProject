import { BsFillPersonFill } from "react-icons/bs";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react';


export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const navigate = useNavigate();

    function disconnection() {
        localStorage.removeItem('token');
        navigate('/disconnection')
        window.location.reload(false);
    }

    return (
        <>
            <div id="sidebar" dir="rtl" className="navbar bg-base-100 sticky top-0 bg-gradient-to-r from-rose-300 to-gray-300 " style={{ zIndex: '1000' }}>
                <div className="navbar-start">
                    <Link to={'home'} className="link mr-4" >
                        <img src={logo} style={{ maxHeight: "60px" }} alt="logo"></img>
                    </Link>
                    {/* <div className="flex-1 gap-2">
                        <div className="form-control">
                            <input style={{ maxWidth: "12rem" }} type="text" placeholder="חיפוש מהיר" className="input input-bordered  max-h-12 bg-rose-100" />
                        </div>
                    </div> */}
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={'about'} >אודותינו</Link></li>
                        <li><Link to={'info'} >טיפול בבחילות</Link></li>
                        <li><Link to={'gmachim'} > גמחי''ם</Link></li>
                        <li><Link to={'brokerage'} >תיווך רכישת בונג'סטה</Link></li>
                        <li><Link to={'donation'} >תרומה לחסדי אילה</Link></li>
                        <li><Link to={'contact'} >צור קשר</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        {isLoggedIn ? (
                            <div className="dropdown dropdown-bottom">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    < BsFillPersonFill style={{ fontSize: "2em" }} />
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-1.5 shadow bg-base-100 rounded-box w-24">
                                    {/* <li><a>הפרסומים שלי</a></li>
                                    <li><a>חיפושים שמורים</a></li> */}
                                    <li><Link to={'user'}>אזור אישי</Link></li>
                                    <li><button onClick={disconnection}>התנתקות</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to={'login'} className="btn btn-ghost btn-circle" >
                                < BsFillPersonFill style={{ fontSize: "2em" }} />
                            </Link>
                        )}
                    </div>
                    <div>

                        <Link to={isLoggedIn ? 'add' : 'register'} className="btn btn-outline btn-neutral ml-3">הוספת פרסום</Link>

                    </div>
                </div>
            </div>
        </>
    );
}