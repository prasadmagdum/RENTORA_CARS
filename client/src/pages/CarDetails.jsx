import React, { useEffect } from 'react'
import { assets } from '../assets/assets';
import { dummyCarData } from '../assets/assets';

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


    </div>
    
  ) : <p>Loading...</p>
}

export default CarDetails
