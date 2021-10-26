import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  
  {
    title: 'Registrar Productos',
    path: '/registrar-producto',
    icon: <FaIcons.FaGg/>,
    cName: 'nav-text'
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: <IoIcons.IoIosFitness/>,
    cName: 'nav-text'
  },
  {
    title: 'Registrar Vendedores',
    path: '/registrar-vendedor',
    icon: <FaIcons.FaHubspot/>,
    cName: 'nav-text'
  },
  {
    title: 'Vendedores',
    path: '/vendedores',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Registrar Ventas',
    path: '/ventas',
    icon: <FaIcons.FaHornbill/>,
    cName: 'nav-text'
  },
  {
    title: 'Ventas',
    path: '/ventas',
    icon: <IoIcons.IoIosCart/>,
    cName: 'nav-text'
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
