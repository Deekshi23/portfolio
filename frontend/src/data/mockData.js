export const getMockData = () => {
  return {
    hero: {
      name: "Deekshithaa",
      role: "MERN Stack Developer",
      description: "A creative B.Sc. Computer Science graduate with expertise in Analytics, Data Science, and MERN Stack development. Passionate about transforming complex data into actionable insights and building scalable web applications that drive organizational growth and success."
    },
    about: {
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "I am a passionate MERN Stack Developer with a solid background in Analytics and Data Science. Currently working as a Full Stack Development Intern at United Technology, I specialize in building modern, scalable web applications with responsive UIs and efficient backend systems.",
      highlights: [
        "Expert in React.js, Node.js, Express.js, and MongoDB",
        "Experience in Data Analytics and Machine Learning",
        "Google certified in Data Analytics and Business Intelligence",
        "Strong problem-solving and leadership skills"
      ]
    },
    experience: [
      {
        id: 1,
        title: "Full Stack Development Intern",
        company: "United Technology",
        location: "Dharapuram",
        duration: "June 2025 - Present",
        description: "Developing and maintaining responsive web applications using HTML, CSS, JavaScript, React, and Node.js. Integrating front-end interfaces with back-end APIs and databases (MongoDB, MySQL) to deliver seamless, dynamic user experiences.",
        technologies: ["React.js", "Node.js", "MongoDB", "MySQL", "JavaScript"]
      }
    ],
    education: [
      {
        id: 1,
        degree: "B.Sc Computer Science",
        institution: "Karunya Institute of Technology and Sciences",
        location: "Coimbatore",
        year: "2025",
        grade: "7.08 CGPA"
      },
      {
        id: 2,
        degree: "Higher Secondary Certificate (HSC)",
        institution: "Cheran Matriculation Higher Sec School",
        location: "Karur",
        year: "2022",
        grade: "70.1%"
      }
    ],
    skills: {
      technical: [
        { name: "React.js", icon: "⚛️", level: 90 },
        { name: "JavaScript", icon: "🟨", level: 85 },
        { name: "Node.js", icon: "🟢", level: 80 },
        { name: "Express.js", icon: "⚡", level: 80 },
        { name: "MongoDB", icon: "🍃", level: 75 },
        { name: "MySQL", icon: "🐬", level: 75 },
        { name: "Python", icon: "🐍", level: 70 },
        { name: "HTML/CSS", icon: "🎨", level: 90 }
      ],
      tools: [
        { name: "VS Code", icon: "💙" },
        { name: "Git & GitHub", icon: "🔀" },
        { name: "Postman", icon: "🚀" },
        { name: "Tableau", icon: "📊" },
        { name: "MS Excel", icon: "📈" }
      ]
    },
    projects: [
      {
        id: 1,
        title: "Quiz App",
        description: "Designed and developed an interactive quiz application with modular code structure and asynchronous requests to deliver a smoother user experience. Features include multiple question types, real-time scoring, and responsive design.",
        technologies: ["HTML", "CSS", "JavaScript", "Java"],
        image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        github: "#",
        demo: "#"
      },
      {
        id: 2,
        title: "Gym Management System",
        description: "Created a comprehensive system for managing memberships, payments, and attendance using optimized database queries. Features include member registration, payment tracking, workout scheduling, and detailed reporting.",
        technologies: ["PHP", "HTML", "CSS", "MySQL"],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        github: "#",
        demo: "#"
      },
      {
        id: 3,
        title: "Fake News Detection",
        description: "Implemented a machine learning model with TF-IDF and hyperparameter tuning to classify news articles and improve detection accuracy. Uses natural language processing techniques to analyze text patterns and identify potentially false information.",
        technologies: ["Python", "Machine Learning", "TF-IDF", "NLP"],
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        github: "#",
        demo: "#"
      }
    ],
    certifications: [
      {
        id: 1,
        title: "Google Data Analytics",
        issuer: "Google Career Certificates",
        year: "2024"
      },
      {
        id: 2,
        title: "Google Business Intelligence",
        issuer: "Google Career Certificates", 
        year: "2024"
      }
    ],
    achievements: [
      "Secured 4th place in the FIT INDIA marathon (300+ participants)",
      "Placed 32nd in the Lavaza Tech Cultural Event '24 chess competition",
      "Awarded 2nd prize in the Tamil Nadu English Proficiency Test",
      "Achieved 3rd place in the District Level 400m Running Championship (2016)"
    ],
    contact: {
      email: "deekshi1323@gmail.com",
      phone: "+91 77086 71827",
      location: "Mohanur, Namakkal-637015",
      social: {
        linkedin: "https://linkedin.com/in/deekshithaa",
        github: "https://github.com/deekshithaa",
        twitter: "https://twitter.com/deekshithaa"
      }
    }
  };
};