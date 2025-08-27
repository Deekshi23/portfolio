import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { getMockData } from "../data/mockData";

const About = () => {
  const mockData = getMockData();
  const { about } = mockData;

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl">
                <img
                  src={about.profileImage}
                  alt="Deekshithaa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-emerald-400/20"></div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {about.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Key Highlights:</h3>
              <div className="space-y-3">
                {about.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Certifications</h4>
                <div className="space-y-2">
                  {mockData.certifications.map((cert) => (
                    <Badge
                      key={cert.id}
                      variant="secondary"
                      className="bg-blue-600 text-white hover:bg-blue-700 mr-2 mb-2"
                    >
                      {cert.title} - {cert.issuer}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;