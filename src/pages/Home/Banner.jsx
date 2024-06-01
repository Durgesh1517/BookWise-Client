import React from 'react'
import BannerCard from '../shared/BannerCard'

export const Banner = () => {
    return (
        <div className=' bg-teal-100  px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-40'>
                {/* right side */}
                <div className='md:w-1/2 h-full'>
                    <BannerCard />
                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8 bg-teal-100'>
                    <h1 className='lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug'>Welcome to the BookWise <span className='text-blue-700'>Here you will explore Dreams</span></h1>
                    <p>Find the adventuries world with the help of Book and novals.Here you will explore so many intresting books.You are just one step behind to your adventuries life.</p>
                    <div>
                        <input type="search" placeholder='Search a book here' className='py-2 px-2 rounded-s-sm' />
                        <button className='bg-green-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Press to Explore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
