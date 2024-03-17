import React, { Suspense } from 'react';

const TenantCardSection = React.lazy(() => import('./TenantCardSection'));

const HomePage = () => {
    return (
        <div className='min-h-screen bg-gray-900 flex flex-col justify-center items-center'>
            <h3 className='mb-4 text-white text-4xl font-bold opacity-80'>Choose Tenant</h3>
            <div>
                <Suspense fallback={<div className='text-white'>Loading...</div>}>
                    <TenantCardSection />
                </Suspense>
            </div>
        </div>
    );
};

export default HomePage;
