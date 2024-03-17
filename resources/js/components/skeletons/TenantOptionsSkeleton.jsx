import React from 'react';

const TenantOptionsSkeleton = () => {
    const skeletonClasses = "skeleton-box inline-block bg-gray-400 rounded-full px-5 py-3 font-semibold text-gray-700 mx-2 w-[180px]";
    return (
        <>
            <div className={skeletonClasses}>&nbsp;&nbsp;</div>
            <div className={skeletonClasses}>&nbsp;&nbsp;</div>
        </>
    );
};

export default TenantOptionsSkeleton;
