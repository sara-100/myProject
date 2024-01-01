import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import pic from "../img/bg.png"
import server from "../server/server";

export default function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await server.loginUser('login', email, password);
            console.log(response);
            if (response.success) {
                localStorage.setItem('token', response.token);
                navigate('/home')
                window.location.reload(false);
            } else {
                // התחברות נכשלה, טיפול בזה
                setError(response.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div dir="rtl" className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${pic})` }}>
            <div className="mr-96">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">דוא''ל</span>
                            </label>
                            <input type="email" className="input input-bordered" onChange={handleEmailChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">סיסמא</span>
                            </label>
                            <input type="password" className="input input-bordered" onChange={handlePasswordChange} />
                            <label className="label">
                                {/* <a href="#" className="label-text-alt link link-hover mt-2">שכחת סיסמא?</a> */}
                            </label>
                        </div>
                        {error && <div className="text-red-600">{error}</div>}
                        <div className="form-control mt-6">
                            <button
                                onClick={handleLogin}
                                className="btn btn-primary bg-rose-400 hover:bg-rose-900 text-base text-white border-0">התחברות</button>
                        </div>
                        <h4 className="mt-5 mx-auto text-sm">עדיין לא נרשמת? <Link to={'/signUp'} className="link link-hover text-red-400 font-bold">להרשמה</Link></h4>
                    </div>
                </div>
            </div>
        </div>
    );
}