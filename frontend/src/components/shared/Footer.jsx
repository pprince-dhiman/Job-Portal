import React from 'react'
import {assets} from '@/assets/assets.js';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002] hover:text-[#6A38C2]'>Portal</span></h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Connecting talent with the right opportunities. Discover jobs that match your passion and skills.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-[#F83002]">Company</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer transition">About Us</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Careers</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Blog</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Contact</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-[#F83002]">Quick Links</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Browse Jobs</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Post a Job</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Dashboard</li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition">Support</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-[#F83002]">Stay Updated</h2>
          <div className="flex items-center border rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#6A38C2] transition">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full outline-none text-sm"
            />
            <button className="bg-[#6A38C2] text-white px-5 py-2 hover:bg-[#F83002] transition">
              Subscribe
            </button>
          </div>
          <div className='flex items-center gap-3 mt-5'>
            <div className="p-2 rounded-full border hover:bg-linear-to-r hover:from-[#f6a08c] hover:to-[#b78eff] hover:scale-110 transition cursor-pointer">
              <img src={assets.instagramIcon} alt="instagram-icon" className="w-5 h-5"/>
            </div>
            <div className="p-2 rounded-full border hover:bg-linear-to-r hover:from-[#f6a08c] hover:to-[#b78eff] hover:scale-110 transition cursor-pointer">
              <img src={assets.twitterIcon} alt="twitter-icon" className="w-5 h-5"/>
            </div>
            <div className="p-2 rounded-full border hover:bg-linear-to-r hover:from-[#f6a08c] hover:to-[#b78eff] hover:scale-110 transition cursor-pointer">
              <img src={assets.linkendinIcon} alt="linkedIn-icon" className="w-5 h-5"/>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © 2026 <span className="text-[#6A38C2] font-medium">JobPortal</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer;