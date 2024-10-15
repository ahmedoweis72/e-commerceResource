import React, { useEffect, useState } from 'react'
import styles from './MainSlider.module.css';
import sl1 from '../../assets/images/slider-image-1.jpeg'
import sl2 from '../../assets/images/slider-image-2.jpeg'
import sl3 from '../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";



export default function MainSlider() {


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


const [state, setstate] = useState();
useEffect(() => {

}, [])

  return <>
  
  <div className="row w-10/12 mx-auto flex justify-center items-center ">
    <div className='w-3/4 '>
    <Slider {...settings}>
    <img className='lg:h-[400px]' src={sl3} alt="sl1" />
    <img className='lg:h-[400px]' src={sl2} alt="sl1" />
    <img className='lg:h-[400px]' src={sl1} alt="sl1" />
    </Slider>
    </div>
    <div className='w-1/4 lg:block hidden '>
    <img className='w-[250px] h-[200px]' src={sl3} alt="sl1" />
    <img className='w-[250px] h-[200px]' src={sl2} alt="sl1" />
    </div>
  </div>
  
  </>
}
