import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import server from '../server/server';
import Pagination from './Pagination';



const categories = [ 'בונג\'סטה', 'זופרן', 'צמידים', 'רוקחות אישית'];

// const areas = ['תל אביב', 'ירושלים', 'חיפה', 'רעננה'];

function SearchGmachim() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await server.getItems('posts', currentPage);
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
            const responseData = await server.getItemsByCategory('posts',selectedCategory,selectedArea, currentPage);
            setData(responseData.items);
            setTotalPages(responseData.totalPages);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(selectedCategory);
    };
    

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
        console.log(selectedArea);
    };

    return (
        <div className='mx-auto mb-24 min-h-screen'>
            <div className="max-w-min mx-auto p-4 space-y-4 text-center text-slate-600" dir='rtl'>
                <h1 className="text-2xl font-bold mb-4">חיפוש לפי קטגוריה ואזור מגורים</h1>
                <div className="flex items-center min-w-full">
                    <div className="flex-grow">
                        <label className="text-lg">קטגוריה:</label>
                        <div className="">
                            <select
                                className="input input-bordered w-40"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">בחר קטגוריה</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex-grow ml-5 ">
                        <label className="text-lg">עיר:</label>
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
                            placeholder='הזן עיר מגורים:'
                            onChange={handleAreaChange}></input>
                        </div>
                    </div>
                    <button onClick={handleSearchButtonClick} className="ml-5 flex-grow btn btn-primary btn-md mt-7 bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0">חפש</button>
                </div>
                <br></br>
                <Link to={'/contact'} className="flex-grow btn btn-outline mr-2 btn-md  w-full text-lg">מעונינים לפתוח גמ''ח באזור מגוריכם? פנו אלינו!</Link>
                <br></br>
                <br></br>
            </div>
            {/* שימוש ב-state לעדכון המידע במקום במערך קבוע */}
            {data.map((card) => (
                <div key={card._id} tabIndex={0} dir='rtl' className="static collapse collapse-open  bg-zinc-100 w-1/2 mx-auto p-5 mb-5 border-r-4 border-rose-400 rounded-md">
                    <div className="flex items-center">
                        <h2 className="text-xl font-medium mr-4 text-teal-600">{card.city}</h2>
                        <h2 className="text-xl font-medium mr-4 text-teal-600">|</h2>
                        <h2 className="text-xl font-medium text-teal-600">{card.area}</h2>
                    </div>
                    <div className='flex items-center '>
                        <div className="flex items-center mt-4">
                            <BsFillPersonFill style={{ marginLeft: "10px", marginTop: "3px" }} />
                            <h3 className="text-base font-medium mr-4">{card.name}</h3>
                        </div>
                        <div className="flex items-center mt-4 mx-6">
                            <FaHome style={{ marginLeft: "10px", marginTop: "3px" }} />
                            <h3 className="text-base font-medium mr-4">{card.address}</h3>
                        </div>
                        <div className="flex items-center mt-4">
                            <BsFillTelephoneFill style={{ marginLeft: "10px", marginTop: "1px" }} />
                            <h3 className="text-base font-medium mr-4">{card.phone}</h3>
                        </div>
                        <div className="flex items-center mt-4 ml-6">
                            <MdEmail style={{ marginLeft: "10px", marginTop: "3px" }} />
                            <h3 className="text-base font-medium mr-4">{card.email}</h3>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <AiFillLike style={{ marginLeft: "10px", marginTop: "3px" }} />
                        <h3 className="text-base font-medium mr-4">
                            <ul className='flex items-center'>
                                {card.products.map((item, index) => (
                                    <li key={index} className='mx-4'>{item}</li>
                                ))}
                            </ul>
                        </h3>
                    </div>
                </div>
            ))}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default SearchGmachim;


