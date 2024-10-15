import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import useCategory from '../../Hooks/useCategory';



export default function Categories() {

  
 
  let{data,isLoading,isError,error}=useCategory();

 
  

  if (isLoading) {
    return <div className='w-full h-full flex items-center justify-center '><ClimbingBoxLoader color="green" /></div>;
  }
  
  if (isError) {
    return <div className='w-full h-full flex items-center justify-center '><h1>{error}</h1></div>;
  }
  return <>
  
  <div className="row">
   
      {data?.data.data.map((category)=><div key={category._id} className='w-1/2 md:w-1/2 lg:w-1/4 p-5'>
        <img className='w-full h-[300px]' src={category.image} alt={category.title} />
      </div>)}
    </div>
  
  </>
}
