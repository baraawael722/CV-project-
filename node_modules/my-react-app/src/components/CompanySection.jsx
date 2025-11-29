import React from 'react';

const companies = [
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000000' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta/0081FB' },
  { name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix/E50914' },
  { name: 'Tesla', logo: 'https://cdn.simpleicons.org/tesla/CC0000' },
  { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
  { name: 'Coca Cola', logo: 'https://logo.clearbit.com/coca-cola.com' },
  { name: 'Starbucks', logo: 'https://logo.clearbit.com/starbucks.com' },
  { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
  { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' }
];

const CompanySection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 reveal" data-delay="1">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Over{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              10,000 top
            </span>
            <br />
            companies join with us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a community with staff, pensions, as well as other benefits, we will always be the best choice for your career.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center reveal-gentle" data-delay="2">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 w-full h-32 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                title={company.name}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 reveal" data-delay="3">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            View All Companies →
          </button>
        </div>

      </div>
    </section>
  );
};

export default CompanySection;
