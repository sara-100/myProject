import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import server from '../server/server';

export default function EditPost() {
    const navigate = useNavigate();
    const [card, setCard] = useState({});
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const postId = pathname.split('/').pop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await server.getProduct('products', postId);
                setCard(data);
                setEditedData({
                    city: data.city,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    numPills: data.numPills,
                    pricePerPills: data.pricePerPills,
                    remarks: data.remarks,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveChanges = async () => {
        try {
            await server.editProduct('products', postId, editedData);
            setIsEditing(false);
            navigate('/user');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className="min-h-screen  bg-white flex flex-col justify-center items-center">
            <div dir="rtl" className="static card-body w-1/2 bg-base-100 shadow-xl shadow-rose-300 mx-auto max-h-96">
                <div className="overflow-x-auto card-body p-4">
                    <div className="flex justify-between ">
                        <div className="flex ml-4">
                            <BsFillPersonFill style={{ marginLeft: '10px', marginTop: '1px', fontSize: '1.5em' }} />
                            <h3 className="text-lg font-medium">{card.name}</h3>
                        </div>
                        <div className="flex">
                            {isEditing ? (
                                <button
                                    className="flex-grow btn btn-primary btn-sm bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0"
                                    onClick={saveChanges}>שמור</button>
                            ) : (
                                <button
                                    className="flex-grow btn btn-primary btn-sm bg-rose-400 hover:bg-gray-800 text-gray-800 hover:text-white border-0"
                                    onClick={toggleEdit}>ערוך</button>
                            )}
                        </div>
                    </div>
                    <table className="table text-start text-base">
                        <tbody>
                            <tr>
                                <th className="text-start">עיר</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.city}
                                            onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.city
                                    )}
                                </td>
                                <th className="text-start">כתובת</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.address}
                                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.address
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th className="text-start">טלפון</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.phone}
                                            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.phone
                                    )}
                                </td>
                                <th className="text-start">מייל</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedData.email}
                                            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.email
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th className="text-start">מס' כדורים</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editedData.numPills}
                                            onChange={(e) => setEditedData({ ...editedData, numPills: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.numPills
                                    )}
                                </td>
                                <th className="text-start">מחיר לכדור</th>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editedData.pricePerPills}
                                            onChange={(e) => setEditedData({ ...editedData, pricePerPills: e.target.value })}
                                            className="input input-bordered h-7"
                                        />
                                    ) : (
                                        card.pricePerPills
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="ml-8">
                    <h4 className="font-medium">
                        הערות:{" "}
                        <span className="font-normal">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.remarks}
                                    onChange={(e) => setEditedData({ ...editedData, remarks: e.target.value })}
                                    className="input input-bordered h-7 w-full"
                                />
                            ) : (
                                card.remarks
                            )}
                        </span>
                    </h4>
                </div>
            </div>
        </div>
    );
}
