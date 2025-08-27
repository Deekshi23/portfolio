import React from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { getMockData } from "../data/mockData";
import { 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Palette,
  Brain,
  GitBranch,
  Zap
} from "lucide-react";

const Skills = () => {
  const mockData = getMockData();
  const { skills } = mockData;

  const skillIcons = {
    "React.js": <Code2 className="w-8 h-8 text-blue-400" />,
    "JavaScript": <Globe className="w-8 h-8 text-yellow-400" />,
    "Node.js": <Server className="w-8 h-8 text-green-400" />,
    "Express.js": <Zap className="w-8 h-8 text-gray-400" />,
    "MongoDB": <Database className="w-8 h-8 text-green-500" />,
    "MySQL": <Database className="w-8 h-8 text-blue-500" />,
    "Python": <Brain className="w-8 h-8 text-yellow-500" />,
    "HTML/CSS": <Palette className="w-8 h-8 text-orange-400" />
  };

  const toolIcons = {
    "VS Code": <Code2 className="w-6 h-6 text-blue-500" />,
    "Git & GitHub": <GitBranch className="w-6 h-6 text-orange-500" />,
    "Postman": <Server className="w-6 h-6 text-orange-400" />,
    "Tableau": <Database className="w-6 h-6 text-blue-600" />,
    "MS Excel": <Palette className="w-6 h-6 text-green-600" />
  };

  return (
    <section id="skills" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto"></div>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.technical.map((skill, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {skillIcons[skill.name] || <Code2 className="w-8 h-8 text-blue-400" />}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">{skill.name}</h4>
                  <div className="space-y-2">
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-700"
                    />
                    <p className="text-sm text-gray-400">{skill.level}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Tools I Use</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.tools.map((tool, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    {toolIcons[tool.name] || <Code2 className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <p className="text-sm font-medium text-white">{tool.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;