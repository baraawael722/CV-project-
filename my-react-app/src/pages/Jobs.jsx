import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const [savedJobs, setSavedJobs] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/jobs/public', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.success) {
          setJobs(response.data.data)
        }
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('فشل في تحميل الوظائف')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const toggleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  // Filter jobs based on selected filter
  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true
    if (filter === 'remote') return job.location?.toLowerCase().includes('remote') || job.workType === 'عمل عن بُعد'
    if (filter === 'fulltime') return job.workType === 'دوام كامل' || job.jobType === 'Full-time'
    if (filter === 'saved') return savedJobs.includes(job._id)
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">جاري تحميل الوظائف...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg">
          <p className="font-bold text-xl">❌ خطأ</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Opportunities �</h1>
          <p className="text-lg text-gray-600">استكشف الوظائف المتاحة وابحث عن فرصتك المثالية</p>
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
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-2xl font-semibold text-gray-600">
              {filter === 'saved' ? 'لا توجد وظائف محفوظة بعد' : 'لا توجد وظائف متاحة حالياً'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
                <div className="flex items-start gap-6">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                    {job.publicationDetails?.companyLogo || '🏢'}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-lg text-gray-600">{job.department}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">📍 {job.location}</span>
                      <span className="flex items-center gap-1">💼 {job.workType || job.jobType}</span>
                      {job.salary?.min && job.salary?.max && (
                        <span className="flex items-center gap-1">
                          💰 {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        🕒 {new Date(job.createdAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.technicalSkills?.slice(0, 5).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {skill}
                        </span>
                      ))}
                      {job.softSkills?.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Qualifications */}
                    {job.qualifications && (
                      <div className="mb-4 text-sm text-gray-600">
                        {job.qualifications.degree && (
                          <span className="mr-4">🎓 {job.qualifications.degree}</span>
                        )}
                        {job.qualifications.yearsOfExperience > 0 && (
                          <span>📅 {job.qualifications.yearsOfExperience} سنوات خبرة</span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3">
                      {job.publicationDetails?.applicationLink && (
                        <a
                          href={
                            job.publicationDetails.applicationLink.includes('@')
                              ? `mailto:${job.publicationDetails.applicationLink}`
                              : job.publicationDetails.applicationLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-center"
                        >
                          Apply Now →
                        </a>
                      )}
                      <button
                        onClick={() => toggleSave(job._id)}
                        className={`px-6 py-3 font-bold rounded-full transition-all shadow-sm ${
                          savedJobs.includes(job._id)
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {savedJobs.includes(job._id) ? '⭐ Saved' : '🤍 Save'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                {job.publicationDetails?.companyDescription && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>عن الشركة:</strong> {job.publicationDetails.companyDescription}
                    </p>
                  </div>
                )}

                {/* Deadline */}
                {job.publicationDetails?.deadline && (
                  <div className="mt-2 text-sm text-red-600">
                    ⏰ آخر موعد للتقديم: {new Date(job.publicationDetails.deadline).toLocaleDateString('ar-EG')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
