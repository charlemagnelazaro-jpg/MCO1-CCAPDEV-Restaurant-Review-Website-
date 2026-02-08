import React from 'react';
import Logo from '../assets/logo.png'
import ProileIcon from '../assets/profile.png'
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-50 h-15 px-6 flex items-center border-b-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center  gap-2">
          <Link to="/">
            <img src={Logo} width='32px'/>
          </Link>
          <p>ArcherEats</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar ></SearchBar>
          <Link to="/profile">
            <img src={ProileIcon} width='32px'/>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
