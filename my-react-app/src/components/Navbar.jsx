import React from 'react';
import Logo from '../assets/logo.png'
import ProileIcon from '../assets/profile.png'
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Link to="/">
          <img src={Logo} width='32px'/>
        </Link>
        <p>Archer Eats</p>
      </div>
      <div className="flex">
        <SearchBar></SearchBar>
        <Link to="/profile">
          <img src={ProileIcon} width='32px'/>
        </Link>
        
      </div>
    </div>
  );
};

export default Navbar;
