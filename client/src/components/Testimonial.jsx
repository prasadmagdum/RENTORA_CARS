import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
    },
    {
      name: "Liam Smith",
      location: "London, UK",
      image: assets.testimonial_image_2,
      testimonial:
        "A seamless experience! Booking was easy, and the quality exceeded my expectations. I’ll definitely book again.",
    },
    {
      name: "Sophia Lee",
      location: "New York, USA",
      image: assets.testimonial_image_1,
      testimonial:
        "Fantastic service and luxury experience. Every detail was taken care of, making my trip stress-free and enjoyable.",
    },
  ]

  return (
    <div className="flex flex-col items-center py-18 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subtitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-500"
          >
            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-lg font-semibold">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star-icon"
                    className="w-4 h-4"
                  />
                ))}
            </div>

            {/* Testimonial text */}
            <p className="text-gray-600 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
