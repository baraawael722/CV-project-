import React from 'react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Software Engineer',
    company: 'Google',
    avatar: 'SM',
    rating: 5,
    text: 'I was skeptical when applying first, but after only a week I landed my dream job at Google. The matching algorithm is incredibly accurate!',
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'James Chen',
    role: 'Product Designer',
    company: 'Meta',
    avatar: 'JC',
    rating: 5,
    text: 'The platform made the job search so much easier. I loved being able to see all suitable positions in one place. Got my job offer in 2 weeks!',
    color: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    company: 'Netflix',
    avatar: 'ER',
    rating: 5,
    text: 'JobCompass helped me transition from a different field into data science. The skill gap analysis was a game-changer for my career!',
    color: 'from-pink-400 to-pink-600'
  }
];

const TestimonialSection = () => {
  return (
    <section className="relative py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 reveal" data-delay="1">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our users say about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reveal-gentle"
              data-delay={index + 1}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8 italic text-lg">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role} @ {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-12 reveal" data-delay="4">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
