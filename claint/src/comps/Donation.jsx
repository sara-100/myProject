import { Link } from "react-router-dom"

export default function Donation() {
    return (
        <div className="max-w-2xl mx-auto mt-40 min-h-screen">
            <div className="text-center font-bold text-lg">
                <h1 >
                    !שימי לב
                </h1>
                <h1>
                    בלחיצה על הקישור תועברי לאתר חיצוני לתרומה מאובטחת
                </h1>
                <br></br>
                <a href="https://www.matara.pro/nedarimplus/online/?S=LAJL"
                    className="text-center font-semibold py-2 px-4  bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0 w-60 rounded-md"
                    target="_blank" rel="noopener noreferrer">
                    למעבר לתרומה
                </a>
            </div>
        </div>
    )
}