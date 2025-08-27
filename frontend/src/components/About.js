import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { getMockData } from "../data/mockData";

const About = () => {
  const [fileId, setFileId] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get mock data which includes the fallback profile image
  const mockData = getMockData();
  const { about } = mockData;

  useEffect(() => {
    const fetchProfileImage = async () => {
      // In production (GitHub Pages), skip API call and use fallback image directly
      if (process.env.NODE_ENV === 'production') {
        setIsLoading(false);
        setImageError(true); // This will trigger fallback image usage
        return;
      }

      try {
        setIsLoading(true);
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/latest-image`);
        setFileId(res.data.file_id);
        setImageError(false);
      } catch (err) {
        console.warn("Could not fetch uploaded profile image, using fallback:", err.response?.data?.detail || err.message);
        setImageError(true);
        // Don't set fileId to null here - we'll use the fallback image
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

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
                {isLoading ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                  </div>
                ) : fileId && !imageError ? (
                  <img
                    src={`http://127.0.0.1:8000/api/profile/image/${fileId}`}
                    alt="Deekshithaa"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : about.profileImage ? (
                  <img
                    src={about.profileImage}
                    alt="Deekshithaa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
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
