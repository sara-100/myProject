import React, { useState } from 'react';
import server from '../server/server';
import {  useNavigate   } from 'react-router-dom';

function AddAd() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [numBalls, setNumBalls] = useState('');
  const [ballPrice, setBallPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleNumBallsChange = (e) => {
    setNumBalls(e.target.value);
  };

  const handleBallPriceChange = (e) => {
    setBallPrice(e.target.value);
  };
  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // בודקים אם יש תחולה בהזנת המידע (שאחד מהשדות החובה לא מולא)
    if (
      userName === '' ||
      (phone === '' && email === '') ||
      numBalls === '' ||
      ballPrice === '' ||
      (city === '' && address === '')
    ) {
      setErrorMessage("יש למלא את כל שדות החובה");
    } else {

      const submitData = async () => {
        navigate('/advertisingSuccess');
        try { 
          await server.addProduct('products', userName, city, address, phone, email, numBalls, ballPrice, remarks);  
        } catch (error) {
          console.error(error);
        }
        
      };
      submitData();
    }
  };

  return (
    <div className='bg-gray-300 py-24 min-h-screen'>
      <div dir='rtl' className="max-w-2xl mx-auto mb-6 p-12 min-h-max rounded-xl bg-white bg-opacity-50 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-600">פרסום כדורי בונג'סטה למכירה</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">שם<span className='text-red-600'> *</span></label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
              // required
              />
            </div>
            <div className="w-1/2 pr-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">עיר<span className='text-red-600'> *</span></label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={city}
                onChange={handleCityChange}
              // required
              />
            </div>
            <div className="w-1/2 pl-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">כתובת<span className='text-red-600'> *</span></label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={address}
                onChange={handleAddressChange}
              // required
              />
            </div>
            <div className="w-1/2 pr-2 mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">טלפון</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="w-1/2 pl-2 mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">דוא''ל</label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className='w-full'>
              <h4 className='mb-6 text-sm text-red-600'>עליך למלא לפחות דרך אחת ליצירת קשר</h4>
            </div>
            <div className="w-1/2 pr-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">מספר כדורים למכירה<span className='text-red-600'> *</span></label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="number"
                value={numBalls}
                min="1"
                onChange={handleNumBallsChange}
              />
            </div>
            <div className="w-1/2 pl-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">מחיר לכדור<span className='text-red-600'> *</span></label>
              <input
                className="input input-bordered w-full bg-opacity-50"
                type="number"
                value={ballPrice}
                min="1"
                onChange={handleBallPriceChange}
              />
            </div>
            <div className='w-full mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>הערות</label>
              <textarea
                className="textarea textarea-bordered textarea-md w-full bg-opacity-50"
                placeholder="אם יש לך אפשרות להעביר את הכדורים לעיר נוספת כדאי לפרסם על כך!"
                onChange={handleRemarks}
              ></textarea>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-600 font-semibold mb-4">{errorMessage}</div>
          )}
          <button
            className="font-semibold py-2 px-4 mx-auto bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0 w-full rounded-md"
            type="submit">
            פרסם
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAd;




