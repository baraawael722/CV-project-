import React, { useState } from 'react'

export default function Learning() {
  const [activeTab, setActiveTab] = useState('courses')

  const courses = [
    {
      id: 1,
      title: 'Advanced Docker & Kubernetes',
      platform: 'Udemy',
      duration: '12 hours',
      rating: 4.8,
      students: '25k',
      level: 'Advanced',
      progress: 0,
      thumbnail: '🐳',
      priority: 'high'
    },
    {
      id: 2,
      title: 'AWS Cloud Practitioner',
      platform: 'A Cloud Guru',
      duration: '8 hours',
      rating: 4.9,
      students: '50k',
      level: 'Beginner',
      progress: 0,
      thumbnail: '☁️',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Advanced TypeScript',
      platform: 'Frontend Masters',
      duration: '6 hours',
      rating: 4.7,
      students: '15k',
      level: 'Advanced',
      progress: 45,
      thumbnail: '📘',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'GraphQL Complete Guide',
      platform: 'Udemy',
      duration: '10 hours',
      rating: 4.6,
      students: '20k',
      level: 'Intermediate',
      progress: 0,
      thumbnail: '📊',
      priority: 'medium'
    }
  ]

  const projects = [
    {
      id: 1,
      title: 'Build a Microservices App with Docker',
      description: 'Create a multi-container application using Docker Compose',
      difficulty: 'Advanced',
      duration: '3 days',
      skills: ['Docker', 'Node.js', 'React']
    },
    {
      id: 2,
      title: 'Deploy Full Stack App on AWS',
      description: 'Learn to deploy and scale applications on AWS cloud',
      difficulty: 'Intermediate',
      duration: '2 days',
      skills: ['AWS', 'CI/CD', 'DevOps']
    },
    {
      id: 3,
      title: 'Build a GraphQL API',
      description: 'Create a production-ready GraphQL API with authentication',
      difficulty: 'Intermediate',
      duration: '2 days',
      skills: ['GraphQL', 'Node.js', 'MongoDB']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Path 📚</h1>
          <p className="text-lg text-gray-600">Personalized courses and projects to boost your career</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Your Learning Progress</h2>
              <p className="text-lg text-white opacity-95">Keep learning to reach your goals!</p>
            </div>
            <div className="text-6xl font-bold text-white">35%</div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-4">
            <div className="bg-white h-4 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-white opacity-95">Courses Started</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1</div>
              <div className="text-sm text-white opacity-95">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">32h</div>
              <div className="text-sm text-white opacity-95">Learning Time</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            📚 Recommended Courses
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            🚀 Practice Projects
          </button>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-5xl">
                    {course.thumbnail}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                          {course.priority === 'high' && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                              HIGH PRIORITY
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{course.platform}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    <div className="flex gap-6 mb-4 text-sm text-gray-600">
                      <span>⏱️ {course.duration}</span>
                      <span>⭐ {course.rating}</span>
                      <span>👥 {course.students} students</span>
                    </div>

                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
                        {course.progress > 0 ? 'Continue Learning →' : 'Start Course →'}
                      </button>
                      <button className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-full hover:bg-gray-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex gap-4 mb-4 text-sm">
                  <span className={`px-3 py-1 rounded-full font-semibold ${
                    project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    project.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold">
                    ⏱️ {project.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all">
                  Start Project →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
