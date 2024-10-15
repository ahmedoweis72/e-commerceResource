import React from 'react'
import Slider from 'react-slick';
import { ClimbingBoxLoader } from 'react-spinners';
import useCategory from '../../Hooks/useCategory';

export default function CategorySlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,

        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

 let{data,isLoading,isError,error}=useCategory();
 if (isLoading) {
  return <div className='w-full h-full flex items-center justify-center '><ClimbingBoxLoader color="green" /></div>;
}

if (isError) {
  return <div className='w-full h-full flex items-center justify-center '><h1>{error}</h1></div>;
}

  return <>

    <div className='py-5'>
      <h2 className='py-2 text-font-semibold text-2xl'>shop popular categories</h2>
      <Slider {...settings}>
          {data?.data.data.map((categorie,index) =>
       
            <div key={index} className='sm:w-80 md:w-full text-center mx-auto'>
              <img className='w-full h-[200px] ' src={categorie.image} alt={categorie.name} />
              <h3>{categorie.name}</h3>
            </div>
          )}

    
      </Slider>
    </div>

  </>
}
