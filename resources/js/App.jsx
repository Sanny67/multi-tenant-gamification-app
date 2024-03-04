import './App.css';
import API from './utils/API';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';


export default function App() {
    const slug = window.location.href.split('/').pop();
    const [tenant, setTenant] = useState({});
    const [loading, setLoading] = useState(true);

    const getTenant = async() => {
        try {
            const response = await API.get('/tenant/'+slug);
            setTenant(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    useEffect(() => {
        if(slug !== ""){
            getTenant();
        }
    }, []);

    return (
        <>
            {slug == "" ? <div className='min-h-screen bg-gray-900 flex justify-center items-center'>
                <h3 className='mb-4 text-white text-4xl font-bold opacity-80 '>Not Found</h3>
            </div> : loading ? <Loader/> :
                <div className='min-h-screen relative bg-gray-900'>
                    <Navbar currentSlug={slug} tenantKey={tenant?.api_key} />
                    {tenant ? <Leaderboard slug={slug}/> : <h3 className="opacity-50 text-white text-center my-20">Tenant Not found</h3>}
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
            }
        </>
    );

    return (
        <div className='min-h-screen relative bg-gray-900'>
            <div className='absolute top-45 right-45 h-[100px] w-[100px]'><Loader/></div>
            {/* <Navbar tenantKey={tenant?.api_key}/>
            {tenant ? <Leaderboard slug={slug}/> : <h3 className="opacity-50 text-white text-center my-20">Tenant Not found</h3>} */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
};

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(<App />);
}