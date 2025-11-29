import React from 'react';

const ContactSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 reveal" data-delay="1">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get started now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create an account and start your dream job hunting journey today
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 reveal-gentle" data-delay="2">
          <form className="space-y-6">

            {/* Email Input */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Submit
              </button>
            </div>

            {/* Terms */}
            <p className="text-center text-sm text-gray-600">
              By signing up you agree to our{' '}
              <a href="#" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors">
                Terms & Conditions
              </a>
            </p>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
