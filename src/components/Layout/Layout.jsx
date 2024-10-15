import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer1 from '../Footer/Footer';


export default function Layout() {

  

  return <>

    <NavBar />
    <div className='py-20 my-6 container mx-auto'>
      <Outlet></Outlet>

    </div>

    <Footer1 />

  </>
}
