import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/API';
import TenantCard from './TenantCard';

const TenantCardSection = () => {
    const [tenants, setTenants] = useState([]);

    const getTenants = async () => {
        try {
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
    };

    useEffect(() => {
        getTenants();
    }, []);

    return (
        <div>
            {tenants?.length > 0 && tenants.map((tenant, index) => (
                <TenantCard key={index} name={tenant?.name}/>
            ))}
        </div>
    );
};

export default TenantCardSection;
