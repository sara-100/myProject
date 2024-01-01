import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Contact() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName,
      city,
      address,
      phone,
      email,
      message: e.target[6].value, // הוספת הוספת פרטי ההודעה מתוך הטקסטאריה
    };

    try {
      const response = await axios.post('http://localhost:3000/send-email', data);

      // תלחצות הודעת Axios לפי תשובת הבקשה
      if (response.data.success) {
        // הצלחה - כאן תוכלי להוסיף פעולות נוספות או להציג הודעה למשתמש
        navigate('/thanks');
        console.log('Email sent successfully');
      } else {
        // כישלון - טיפול בכישלון כאן
        console.error('Failed to send email:', response.data.error);
        setError('נתקלנו בשגיאה נסה מאוחר יותר');
      }
    } catch (error) {
      // טיפול בשגיאת Axios
      setError('נתקלנו בשגיאת שרת נסה מאוחר יותר');
      // console.log(error);
      console.error('Error during Axios request:', error);
    }
  };

  return (
    <div className='bg-gray-300 py-24'>
      <div dir='rtl' className="max-w-2xl mx-auto my-6 p-12 min-h-max rounded-xl bg-white bg-opacity-50 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-8 text-center text-teal-600">צור קשר</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-1/2 pr-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">שם</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={city}
                onChange={handleCityChange}
                required
              />
            </div>
            <div className="w-1/2 pl-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">משפחה</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="w-1/2 pr-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">טלפון</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </div>
            <div className="w-1/2 pl-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">דוא''ל</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="w-full mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">נושא</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
              />
            </div>
            <div className='w-full mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>תוכן</label>
              <textarea className="textarea textarea-bordered textarea-md w-full bg-opacity-50" required></textarea>
            </div>
          </div>
          <button
            className=" font-semibold py-2 px-4  bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0 w-full rounded-md"
            type="submit">
            שלח פניה
          </button>
        </form>
        <br></br>
        {error && <div className="text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default Contact;