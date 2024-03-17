import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import API from '../utils/API';
import { toast } from 'react-toastify';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {

    const [currentSlug, setCurrentSlug] = useState("");
    const [currentTenant, setCurrentTenant] = useState({});
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        if(currentSlug !== "") fetchTenantUsers();
    }, [currentSlug]);

    const fetchTenantUsers = async () => {
        try {
            const { data } = await API.get('/users/'+currentSlug);
            if(data.status === 'success'){
                setCurrentTenant(data.data.tenant);
                setUserList([...data.data.users]);
            }
        } catch (error) {
            toast.error("Failed to fetch tenant users");
            console.error('Failed to fetch tenant users:', error);
        }
    };

    const users = useMemo(() => {
        return userList ? userList?.map(
            ({ id, name, image, xp_points, created_at, updated_at }, key) => ({
                "_id": id,
                "rank": key + 1,
                "name": name,
                "image": image,
                "xp_points": xp_points,
                "created_at": created_at,
                "updated_at": updated_at
            })
        ) : [];
    }, [userList]);

    return (
        <TenantContext.Provider value={{ currentTenant, currentSlug, setCurrentSlug, users }}>
            {children}
        </TenantContext.Provider>
    );
};


export const useTenantBoard = () => useContext(TenantContext);
