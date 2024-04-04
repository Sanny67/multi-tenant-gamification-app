import React, { useEffect, useState, useMemo } from 'react';
import API from '../utils/API';
import UserData from './UserData';
import { useTenantBoard } from '../context/TenantContext';
import { useParams } from 'react-router-dom';

const Leaderboard = () => {
    
    const { slug } = useParams();
    const { users, setCurrentSlug } = useTenantBoard();

    useEffect(() => {
        setCurrentSlug(slug);
    }, [slug]);

    return (
        <>
            <div className="container m-auto p-10 relative">
                <h1 className='mb-10 text-white text-4xl font-bold text-center'>Leaderboard</h1>
                <div className='list'>
                    {users.length > 0 && users.map((user, index) => <UserData key={index} user={user}/>)}
                </div>
                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                XP
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table> */}
            </div>
        </>
    );
};

export default Leaderboard;
