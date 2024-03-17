import React from 'react';
import { Link } from 'react-router-dom';

const TenantCard = ({tenant}) => {
    return (
        <>
            <Link to={`/${tenant.slug}`} className="inline-block bg-gray-200 rounded-full px-5 py-3 font-semibold text-gray-700 mx-2">{tenant.name}</Link>
        </>
    );
};

export default TenantCard;
