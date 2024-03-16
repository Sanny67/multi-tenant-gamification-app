import React, { useEffect, useState } from 'react';
import TenantCard from './TenantCard';
import API from '../utils/API';

const HomePage = () => {
    const [tenants, setTenants] = useState([]);

    const getTenants = async() => {
        try{
            const response = await API.get('/tenants');
            if (response.data.status === "success") {
              setTenants(response.data.data);
            } else {
              toast.error("Could not fetch tenants.");
            }
          } catch (error) {
            console.error('Error: ', error);
            throw error;
          }
    }
    useEffect(() => {
        getTenants();
    }, []);

    return (
        <div className='min-h-screen bg-gray-900 flex flex-col justify-center items-center'>
            <h3 className='mb-4 text-white text-4xl font-bold opacity-80'>Choose Tenant</h3>
            <div>
            {tenants?.length > 0 && tenants.map((tenant, index) => (
                <TenantCard key={index} name={tenant?.name}/>
            ))}
                
            </div>
        </div>
    );
};

export default HomePage;
