import React, { useState } from 'react';
import AvatarMenu from './AvatarMenu';
import LoginModal from './LoginModal';

const Navbar = ({currentSlug, tenantKey}) => {
    const[loginModalOpen, setLoginModalOpen] = useState(false);
    const handleClose = () => setLoginModalOpen(false);

    return (
        <>
            <nav className="bg-gray-900 py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold">Multi-tenant Gamification App</a>
                </div>
                <div className="flex items-center">
                    {/* <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                    <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a> */}
                    <AvatarMenu currentSlug={currentSlug} tenantKey={tenantKey} setLoginFormOpen={setLoginModalOpen} handleClose={handleClose} />
                </div>
                </div>
            </div>
            </nav>
            <LoginModal isOpen={loginModalOpen} onClose={handleClose} />
        </>
    );
};

export default Navbar;
