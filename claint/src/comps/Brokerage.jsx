import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link, } from 'react-router-dom';
import server from '../server/server';
import Pagination from './Pagination';


// const areas = ['בני ברק', 'ירושלים', 'רכסים', 'אשדוד'];
const price = ['עד 5 שקל', 'עד 10 שקל'];


const Brokerage = () => {
    // console.log(props.isLoggedIn);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const [data, setData] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [isLikeCardClicked, setIsLikeCardClicked] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await server.getItems('products', currentPage);
                setData(responseData.items);
                setTotalPages(responseData.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [currentPage]);

    const handleSearchButtonClick = async () => {
        try {
            const responseData = await server.getItemsByCategory(
                'products',
                selectedPrice,
                selectedArea,
                currentPage
            );
            setData(responseData.items);
            setTotalPages(responseData.totalPages);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };

    const changeLike = async (cardId) => {
        setIsLikeCardClicked(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId],
        }));
        await server.addLike('users/like', cardId);
    }

    return (
        <div className='mx-auto mb-24 min-h-screen'>
            <div className="max-w-max mx-auto p-4 space-y-4 text-center text-slate-600" dir='rtl'>
                <h1 className="text-2xl font-bold mb-4">חפש כדורי בונג'סטה לרכישה פרטית באזור מגוריך</h1>
                <div className="flex items-center min-w-full">
                    <div className="flex-grow mx-0">
                        {/* <label className="text-lg">הזן עיר מגורים:</label> */}
                        <label className="text-lg text-white">הזן עיר מגורים:</label>
                        <div className="">
                            {/* <select
                                className="input input-bordered w-48"
                                value={selectedArea}
                                onChange={handleAreaChange}
                            >
                                <option value="">בחר אזור מגורים</option>
                                {areas.map((area) => (
                                    <option key={area} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select> */}
                            <input 
                            className='input input-bordered w-48' 
                            placeholder='הזן עיר מגורים'
                            onChange={handleAreaChange}></input>
                        </div>
                    </div>
                    <div className="flex-grow mr-3">
                        {/* <label className="text-lg">בחר טווח מחירים:</label> */}
                        <label className="text-lg  text-white">בחר טווח מחירים:</label>
                        <div className="">
                            <select
                                className="input input-bordered w-48 "
                                value={selectedPrice}
                                onChange={handlePriceChange}
                            >
                                <option value="">בחר טווח מחירים</option>
                                {price.map((price) => (
                                    <option key={price} value={price}>
                                        {price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSearchButtonClick} className="flex-grow btn btn-primary btn-md mt-7 bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0">חפש</button>
                </div>
                <br></br>
                <Link to={isLoggedIn ? '/add' : '/register'} className="flex-grow btn btn-outline mr-2 btn-md  w-full text-lg">הוספת פרסום</Link>
                <br></br>
                <br></br>
            </div>
            {data.map((card) => (
                <div key={card._id}>
                    <div  dir="rtl" className="static card-body w-1/2 bg-base-100 shadow-xl shadow-rose-300 mx-auto mt-4 ">
                        {/* <div className=""> */}
                        <div className="overflow-x-auto card-body p-4">
                            <div className="flex justify-between ">
                                <div className="flex ml-4">
                                    <BsFillPersonFill style={{ marginLeft: "10px", marginTop: "1px", fontSize: "1.5em" }} />
                                    <h3 className="text-lg font-medium">{card.name}</h3>
                                </div>
                                <button
                                    id='like'
                                    onClick={() => {
                                        if (isLoggedIn) {
                                            changeLike(card._id)
                                        }
                                    }}
                                    disabled={!isLoggedIn}
                                >
                                    {isLikeCardClicked[card._id]
                                        ? <BsSuitHeartFill style={{ fontSize: "1.5em", marginBottom: "5px", color: "rgb(13 148 136)" }} />
                                        : <BsSuitHeart style={{ fontSize: "1.5em", marginBottom: "5px", color: "rgb(13 148 136)" }} />}
                                </button>

                            </div>
                            <table className="table text-start text-base">
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th className='text-start'>עיר</th>
                                        <td>{card.city}</td>
                                        <th className='text-start'>כתובת</th>
                                        <td>{card.address}</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th className='text-start'>טלפון</th>
                                        <td>{card.phone}</td>
                                        <th className='text-start'>מייל</th>
                                        <td>{card.email}</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <th className='text-start'>מס' כדורים</th>
                                        <td>{card.numPills}</td>
                                        <th className='text-start'>מחיר לכדור</th>
                                        <td>{card.pricePerPills}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='ml-8'>
                            <h4 className='font-medium'>הערות: <span className='font-normal'>{card.remarks}</span></h4>
                        </div>
                    </div>
                </div>
            ))}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div >
    );
}

export default Brokerage;
