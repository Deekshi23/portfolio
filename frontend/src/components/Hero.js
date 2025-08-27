import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Download, ChevronDown } from "lucide-react";
import { getMockData } from "../data/mockData";

const Hero = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const mockData = getMockData();

  const fullText = `const developer = {
  name: 'Deekshithaa',
  role: 'MERN Stack Developer',
  qualification: 'B.Sc Computer Science',
  skills: [
    'React', 'Node.js', 'MongoDB', 'Express.js',
    'JavaScript', 'Python', 'Data Analytics'
  ],
  passionate: true,
  hireable: function() {
    return this.passionate && this.skills.length >= 5;
  }
};`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Deekshithaa
              </span>
            </h1>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <h2 className="text-xl sm:text-2xl text-gray-300">
                MERN Stack Developer
              </h2>
              <span className="text-blue-400 text-2xl">|</span>
            </div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0">
            {mockData.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Right side - Code snippet */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm ml-4">profile.js</span>
          </div>
          <pre className="text-sm text-gray-300 font-mono leading-relaxed">
            <code>
              {text}
              {showCursor && <span className="text-blue-400">|</span>}
            </code>
          </pre>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400 h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;