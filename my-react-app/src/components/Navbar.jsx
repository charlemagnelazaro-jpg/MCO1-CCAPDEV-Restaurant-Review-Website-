import React from 'react';
import Logo from '../assets/logo.png'
import SearchBar from './SearchBar';


const Navbar = () => {
  return (
    <div className="flex">
      <img src={Logo} width='32px'/>
      <p>Archer Eats</p>
      <SearchBar></SearchBar>
    </div>
  );
};

export default Navbar;
