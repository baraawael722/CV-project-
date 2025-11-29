import React, { useState } from 'react'

export default function Skills() {
  const [cvUploaded, setCvUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCvUploaded(true)
    }
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  const existingSkills = [
    { name: 'React', level: 90, status: 'strong' },
    { name: 'JavaScript', level: 85, status: 'strong' },
    { name: 'HTML/CSS', level: 95, status: 'strong' },
    { name: 'Node.js', level: 70, status: 'good' },
    { name: 'Git', level: 80, status: 'good' },
    { name: 'TypeScript', level: 60, status: 'moderate' }
  ]

  const missingSkills = [
    { name: 'Docker', priority: 'high', reason: 'Required in 80% of job matches' },
    { name: 'Kubernetes', priority: 'high', reason: 'Growing demand in market' },
    { name: 'AWS', priority: 'medium', reason: 'Cloud skills are valuable' },
    { name: 'GraphQL', priority: 'medium', reason: 'Trending technology' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Skills & CV Analyzer 💡</h1>
          <p className="text-lg text-gray-600">Upload your CV to get personalized skill insights</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <label htmlFor="cv-upload" className="block">
                <div className={`border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  cvUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}>
                  <div className="text-6xl mb-4">
                    {cvUploaded ? '✅' : '📄'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cvUploaded ? 'CV Uploaded Successfully!' : 'Upload Your CV'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {cvUploaded ? 'Ready to analyze' : 'PDF, DOC, or DOCX (Max 5MB)'}
                  </p>
                  {!cvUploaded && (
                    <span className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
                      Choose File
                    </span>
                  )}
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>

              {cvUploaded && !analyzed && (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {analyzing ? '🔄 Analyzing...' : '🚀 Analyze My Skills'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analyzed && (
          <>
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-8 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Skill Score</h2>
                  <p className="text-lg opacity-90">Based on current market demands</p>
                </div>
                <div className="text-6xl font-bold">78/100</div>
              </div>
              <div className="w-full bg-white/30 rounded-full h-4 mt-6">
                <div className="bg-white h-4 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Existing Skills */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>✅</span> Your Current Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {existingSkills.map((skill, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{skill.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        skill.status === 'strong' ? 'bg-green-100 text-green-700' :
                        skill.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          skill.status === 'strong' ? 'bg-green-500' :
                          skill.status === 'good' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>❗</span> Skills You Need to Learn
              </h2>
              <div className="space-y-4">
                {missingSkills.map((skill, index) => (
                  <div key={index} className={`p-6 rounded-lg border-l-4 ${
                    skill.priority === 'high' ? 'bg-red-50 border-red-500' : 'bg-orange-50 border-orange-500'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            skill.priority === 'high' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                          }`}>
                            {skill.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-gray-700">{skill.reason}</p>
                      </div>
                      <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all whitespace-nowrap">
                        Learn Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
