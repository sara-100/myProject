import { Link } from "react-router-dom";


export default function Disconnection() {
    // localStorage.removeItem('token');
    
    return (
        <div className="hero min-h-screen bg-slate-400 my-auto">
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-24 text-5xl font-bold">...להתראות</h1>
                    <p className="mb-5 text-2xl"></p>
                    <Link to={'/login'} className="btn btn-primary mt-10  hover:bg-rose-400 bg-gray-800 hover:text-gray-800 text-white border-0 w-60 rounded-md">להתחברות</Link>
                </div>
            </div>
        </div>
    );
}