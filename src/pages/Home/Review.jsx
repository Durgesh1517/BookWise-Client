import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// react icons
import { FaStar } from 'react-icons/fa6';
import { Avatar } from 'flowbite-react';
import profile from "../../assets/profile.jpg";

const reviews = [
    {
        stars: 5,
        text: "This company provided exceptional service! Their attention to detail and customer care was outstanding. Highly recommend!.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: profile
    },
    {
        stars: 5,
        text: "Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.",
        name: "Sarah Johnson",
        position: "Marketing Director, XYZ Ltd.",
        image: profile
    },
    {
        stars: 5,
        text: "Great quality and fantastic customer support. I will definitely be coming back for more!.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.Very happy with the service.",
        name: "David Lee",
        position: "Product Manager, DEF Inc.",
        image: profile
    },
    {
        stars: 5,
        text: "I was thoroughly impressed with the level of service and quality. Everything was delivered on time and exceeded expectations.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.",
        name: "Emily Davis",
        position: "Operations Manager, GHI Co.",
        image: profile
    },
    {
        stars: 5,
        text: "This company provided exceptional service! Their attention to detail and customer care was outstanding. Highly recommend!.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: profile
    },
    {
        stars: 5,
        text: "This company provided exceptional service! Their attention to detail and customer care was outstanding. Highly recommend!.Amazing experience! The team was professional, responsive, and went above and beyond to meet our needs.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: profile
    },
];

const Review = () => {
    return (
        <div className='my-12 px-4 lg:px-24'>
            <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

            {/* reviews card */}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                className="mySwiper"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index} className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                {[...Array(review.stars)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            {/* texts */}
                            <div className='mt-7'>
                                <p className='mb-5'>{review.text}</p>
                                <Avatar
                                    alt={`avatar of ${review.name}`}
                                    img={review.image}
                                    rounded
                                    className='w-10 mb-4'
                                />
                                <h5 className='text-lg font-medium'>{review.name}</h5>
                                <p className='text-sm'>{review.position}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='h-20'></div>
        </div>
    );
}

export default Review;
