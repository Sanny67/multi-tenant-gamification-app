import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/API';
import TenantCard from './TenantCard';
import TenantOptionsSkeleton from './skeletons/TenantOptionsSkeleton';

const TenantCardSection = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTenants = async () => {
            try {
                const response = await API.get('/tenants');
                if (response.data.status === "success") {
                    setTenants(response.data.data);
                } else {
                    toast.error("Could not fetch tenants.");
                }
            } catch (error) {
                toast.error("Could not fetch tenants.");
                console.error('Error: ', error);
                throw error;
            } finally {
                setLoading(false);
            }
        }
        getTenants();
    }, []);

    const [tenants, setTenants] = useState([]);

    return (
        <div>
            {loading ? (
                <TenantOptionsSkeleton/>
            ) : (
                tenants?.length > 0 && tenants.map((tenant, index) => (
                    <TenantCard key={index} tenant={tenant}/>
                ))
            )}

        </div>
    );
};

export default TenantCardSection;
