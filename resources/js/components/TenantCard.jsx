import React from 'react';

const TenantCard = ({name}) => {
    return (
        <>
            <div className="inline-block bg-gray-200 rounded-full px-5 py-3 font-semibold text-gray-700 mx-2">{name}</div>
        </>
    );
};

export default TenantCard;
