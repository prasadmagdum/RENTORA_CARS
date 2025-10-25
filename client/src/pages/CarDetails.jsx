// src/pages/CarDetails.jsx
import React, { useEffect, useState } from 'react'
import{useNavigate , useParams} from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';

const CarDetails = () => {


   const {id}= useParams();
   const navigate = useNavigate();
   const[car,setCar]= useState(null);

  useEffect(() => {
    setCar(dummyCarData.find(car => car._id === id))
    scrollTo(0,0);
  }, [id])
 
  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onclick={()=> navigate(-1) } className='flex items-center gap-2 text-gray-500 mb-6 cursor-pointer'>
        
        <img src={assets.arrow_icon} alt=" " className='rotate-180 opacity-65'/>
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3  gap-8 lg:gap-12'>
        {/* Left section - car images */}
        <div className='lg:col-span-2'>
          <img src={car.images[0]} alt={car.name} className='w-full h-96 object-cover rounded-lg mb-4'/>
          <div className='grid grid-cols-3 gap-4'>
            {car.images.slice(1).map((img, index) => (  
              <img key={index} src={img} alt={`${car.name} ${index + 2}`} className='w-full h-32 object-cover rounded-lg'/>
            ))}
          </div>

        </div>

      </div>


    </div>
    
  ) : <p>Loading...</p>
}

export default CarDetails
