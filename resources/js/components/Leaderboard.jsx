import React, { useEffect, useState, useMemo } from 'react';
import API from '../utils/API';
import UserData from './UserData';

const Leaderboard = ({slug}) => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async() => {
        try {
            const response = await API.get('/users/'+slug);
            setUserList(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const users = useMemo(() => userList?.data ? userList?.data?.map(
        ({ id, name, image, xp_points, created_at, updated_at }, key) => ({
            "_id": id,
            "rank": key + 1,
            "name": name,
            "image": image,
            "xp_points": xp_points,
            "created_at": created_at,
            "updated_at": updated_at
        })
    ) : [], [userList]);

    return (
        <>
            <div className="container m-auto p-10 relative">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        {users.length > 0 && users.map((user, index) => <UserData key={index} user={user}/>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Leaderboard;
