import React, { useState, useEffect } from 'react';
import server from '../server/server';
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';


const User = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userProducts, setUserProducts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [showLikes, setshowLikes] = useState(false);
  const [showDetails, setshowDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedPostId, setDeletedPostId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.getUser('users');
        setUserName(response.userName);
        setUserEmail(response.email);
        // console.log(response.email);
        const productsResponse = await server.getUserPosts('users/products');
        setUserProducts(productsResponse);
        // console.log(productsResponse);
        const likesResponse = await server.getUserPosts('users/likes');
        setUserLikes(likesResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }


    };

    fetchData();
  }, []);

  const myPosts = () => {
    setShowPosts(!showPosts);
    setshowLikes(false);
    setshowDetails(false);
  }

  const myLikes = () => {
    setshowLikes(!showLikes);
    setShowPosts(false);
    setshowDetails(false);
  }

  const updateDetails = () => {
    setshowDetails(!showDetails);
    setShowPosts(false);
    setshowLikes(false);
  }

  const deletePost = async (card_id) => {
    try {
      await server.deletePost('products', card_id);
      const productsResponse = await server.getUserPosts('users/products');
      setUserProducts(productsResponse);
      setShowPosts(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteLike = async (card_id) => {
    try {
      await server.deletePost('users', card_id);
      const likesResponse = await server.getUserPosts('users/likes');
      setUserLikes(likesResponse);
      setshowLikes(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  }

  const confirmation = (card_id) => {
    setDeletedPostId(card_id);
    setShowConfirmation(true);
  }

  const onclose = () => {
    setShowConfirmation(false);
  };


  return (
    <div className='pt-16 pb-32 min-h-screen relative' dir="rtl">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-gray-800 mb-5 font-bold">שלום <span>{userName}</span></h1>
          <div className="">
            <a onClick={updateDetails} className="link link-hover">עדכון פרטים</a>
            <a onClick={myPosts} className="mx-5 link link-hover">הפרסומים שלי</a>
            <a onClick={myLikes} className="link link-hover">חיפושים שמורים</a>
          </div>
        </div>
      </div>
      {showPosts && userProducts.map((card) => (
        <div key={card._id} dir="rtl" className="static card-body w-1/2 bg-base-100 shadow-xl shadow-rose-300 mx-auto mt-4 ">
          <div className="overflow-x-auto card-body p-4">
            <div className="flex justify-between ">
              <div className="flex ml-4">
                <BsFillPersonFill style={{ marginLeft: "10px", marginTop: "1px", fontSize: "1.5em" }} />
                <h3 className="text-lg font-medium">{card.name}</h3>
              </div>
              <div className='flex'>
                <Link to={`/editPost/${card._id}`}>
                  <AiFillEdit style={{ fontSize: "1.5em", marginBottom: "2px", color: "rgb(13 148 136)" }} />
                </Link>
                <button onClick={() => confirmation(card._id)}>
                  <BsFillTrash3Fill style={{ fontSize: "1.25em", marginBottom: "5px", marginRight: '8px', color: "rgb(13 148 136)" }} />
                </button>
              </div>
            </div>
            <table className="table text-start text-base">
              <tbody>
                {/* row 1 */}
                <tr>
                  <th className='text-start w-36'>עיר</th>
                  <td>{card.city}</td>
                  <th className='text-start w-36'>כתובת</th>
                  <td>{card.address}</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th className='text-start w-36'>טלפון</th>
                  <td>{card.phone}</td>
                  <th className='text-start w-36'>מייל</th>
                  <td>{card.email}</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th className='text-start w-36'>מס' כדורים</th>
                  <td>{card.numPills}</td>
                  <th className='text-start w-36'>מחיר לכדור</th>
                  <td>{card.pricePerPills}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='ml-8'>
            <h4 className='font-medium'>הערות: <span className='font-normal'>{card.remarks}</span></h4>
          </div>
        </div>

      ))}
      {showLikes && userLikes.map((card) => (
        <div key={card._id} dir="rtl" className="static card-body w-1/2 bg-base-100 shadow-xl shadow-rose-300 mx-auto mt-4 ">
          {/* <div className=""> */}
          <div className="overflow-x-auto card-body p-4">
            <div className="flex justify-between ">
              <div className="flex ml-4">
                <BsFillPersonFill style={{ marginLeft: "10px", marginTop: "1px", fontSize: "1.5em" }} />
                <h3 className="text-lg font-medium">{card.name}</h3>
              </div>
              <div>
                <button onClick={() => deleteLike(card._id)}>
                  <BsSuitHeartFill style={{ fontSize: "1.5em", marginBottom: "5px", color: "rgb(13 148 136)" }} />
                </button>
              </div>
            </div>
            <table className="table text-start text-base">
              <tbody>
                {/* row 1 */}
                <tr>
                  <th className='text-start w-36'>עיר</th>
                  <td>{card.city}</td>
                  <th className='text-start w-36'>כתובת</th>
                  <td>{card.address}</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th className='text-start w-36'>טלפון</th>
                  <td>{card.phone}</td>
                  <th className='text-start w-36'>מייל</th>
                  <td>{card.email}</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th className='text-start w-36'>מס' כדורים</th>
                  <td>{card.numPills}</td>
                  <th className='text-start w-36'>מחיר לכדור</th>
                  <td>{card.pricePerPills}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='ml-8'>
            <h4 className='font-medium'>הערות: <span className='font-normal'>{card.remarks}</span></h4>
          </div>
        </div>
      ))}
      {showDetails ?
        <div className='mx-auto max-w-md mt-10  bg-rose-300 rounded-md p-4'>
          <div className="flex">
            <h1 className='pb-4 pr-10 font-bold text-lg'>שם: <span className='font-normal'>{userName}</span></h1>
            <AiFillEdit style={{ fontSize: "1.5em", marginBottom: "2px", color: "black" }} />
          </div>
          <div className="flex">
            <h1 className='font-bold text-lg pr-10'>דוא''ל: <span className='font-normal'>{userEmail}</span></h1>
            <AiFillEdit style={{ fontSize: "1.5em", marginBottom: "2px", color: "black" }} />
          </div>
          {/* <a className='font-bold text-lg pt-4'>שינוי סיסמא</a> */}
        </div>
        : null}
      {showConfirmation && (
        <div role='alert' className='alert w-1/3 flex justify-between fixed top-24 left-0 right-0 mx-auto' dir='rtl'>
          <h2>להסיר את המודעה?</h2>
          <div>
            <button className='btn btn-sm' onClick={() => deletePost(deletedPostId)}>
              מחיקה
            </button>
            <button className='btn btn-sm btn-error' onClick={onclose}>
              ביטול
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
