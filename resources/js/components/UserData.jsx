import React from 'react';
import { BASE_URL } from '../utils/API';

const UserData = ({user}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.rank}
            </th>
            <td className="px-6 py-4 flex items-center">
                <img className="mr-2 w-10 h-10 rounded-full" src={`${BASE_URL}/storage/${user.image}`} alt="User avatar"/>
                {user.name}
            </td>
            <td className="px-6 py-4">
                {user.xp_points}
            </td>
        </tr>
    );
};

export default UserData;
