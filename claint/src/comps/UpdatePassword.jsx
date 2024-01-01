import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../server/server';

export default function UpdatePassword () {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // בודקים אם יש תחולה בהזנת המידע (שאחד מהשדות החובה לא מולא)
        if (
            userName === '' ||
            email === '' ||
            password === ''
        ) {
            setErrorMessage(true);
        } else {
            const submitData = async () => {
                navigate('/registrationgSuccess');
                try {
                    await server.addUser('login/new', userName, email, password);
                } catch (error) {
                    console.error(error);
                }

            };
            submitData();
        }
    }

    return (
        <div className='bg-gray-300 py-24'>
            <div dir='rtl' className="max-w-2xl mx-auto my-6 p-12 min-h-max rounded-xl bg-white bg-opacity-50 border-2 border-white">
                <h2 className="text-2xl font-semibold mb-8 text-center text-teal-600">שינוי סיסמא</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-wrap">
                        <div className="w-full mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">שם</label>
                            <input
                                className="input input-bordered w-full bg-opacity-50"
                                type="text"
                                onChange={handleUserNameChange}
                            />
                        </div>
                        <div className="w-full mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">דוא''ל</label>
                            <input
                                className="input input-bordered w-full bg-opacity-50"
                                type="email"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="w-full mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">סיסמא</label>
                            <input
                                className="input input-bordered w-full bg-opacity-50"
                                type="text"
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-600 font-semibold mb-4">{'יש למלא את כל שדות החובה'}</div>
                    )}
                    <button
                        className=" font-semibold py-2 px-4  bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0 w-full rounded-md"
                        type="submit">
                        עדכון פרטים
                    </button>
                </form>
            </div>
        </div>
    );

}