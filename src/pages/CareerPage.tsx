import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Palette, Database, Smartphone, Mail, Github, Linkedin, 
  CheckCircle, Briefcase, Award, TrendingUp, Users
} from 'lucide-react';
import { Button } from '@/components/common/Button';

const CareerPage: React.FC = () => {
  const skills = [
    { name: 'React & TypeScript', level: 95 },
    { name: 'Node.js & Express', level: 90 },
    { name: 'Firebase & MongoDB', level: 88 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'REST APIs & GraphQL', level: 87 },
    { name: 'Git & DevOps', level: 82 }
  ];

  const projects = [
    {
      title: 'This E-Commerce Platform',
      description: 'Full-stack React application with Firebase, Redux, and real-time features',
      highlights: ['User Authentication', 'Shopping Cart', 'Product Management', 'Task System']
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach with Tailwind CSS and modern UI patterns',
      highlights: ['Accessibility', 'Performance', 'SEO Optimization', 'Cross-browser Support']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hire Justin Wold
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Full-Stack Developer | React Specialist | Problem Solver
            </p>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              If you love the quality of this e-commerce platform and are looking for a dedicated 
              developer to bring similar excellence to your projects, let's talk!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="mailto:Justin.wold88@gmail.com">
                <Button
                  variant="outline"
                  leftIcon={<Mail />}
                  className="bg-white text-primary-600 hover:bg-gray-100 border-white"
                >
                  Email Me
                </Button>
              </a>
              <a href="tel:+12063493679">
                <Button
                  variant="outline"
                  leftIcon={<Briefcase />}
                  className="bg-white/10 text-white hover:bg-white/20 border-white"
                >
                  Call: (206) 349-3679
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* What I Bring */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What I Bring to Your Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Code className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clean Code</h3>
              <p className="text-gray-600">
                Maintainable, well-documented code following industry best practices and design patterns.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Palette className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design Skills</h3>
              <p className="text-gray-600">
                Strong eye for design with ability to implement beautiful, responsive interfaces.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Learner</h3>
              <p className="text-gray-600">
                Quick to adapt to new technologies and frameworks as project needs evolve.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Team Player</h3>
              <p className="text-gray-600">
                Collaborative mindset with excellent communication and problem-solving skills.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="skill-bar bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full transition-all duration-1000"
                      data-skill-level={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <Award className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technologies I Use</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div>
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">React & Next.js</p>
              </div>
              <div>
                <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">TypeScript</p>
              </div>
              <div>
                <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Firebase</p>
              </div>
              <div>
                <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">MongoDB</p>
              </div>
              <div>
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Tailwind CSS</p>
              </div>
              <div>
                <Code className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Node.js</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how I can contribute to your team's success.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <a href="mailto:Justin.wold88@gmail.com" className="inline-block">
                <Button
                  variant="outline"
                  leftIcon={<Mail />}
                  className="bg-white text-primary-600 hover:bg-gray-100 border-white"
                >
                  Justin.wold88@gmail.com
                </Button>
              </a>
              <a href="tel:+12063493679" className="inline-block">
                <Button
                  variant="outline"
                  leftIcon={<Briefcase />}
                  className="bg-white/10 text-white hover:bg-white/20 border-white"
                >
                  (206) 349-3679
                </Button>
              </a>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/justinwols88"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Justin's GitHub profile"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Justin's LinkedIn profile"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
