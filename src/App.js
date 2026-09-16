import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Routes>
          {/* Home route with all sections */}
          <Route
            path="/"
            element={
              <main>
                <About />
                <Skills />
                <Projects />
                <Education />
              </main>
            }
          />
          {/* Blog listing page */}
          <Route path="/blogs" element={<Blogs />} />
          {/* Individual blog post */}
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
        
        {/* Footer */}
        <footer className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-600 mb-2">Faisal Al-Mutairi</h3>
                <p className="text-gray-600">Full-Stack Developer</p>
              </div>
              
              <div className="flex justify-center gap-6 mb-6 flex-wrap">
                <a 
                  href="https://www.linkedin.com/in/ifaisal-swe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://x.com/_21fl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  X 
                </a>
                <a 
                  href="https://github.com/ifaisal-swe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  GitHub
                </a>
              </div>
              
              <div className="text-gray-500 text-sm">
                © 2026 Faisal Al-Mutairi. Built with React
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;