import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { TbPackages } from "react-icons/tb";
import { FaTruck } from "react-icons/fa";

export const NavbarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Packages',
    path: '/packages',
    icon: <TbPackages />,
    cName: 'nav-text'
  },
  {
    title: 'Couriers',
    path: '/couriers',
    icon: <FaTruck />,
    cName: 'nav-text'
  },
];