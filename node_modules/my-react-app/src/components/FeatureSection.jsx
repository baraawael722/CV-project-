import React from 'react';

const FeatureSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">

        {/* Feature 1: Find your passion */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32 reveal" data-delay="1">
          <div>
            <img
              src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
              alt="Find your passion"
              className="w-full h-auto drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find your passion and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                achieve success
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We help you find not just a job, but a career that you'll love. Our advanced AI analyzes your skills, interests, and career goals to match you with opportunities that align with your passion.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Take the first step according to our expert guides and achieve the success you've always dreamed of.
            </p>
          </div>
        </div>

        {/* Feature 2: Million of jobs */}
        <div className="grid lg:grid-cols-2 gap-16 items-center reveal" data-delay="2">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Million of jobs, finds{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                the one thats rights for you
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Explore a world full of opportunity with millions of active job listings from thousands of companies worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're an entry-level candidate or an experienced professional, we have the right job waiting for you.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://illustrations.popsy.co/amber/success.svg"
              alt="Million of jobs"
              className="w-full h-auto drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
