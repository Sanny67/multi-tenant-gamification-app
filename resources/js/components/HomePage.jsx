import React, { Suspense } from 'react';
import TenantCardSection from './TenantCardSection';
import TenantOptionsSkeleton from './skeletons/TenantOptionsSkeleton';

const HomePage = () => {
    return (
        <div className='min-h-screen bg-gray-900 flex flex-col justify-center items-center'>
            <h3 className='mb-4 text-white text-4xl font-bold opacity-80'>Choose Tenant</h3>
            <div>
                <Suspense fallback={<TenantOptionsSkeleton/>}>
                    <TenantCardSection />
                </Suspense>
            </div>
        </div>
    );
};

export default HomePage;
