import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HRJobPosting() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Load saved form data from localStorage
  const getSavedFormData = () => {
    const saved = localStorage.getItem('hrJobFormData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const defaultFormData = {
    title: '',
    department: '',
    description: '',
    technicalSkills: '',
    softSkills: '',
    degree: '',
    yearsOfExperience: '',
    certificates: '',
    workType: 'Full-time',
    location: '',
    salaryMin: '',
    salaryMax: '',
    expectedStartDate: '',
    openingReason: 'New Position',
    directManager: '',
    directManagerApproval: false,
    financeApproval: false,
    generalManagerApproval: false,
    companyLogo: '',
    companyDescription: '',
    applicationLink: '',
    deadline: '',
    experienceLevel: 'Mid',
  };
  
  const [formData, setFormData] = useState(getSavedFormData() || defaultFormData);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hrJobFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (formData.description.length < 20) {
      setError('Description must be at least 20 characters');
      setLoading(false);
      return;
    }

    const technicalSkillsArray = formData.technicalSkills.split(',').map(s => s.trim()).filter(Boolean);
    const softSkillsArray = formData.softSkills.split(',').map(s => s.trim()).filter(Boolean);
    
    if (technicalSkillsArray.length === 0 && softSkillsArray.length === 0) {
      setError('Please add at least one skill (technical or soft)');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Prepare the job data
      const jobData = {
        title: formData.title,
        department: formData.department,
        description: formData.description,
        requiredSkills: [...(formData.technicalSkills.split(',').map(s => s.trim()).filter(Boolean) || []), ...(formData.softSkills.split(',').map(s => s.trim()).filter(Boolean) || [])],
        technicalSkills: formData.technicalSkills.split(',').map(s => s.trim()).filter(Boolean),
        softSkills: formData.softSkills.split(',').map(s => s.trim()).filter(Boolean),
        qualifications: {
          degree: formData.degree,
          yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
          certificates: formData.certificates.split(',').map(s => s.trim()).filter(Boolean),
        },
        experienceLevel: formData.experienceLevel,
        workType: formData.workType,
        jobType: formData.workType === 'Full-time' ? 'Full-time' : 
                 formData.workType === 'Part-time' ? 'Part-time' :
                 formData.workType === 'Remote' ? 'Remote' :
                 formData.workType === 'Hybrid' ? 'Internship' : 'Full-time',
        location: formData.location,
        salary: {
          min: parseInt(formData.salaryMin) || 0,
          max: parseInt(formData.salaryMax) || 0,
          currency: 'EGP',
        },
        expectedStartDate: formData.expectedStartDate,
        openingReason: formData.openingReason,
        directManager: formData.directManager,
        approvals: {
          directManagerApproval: formData.directManagerApproval,
          financeApproval: formData.financeApproval,
          generalManagerApproval: formData.generalManagerApproval,
        },
        publicationDetails: {
          companyLogo: formData.companyLogo,
          companyDescription: formData.companyDescription,
          applicationLink: formData.applicationLink,
          deadline: formData.deadline ? new Date(formData.deadline) : null,
        },
        status: 'Active',
      };

      const response = await axios.post(
        'http://localhost:5000/api/jobs',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        // Clear saved form data from localStorage
        localStorage.removeItem('hrJobFormData');
        // Reset form
        setFormData(defaultFormData);
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error creating job:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Failed to create job';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Post a New Job Opening</h1>
          <p className="text-lg text-gray-600">
            Please fill out all the following fields carefully before posting the announcement
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6">
            <p className="font-bold">✅ Job Posted Successfully!</p>
            <p>The job is now available for candidates on the Jobs page</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-bold">❌ Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* 1. Job Title & Department */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              🏷️ Basic Information
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Example: Front-End Developer"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Department / Division <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Example: IT Department"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* 2. Job Description */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              📋 Job Description
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Write the daily tasks and responsibilities in detail..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* 3. Skills */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              🧠 Required Skills
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Technical Skills
              </label>
              <input
                type="text"
                name="technicalSkills"
                value={formData.technicalSkills}
                onChange={handleChange}
                placeholder="Example: React, TypeScript, Node.js (separate with comma)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">Separate skills with commas (,)</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Soft Skills
              </label>
              <input
                type="text"
                name="softSkills"
                value={formData.softSkills}
                onChange={handleChange}
                placeholder="Example: Communication, Teamwork, Problem-solving"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">Separate skills with commas (,)</p>
            </div>
          </div>

          {/* 4. Qualifications */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              🎓 Qualifications
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Required Education Degree
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Example: Bachelor of Computer Science"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                placeholder="Example: 3"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Required Certifications or Courses
              </label>
              <input
                type="text"
                name="certificates"
                value={formData.certificates}
                onChange={handleChange}
                placeholder="Example: AWS Certified, Google Cloud (separate with comma)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">Separate certifications with commas (,)</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="Entry">Entry Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          </div>

          {/* 5. Work Type & Location */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              ⏰ Work Type & Location
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Work Type <span className="text-red-500">*</span>
              </label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Work Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder='Example: Cairo, Egypt or "Remote"'
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* 6. Salary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              💰 Salary (Optional)
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Minimum (EGP)
                </label>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  min="0"
                  placeholder="12000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Maximum (EGP)
                </label>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  min="0"
                  placeholder="18000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 7. Start Date & Opening Reason */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              📆 Additional Details
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Expected Start Date
              </label>
              <input
                type="text"
                name="expectedStartDate"
                value={formData.expectedStartDate}
                onChange={handleChange}
                placeholder="Example: Beginning of January 2025"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Reason for Opening
              </label>
              <select
                name="openingReason"
                value={formData.openingReason}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="New Position">New Position</option>
                <option value="Replacement">Replacement</option>
                <option value="Team Expansion">Team Expansion</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Direct Manager Name
              </label>
              <input
                type="text"
                name="directManager"
                value={formData.directManager}
                onChange={handleChange}
                placeholder="Example: Ahmed Mohammed"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* 8. Approvals */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              ✅ Required Approvals
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  name="directManagerApproval"
                  checked={formData.directManagerApproval}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-lg font-semibold text-gray-700">Direct Manager Approval</span>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  name="financeApproval"
                  checked={formData.financeApproval}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-lg font-semibold text-gray-700">Finance Approval</span>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  name="generalManagerApproval"
                  checked={formData.generalManagerApproval}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-lg font-semibold text-gray-700">General Manager Approval</span>
              </label>
            </div>
          </div>

          {/* 9. Publication Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
              🌐 Publication Details
            </h2>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Company Logo (Emoji or URL)
              </label>
              <input
                type="text"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                placeholder="Example: 🏢 or https://example.com/logo.png"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Brief Company Description
              </label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Write a brief summary about your company..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Application Link (Email or Form)
              </label>
              <input
                type="text"
                name="applicationLink"
                value={formData.applicationLink}
                onChange={handleChange}
                placeholder="Example: hr@company.com or https://forms.google.com/..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 text-xl font-bold rounded-xl transition-all shadow-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
              }`}
            >
              {loading ? '⏳ Posting...' : '🚀 Post Job Opening'}
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('hrJobFormData');
                setFormData(defaultFormData);
                setSuccess(false);
                setError('');
              }}
              className="w-full py-3 px-6 text-lg font-bold rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              🗑️ Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
