import pic from "../img/bg.png"
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${pic})` }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-white">
                    <div className="max-w-2xl text-xl">
                        <h1 className="mb-5 text-5xl font-bold "><span>!</span>שלום לך</h1>
                        <br></br>
                        <p className="mb-5">כאן תוכלי למצוא מידע אודות הטיפול בבחילות לפני לידה והשגת כדורי בונג'סטה</p>
                        <p> המידע מיועד על מנת לתת מבט ויעוץ כללי וללמוד מנסיונם של אחרים</p>
                        <br></br>
                        <p className="text-red-900 font-bold"> <span>!</span>שימי לב</p>
                        <p></p>
                        <p>המידע אינו רפואי ואינו מהווה תחליף ליעוץ רפואי</p>
                        <br></br>
                        <div>
                            <Link to={'/info'} className="btn btn-outline mr-2">?איך משיגים כדורי בונג'סטה </Link>
                            <Link to={'/info'} className="btn btn-outline ml-2">למידע על טיפול בבחילות</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}