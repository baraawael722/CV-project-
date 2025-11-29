import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [cvFile, setCvFile] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    university: '',
    degree: '',
    skills: [],
    experience: 0,
    experienceLevel: 'Entry Level'
  })

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      navigate('/login')
      return
    }

    const userData = JSON.parse(storedUser)
    setUser(userData)

    // Load profile data from user
    setProfile({
      name: userData.name || '',
      email: userData.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      university: '',
      degree: '',
      skills: [],
      experience: 0,
      experienceLevel: 'Entry Level'
    })

    // Fetch candidate profile if exists
    fetchCandidateProfile(token, userData.email)
  }, [navigate])

  const fetchCandidateProfile = async (token, email) => {
    try {
      console.log('🔍 Fetching candidate profile...');

      // Use /me endpoint for employees to get their own profile
      const response = await fetch(`http://localhost:5000/api/candidates/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('📥 Profile response status:', response.status);

      if (response.ok) {
        const data = await response.json()
        console.log('📦 Profile data:', data);

        if (data.data) {
          const candidateData = data.data
          setProfile(prev => ({
            ...prev,
            phone: candidateData.phone || '',
            location: candidateData.location || '',
            linkedin: candidateData.linkedinUrl || '',
            portfolio: candidateData.portfolioUrl || '',
            university: candidateData.university || '',
            degree: candidateData.degree || '',
            skills: candidateData.skills || [],
            experience: candidateData.experience || 0,
            experienceLevel: candidateData.experienceLevel || 'Entry Level'
          }))
          console.log('✅ Profile loaded successfully');
        } else {
          console.log('ℹ️ No profile found yet');
        }
      } else {
        console.error('❌ Failed to fetch profile:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error)
    }
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')

    try {
      setUploading(true)

      const candidateData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        university: profile.university,
        degree: profile.degree,
        skills: profile.skills,
        experience: profile.experience,
        experienceLevel: profile.experienceLevel,
        linkedinUrl: profile.linkedin,
        portfolioUrl: profile.portfolio,
        location: profile.location,
        availability: 'Immediate'
      }

      const response = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidateData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('✅ Profile saved successfully!')
        setEditing(false)
      } else {
        alert(`❌ Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('❌ Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleCVUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      // Server currently accepts PDF only (we extract text from PDF)
      const allowedTypes = ['application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF files are allowed for extracting text')
        return
      }

      setCvFile(file)
      alert(`✅ CV file "${file.name}" selected! Click "Upload CV" to save.`)
    }
  }

  const handleCVSubmit = async () => {
    console.log('🎯 handleCVSubmit called!');

    if (!cvFile) {
      console.log('❌ No file selected');
      alert('Please select a CV file first')
      return
    }

    const token = localStorage.getItem('token')

    console.log('🚀 Starting CV upload...')
    console.log('📄 File:', cvFile.name, cvFile.type, cvFile.size, 'bytes')
    console.log('🔑 Token:', token ? 'EXISTS' : 'MISSING')

    if (!token) {
      console.error('❌ No token found! User not logged in.');
      alert('❌ You must be logged in to upload CV. Please login again.');
      return;
    }

    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('cv', cvFile)

      console.log('📤 Sending request to backend...', 'URL:', 'http://localhost:5000/api/candidates/upload')

      const response = await fetch('http://localhost:5000/api/candidates/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      console.log('📥 Response received!');
      console.log('📥 Response status:', response.status, response.statusText)

      const data = await response.json()
      console.log('📦 Response data:', JSON.stringify(data, null, 2))

      if (response.ok) {
        alert('✅ CV uploaded successfully! Fields auto-extracted.')

        // Update profile with extracted fields
        if (data.data && data.data.candidate) {
          const extracted = data.data.candidate
          setProfile(prev => ({
            ...prev,
            skills: extracted.skills || prev.skills,
            experience: extracted.experience || prev.experience,
            university: extracted.university || prev.university,
            degree: extracted.degree || prev.degree,
            phone: extracted.phone || prev.phone,
            resumeExtract: data.data.resumeText || ''
          }))
        }

        // Clear file selection
        setCvFile(null)

        // Refresh candidate profile from server
        fetchCandidateProfile(token, user.email)
      } else {
        console.error('❌ Upload failed:', data.message)
        alert(`❌ Upload error: ${data.message || 'Server error'}`)
      }
      setUploading(false)

    } catch (error) {
      console.error('❌ Upload error:', error)
      alert('❌ Upload failed. Please try again.')
      setUploading(false)
    }
  }

  const handleAddSkill = () => {
    const skill = prompt('Enter a new skill:')
    if (skill && skill.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }))
    }
  }

  const handleRemoveSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const savedJobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', match: 95 },
    { id: 2, title: 'Frontend Engineer', company: 'StartupXYZ', match: 88 },
    { id: 3, title: 'Full Stack Developer', company: 'MegaTech Inc', match: 82 }
  ]

  const savedCourses = [
    { id: 1, title: 'Advanced Docker & Kubernetes', progress: 0 },
    { id: 2, title: 'AWS Cloud Practitioner', progress: 0 },
    { id: 3, title: 'Advanced TypeScript', progress: 45 }
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile 👤</h1>
          <p className="text-lg text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all"
                    >
                      ✅ Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-400 transition-all"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Resume extracted text preview */}
            {profile.resumeExtract && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-2">Extracted CV Text (preview)</h3>
                <div className="max-h-48 overflow-auto text-sm text-gray-700 whitespace-pre-wrap">
                  {profile.resumeExtract}
                </div>
              </div>
            )}

            {/* Links Card */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🔗 LinkedIn</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                      {profile.linkedin}
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">💻 GitHub</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                      {profile.github}
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🌐 Portfolio</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.portfolio}
                      onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <a href={`https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                      {profile.portfolio}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">CV / Resume 📄</h2>

              {user.role !== 'employee' ? (
                <p className="text-gray-600">CV upload is for employees only.</p>
              ) : cvFile ? (
                <div className="border-4 border-solid border-green-500 rounded-xl p-8 bg-green-50 mb-4">
                  <div className="text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">File Selected</h3>
                    <p className="text-gray-700 mb-4 font-semibold">{cvFile.name}</p>
                    <p className="text-sm text-gray-600 mb-4">Size: {(cvFile.size / 1024).toFixed(2)} KB</p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleCVSubmit}
                        disabled={uploading}
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploading ? (
                          <span className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Uploading...
                          </span>
                        ) : (
                          '📤 Upload CV'
                        )}
                      </button>
                      <button
                        onClick={() => setCvFile(null)}
                        className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-400 transition-all"
                      >
                        ✖️ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label htmlFor="cv-upload">
                  <div className="border-4 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-5xl mb-4">📄</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Your CV</h3>
                    <p className="text-gray-600 mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                    <div className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all inline-block">
                      Choose File
                    </div>
                  </div>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Skills 💪</h2>
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm"
                >
                  + Add Skill
                </button>
              </div>

              {profile.skills.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No skills added yet. Click "Add Skill" to get started!</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 group"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="text-blue-700 hover:text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Education & Experience */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Experience 🎓</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">University</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.university}
                      onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                      placeholder="e.g., Cairo University"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.university || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Degree</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile.degree}
                      onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                      placeholder="e.g., Computer Science"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.degree || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
                  {editing ? (
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profile.experience} years</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Experience Level</label>
                  {editing ? (
                    <select
                      value={profile.experienceLevel}
                      onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  ) : (
                    <p className="text-lg text-gray-900">{profile.experienceLevel}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Saved Items & Actions */}
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-xl mb-1">{user.name}</h3>
                <p className="text-sm opacity-90 mb-3">{user.email}</p>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Saved Jobs</h2>
              <div className="space-y-3">
                {savedJobs.map((job) => (
                  <div key={job.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{job.title}</h3>
                    <p className="text-xs text-gray-600">{job.company}</p>
                    <span className="inline-block mt-2 text-xs font-semibold text-green-600">{job.match}% Match</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm">
                View All Jobs →
              </button>
            </div>

            {/* Saved Courses */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 My Courses</h2>
              <div className="space-y-3">
                {savedCourses.map((course) => (
                  <div key={course.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{course.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1 inline-block">{course.progress}% Complete</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all text-sm">
                View All Courses →
              </button>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
