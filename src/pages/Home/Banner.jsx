import React, { useState } from 'react';
import BannerCard from '../shared/BannerCard';

export const Banner = () => {
    const [feedback, setFeedback] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFeedbackSubmit = () => {
        if (feedback.trim() === '') {
            setErrorMessage('Feedback cannot be empty');
            return;
        }
        // Clear error message if feedback is valid
        setErrorMessage('');
        // Show popup message
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000); // Hide the popup after 3 seconds

        // Clear the feedback input box
        setFeedback('');
    };

    return (
        <div className='bg-teal-100 px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-40'>
                {/* right side */}
                <div className='md:w-1/2 h-full'>
                    <BannerCard />
                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8 bg-teal-100'>
                    <h1 className='lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug'>
                        Welcome to the BookWise <span className='text-blue-700'>Here you will explore Dreams</span>
                    </h1>
                    <p>Find the adventurous world with the help of books and novels. Here you will explore many interesting books. You are just one step behind to your adventurous life.</p>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter your feedback here'
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className='py-2 px-2 rounded-s-sm'
                        />
                        <button
                            className='bg-green-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'
                            onClick={handleFeedbackSubmit}
                        >
                            Submit Feedback
                        </button>
                    </div>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                </div>
            </div>
            {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded shadow-lg'>
                        <p>Feedback submitted successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};
