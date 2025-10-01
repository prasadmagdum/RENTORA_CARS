import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>

            <div className='flex flex-wrap justify-between  items-start gap-8 pb-6 border-borderColor border-b'>
                

                <div>
                    <img src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    </p>
                    <div className='flex items-center gap-3 mt-6S'>
                        <a href="#"><img src={assets.facebook_logo} alt="facebook" className='h-6 w-6'/></a>
                        <a href="#"><img src={assets.twitter_logo} alt="twitter" className='h-6 w-6'/></a>
                        <a href="#"><img src={assets.instagram_logo} alt="instagram" className='h-6 w-6'/></a>
                        <a href="#"><img src={assets.gmail_logo} alt="gmail" className='h-6 w-6'/></a>
                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Link</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Tour Car</a></li>
                        <li><a href="#">About Us</a></li>
                        
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of service</a></li>
                        <li><a href="#">Privicy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                        
                    </ul>
                </div>

                 <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">1234 Luxury Drive</a></li>
                        <li><a href="#"> abcd </a></li>
                        <li><a href="#">645465465465</a></li>
                        <li><a href="#">ie@.com</a></li>
                        
                    </ul>
                </div>


               

                
            </div>
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()}  All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a><span> | </span></li>
                    <li><a href="#">Terms</a><span> | </span></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer