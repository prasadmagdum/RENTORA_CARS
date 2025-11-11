


// Function to check the Availiblity

import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkAvailability = async (car , pickupDate , returnDate) => {
    const booking = await Booking.find({
        car,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
    })
    return booking.length === 0;
};

// API to check Availability of a car for the given dates and location 
export const checkCarAvailability = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        //fetch car by location
        const cars= await Car.find({ location , isCarAvailable : true});
        // check availability for each car
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable=await checkAvailability(car._id, new Date(pickupDate), new Date(returnDate));
            return { ...car._doc, isAvailable :isAvailable};
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable);
        res.json({ success: true, data: availableCars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }

};

// API to Book a car
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user; 
        const { carId, pickupDate, returnDate } = req.body;  

        const isAvailable = await checkAvailability(carId, pickupDate, returnDate);
        if (!isAvailable) {
            return res.json({ success: false, message: "Car not available" });
        }

        const car = await Car.findById(carId);
        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        // Calculate price (price per day)
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = noOfDays * car.pricePerDay;

        const booking = await Booking.create({
            car: carId,
            user: _id,  
            owner: car.owner,
            pickupDate: picked,
            returnDate: returned,
            price,
            status: "pending",
        });

        res.json({ success: true, message: "Booking created successfully", data: booking });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }
};


// API to List User Bookings

export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }       
};

// API to List Owner Bookings

export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner'){
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        const booking = await Booking.find({ owner: req.user._id }).populate('car user').select('-user.password').sort({ createdAt: -1 });
        res.json({ success: true, data: booking });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }
    
}

// API to Update Booking Status 
export const changebookingStatus = async (req, res) => {
    try {
        const { _id} = req.user;
        const { bookingId, status } = req.body;
        const booking = await Booking.findById(bookingId);

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Booking not found" });
        }
        booking.status = status;
        await booking.save();
        res.json({ success: true, message: "Booking status updated", data: booking });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }
};