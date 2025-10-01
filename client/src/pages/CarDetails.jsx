// src/pages/CarDetails.jsx
import React, { useEffect } from 'react'

const CarDetails = () => {


   const {id}= useParams();
   const navigate = useNavigate();
   const[car,setCar]= useState(null);

  useEffect(() => {
    setCar(dummyCarData.find((car) => car.id === parseInt(id)));
    scrollTo(0,0);
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }   
  return (
    <div>
      <h1>Car Details Page</h1>
    </div>
  )
}

export default CarDetails
