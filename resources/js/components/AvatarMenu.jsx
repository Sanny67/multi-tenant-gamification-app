import React, { useState } from 'react';
import API from '../utils/API';

const AvatarMenu = ({ currentSlug, tenantKey, setLoginFormOpen, handleClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const copyApiKey = (e) => {
    e.preventDefault();
    setCopiedApiKey(true);
    navigator.clipboard.writeText(tenantKey).then(() => {
      setCopiedApiKey(true);
    }).catch((error) => {
      console.error('Error copying API key: ', error);
    });
    setTimeout(() => {
      setCopiedApiKey(false);
    }, 1500);
  };

  const logout = async(e) => {
    try {
      e.preventDefault();
      const response = await API.post('/tenant/logout');
      if(response.data.status === "success"){
          localStorage.removeItem('token');
          localStorage.removeItem('tenant-slug');
      } else {
          toast.error("Could not log you in.");
      }
      handleClose();
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
  }

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdown"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
            className="w-8 h-8 rounded-full"
            src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
            alt="user photo"
        />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              {localStorage.getItem("token") && localStorage.getItem('tenant-slug') == currentSlug && <a
                href="#"
                onClick={copyApiKey}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >{copiedApiKey ? <span style={{color:"#639b64"}}>Copied!</span> : <span>Copy API Key</span>}</a>}
              
              {(!localStorage.getItem("token")) && <a
                href="#"
                onClick={(e)=> {
                  e.preventDefault();
                  setLoginFormOpen(true);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Sign in?</a>}
              
              {(localStorage.getItem("token")) && <a
                href="#"
                onClick={logout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Logout</a>}
              
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
