import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { getMockData } from "../data/mockData";

const Experience = () => {
  const mockData = getMockData();
  const { experience, education, achievements } = mockData;

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experience Section */}
          <div>
            <div className="flex items-center mb-6">
              <Briefcase className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Experience</h3>
            </div>
            
            <div className="space-y-6">
              {experience.map((exp) => (
                <Card key={exp.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{exp.title}</CardTitle>
                    <div className="space-y-2">
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.duration}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-emerald-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Education</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              {education.map((edu) => (
                <Card key={edu.id} className="bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{edu.degree}</CardTitle>
                    <div className="space-y-2">
                      <p className="text-emerald-400 font-semibold">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {edu.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.year}
                        </div>
                        <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                          {edu.grade}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Achievements */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">{achievement}</p>
                    </div>
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

export default Experience;