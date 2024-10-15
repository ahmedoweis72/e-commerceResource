
import React, { useEffect, useState } from 'react'
import {  Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import freshcartLogo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react';
import { userContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContextProvider';




export default function NavBar() {
  let { userLogin, setUserLogin } = useContext(userContext);
  let { GetLoggedusercart,cartDetails} =  useContext(cartContext);
  

 
useEffect(() => {
  GetLoggedusercart()
}, [])



 


  let navigate = useNavigate();
  function Logout(deletToken) {
    deletToken(null);
    navigate('/login');
    localStorage.removeItem('userToken')
  }


  return <>



    <Navbar className='fixed z-50 top-0 left-0 right-0 bg-slate-100' >

      <nav className=' w-full'>
        <div className='container mx-auto py-2 flex flex-col md:flex-row justify-between text-center '>


          <div className=' flex flex-row flex-wrap justify-between'>
            <Navbar.Brand >
              <img src={freshcartLogo} className="mr-3 h-6 sm:h-9  lg:h-9" alt="freshcartLogo" />
            </Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse>
              <ul className=' flex flex-col md:flex-row justify-between'>
                {userLogin !== null ? <>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to=''>Home</NavLink></li>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/cart'>Cart{cartDetails?.numOfCartItems}</NavLink></li>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/Products'>Products</NavLink></li>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/brands'>Brands</NavLink></li>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/categories'>Categories</NavLink></li>


                </> : null}
              </ul>
            </Navbar.Collapse>
          </div>
          <Navbar.Collapse  >

            <div>
              <ul className=' flex flex-col md:flex-row justify-between'>

                {userLogin === null ? <>

                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/login'>Login</NavLink></li>
                  <li className='flex items-center justify-center'><NavLink className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg   text-slate-900 font-semibold' to='/register'>Register</NavLink></li>
                </> : <><li onClick={() => { Logout(setUserLogin) }} className='flex items-center justify-center'><span className='lg:mx-2 md:px-1  py-2 lg:text-lg sm:text-lg cursor-pointer  text-slate-900 font-semibold' >LogOut</span></li></>
                }
                <li className='flex items-center justify-center'><i className='fab lg:mx-2  fa-facebook'></i>
                  <i className='fab mx-2 fa-instagram'></i>
                  <i className='fab mx-2 fa-twitter'></i>
                  <i className='fab mx-2 fa-youtube'></i>
                  <i className='fab mx-2 fa-tiktok'></i></li>


              </ul>
            </div>
          </Navbar.Collapse>

        </div>
      </nav>
    </Navbar>



  </>
}
