import React from 'react';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-600 mb-4 flex items-center justify-center gap-3">
            <User className="w-10 h-10" />
            About Me
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main About Text */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 mb-8">
            <p className="text-lg leading-relaxed text-gray-700">
            Software Engineering student in my final semester at Jeddah University, with a strong interest in delivering production-ready solutions and contributing to impactful, real-world work. I have participated in a wide range of projects across different domains. My experience includes JavaScript/TypeScript, React, Next.js, Node.js/Express, REST APIs, MySQL, MongoDB, Git and Docker.   </p>
          </div>


        </div>
      </div>
    </section>
  );
};

export default About;