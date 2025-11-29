import React, { useState } from 'react'

export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const [savedJobs, setSavedJobs] = useState([])

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      match: 95,
      logo: '🚀',
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$70k - $100k',
      match: 88,
      logo: '💻',
      skills: ['React', 'JavaScript', 'CSS'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'MegaTech Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$90k - $140k',
      match: 82,
      logo: '🌟',
      skills: ['React', 'Node.js', 'MongoDB'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'React Native Developer',
      company: 'AppWorks',
      location: 'Remote',
      type: 'Contract',
      salary: '$60/hour',
      match: 78,
      logo: '📱',
      skills: ['React Native', 'JavaScript', 'Firebase'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'UI/UX Engineer',
      company: 'DesignHub',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$75k - $110k',
      match: 75,
      logo: '🎨',
      skills: ['React', 'Figma', 'Tailwind'],
      posted: '1 week ago'
    }
  ]

  const toggleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Opportunities 💼</h1>
          <p className="text-lg text-gray-600">Find your perfect match based on your skills</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
                filter === 'all' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('remote')}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
                filter === 'remote' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              🌍 Remote
            </button>
            <button
              onClick={() => setFilter('fulltime')}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
                filter === 'fulltime' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              💼 Full-time
            </button>
            <button
              onClick={() => setFilter('saved')}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
                filter === 'saved' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              ⭐ Saved ({savedJobs.length})
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                  {job.logo}
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-lg text-gray-600">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-4 py-2 rounded-full font-bold text-lg ${
                        job.match >= 90 ? 'bg-green-100 text-green-700' :
                        job.match >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {job.match}% Match
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    <span className="flex items-center gap-1">💼 {job.type}</span>
                    <span className="flex items-center gap-1">💰 {job.salary}</span>
                    <span className="flex items-center gap-1">🕒 {job.posted}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md">
                      Apply Now →
                    </button>
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`px-6 py-3 font-bold rounded-full transition-all shadow-sm ${
                        savedJobs.includes(job.id)
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {savedJobs.includes(job.id) ? '⭐ Saved' : '🤍 Save'}
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition-all shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
