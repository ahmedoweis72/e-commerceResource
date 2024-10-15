import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';


export default function Brands() {

  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

let {data,isLoading,isError,error} =useQuery({
  queryKey:['getbrands'],
  queryFn:getAllBrands
})
if (isLoading) {
  return <div className='w-full h-full flex items-center justify-center '><ClimbingBoxLoader color="green" /></div>;
}

if (isError) {
  return <div className='w-full h-full flex items-center justify-center '><h1>{error}</h1></div>;
}

  return <>
  
  <div className="row">
   
      {data?.data.data.map((brand)=><div key={brand._id} className='w-1/2 md:w-1/5 lg:w-1/6'>
        <img src={brand.image} alt="" />
      </div>)}
    </div>
  
  
  </>
}
