import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Text Content */}
        <div className="reveal" data-delay="1">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Find your job{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              better
            </span>
            <br />
            and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              faster
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
            Find your job that makes you grow both in skills and career and in life.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-white rounded-full shadow-2xl p-2 mb-8 max-w-2xl">
            <svg className="w-6 h-6 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by job title or keyword"
              className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-sm text-gray-600">Job Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">1M+</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative reveal" data-delay="2">
          <div className="relative w-full h-[600px] flex items-center justify-center">

            {/* Main Illustration - Professional Person with Documents */}
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://illustrations.popsy.co/amber/work-from-home.svg"
                alt="Job Search Illustration"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 bg-white rounded-2xl shadow-2xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Application</div>
                  <div className="text-sm font-bold text-gray-900">Accepted!</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-10 bg-white rounded-2xl shadow-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Interview</div>
                  <div className="text-sm font-bold text-gray-900">Tomorrow 10AM</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 left-5 bg-white rounded-2xl shadow-2xl p-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-gray-900">250+</div>
                <div className="text-xs text-gray-500">New<br />Jobs</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
