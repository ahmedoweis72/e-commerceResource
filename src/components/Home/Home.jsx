import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {

const [state, setstate] = useState(0);
useEffect(() => {

}, [])

  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  
  </>
}
