import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="z-40 fixed items-center w-full h-16 bg-white shadow-sm">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-auto">
            <a href='/' className="text-3xl ml-2 lg:ml-10 font-bold text-blue-800">
              Unlimi<span className="text-red-600">.</span>
            </a>
         
          </div>
          <div className="relative  flex items-center justify-end w-1/4 p-1 sm:mr-0 sm:right-auto">
            <FontAwesomeIcon icon={faBell} className="text-gray-500 text-lg h-4 w-4 mr-4" />
            <a href="/" className="relative block">
              <Image
              width={6}
                height={6}
                unoptimized
                alt="profile"
                src="/images/f1.jpg"
                className="mx-auto object-cover rounded-full h-6 w-6"
              />
            </a>
            <h1 className=" hidden lg:flex text-sm ml-3 text-black  items-center">
              Deko
              
            </h1>
            <FontAwesomeIcon icon={faChevronDown} className="ml-2 hidden lg:flex text-sm text-gray-500 h-4 w-4 mr-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
