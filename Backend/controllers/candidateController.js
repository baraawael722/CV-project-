import Candidate from "../models/Candidate.js";
import Job from "../models/Job.js";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

// Helper: Extract fields from CV text using simple regex patterns
function extractFieldsFromText(text) {
  const extracted = {
    skills: [],
    experience: 0,
    university: "",
    degree: "",
    phone: "",
  };

  if (!text) return extracted;

  const lowerText = text.toLowerCase();

  // Extract skills (common tech skills)
  const skillPatterns = [
    /\b(javascript|js|typescript|ts|react|angular|vue|node\.?js|express|mongodb|mysql|postgresql|python|java|c\+\+|c#|php|ruby|go|rust|swift|kotlin|html|css|sass|tailwind|bootstrap|git|docker|kubernetes|aws|azure|gcp|machine learning|ai|data science|pandas|numpy|tensorflow|pytorch)\b/gi
  ];
  
  const foundSkills = new Set();
  skillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(m => foundSkills.add(m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()));
    }
  });
  extracted.skills = Array.from(foundSkills).slice(0, 15); // limit to 15 skills

  // Extract years of experience
  const expPatterns = [
    /(\d+)\+?\s*years?\s+(?:of\s+)?experience/i,
    /experience[:\s]+(\d+)\+?\s*years?/i,
    /(\d+)\s*years?\s+(?:in|as|with)/i
  ];
  
  for (const pattern of expPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      extracted.experience = parseInt(match[1]);
      break;
    }
  }

  // Extract university
  const uniPatterns = [
    /university[:\s]+([^\n]{5,60})/i,
    /(cairo university|ain shams university|alexandria university|harvard|mit|stanford|oxford|cambridge)/i,
    /\b([A-Z][a-z]+\s+University)\b/
  ];
  
  for (const pattern of uniPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      extracted.university = match[1].trim();
      break;
    }
  }

  // Extract degree
  const degreePatterns = [
    /\b(bachelor|master|phd|doctorate|b\.?sc|m\.?sc|mba|b\.?a|m\.?a|b\.?eng|m\.?eng)\s+(?:of|in|degree)?\s*([^\n]{5,60})?/i,
    /(computer science|engineering|business administration|data science|information technology|software engineering)/i
  ];
  
  for (const pattern of degreePatterns) {
    const match = text.match(pattern);
    if (match) {
      extracted.degree = match[0].trim().substring(0, 100);
      break;
    }
  }

  // Extract phone
  const phonePatterns = [
    /(\+?\d{1,4}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}/,
    /\b\d{10,15}\b/
  ];
  
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match && match[0]) {
      extracted.phone = match[0].trim();
      break;
    }
  }

  return extracted;
}

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .sort({ createdAt: -1 })
      .populate("applications.jobId", "title department");

    res.json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get single candidate
export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate(
      "applications.jobId",
      "title department"
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create candidate
export const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create candidate",
      error: error.message,
    });
  }
};

// Update candidate
export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.json({
      success: true,
      message: "Candidate updated successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update candidate",
      error: error.message,
    });
  }
};

// Delete candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Search candidates
export const searchCandidates = async (req, res) => {
  try {
    const { q, skills, experienceLevel, minExperience } = req.query;
    let query = {};

    if (q) {
      query.$text = { $search: q };
    }
    if (skills) {
      query.skills = { $in: skills.split(",") };
    }
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    if (minExperience) {
      query.experience = { $gte: parseInt(minExperience) };
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Apply for job
export const applyForJob = async (req, res) => {
  try {
    const { candidateId, jobId, matchPercentage } = req.body;

    const candidate = await Candidate.findById(candidateId);
    const job = await Job.findById(jobId);

    if (!candidate || !job) {
      return res.status(404).json({
        success: false,
        message: "Candidate or Job not found",
      });
    }

    // Check if already applied
    const alreadyApplied = candidate.applications.some(
      (app) => app.jobId.toString() === jobId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job",
      });
    }

    // Add application
    candidate.applications.push({
      jobId,
      matchPercentage: matchPercentage || 0,
      status: "Applied",
    });

    await candidate.save();

    // Update job applicants count
    job.applicantsCount += 1;
    await job.save();

    res.json({
      success: true,
      message: "Application submitted successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to apply",
      error: error.message,
    });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { candidateId, jobId, status } = req.body;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    const application = candidate.applications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await candidate.save();

    res.json({
      success: true,
      message: "Application status updated",
      data: candidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

// Calculate match percentage (AI placeholder)
export const calculateMatch = async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    const candidate = await Candidate.findById(candidateId);
    const job = await Job.findById(jobId);

    if (!candidate || !job) {
      return res.status(404).json({
        success: false,
        message: "Candidate or Job not found",
      });
    }

    // Simple matching algorithm
    const candidateSkills = candidate.skills.map((s) => s.toLowerCase());
    const requiredSkills = job.requiredSkills.map((s) => s.toLowerCase());

    const matchingSkills = candidateSkills.filter((skill) =>
      requiredSkills.includes(skill)
    );

    const matchPercentage = Math.round(
      (matchingSkills.length / requiredSkills.length) * 100
    );

    res.json({
      success: true,
      data: {
        matchPercentage,
        matchingSkills,
        missingSkills: requiredSkills.filter(
          (skill) => !candidateSkills.includes(skill)
        ),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Upload resume (PDF) and extract text
export const uploadResume = async (req, res) => {
  try {
    // multer should have placed file on disk as req.file
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    // Build a public URL for the uploaded file (server must serve /uploads)
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/resumes/${req.file.filename}`;

    // Read file and extract text (pdf-parse)
    const buffer = fs.readFileSync(filePath);
    let extractedText = "";
    try {
      const data = await pdf(buffer);
      extractedText = data && data.text ? data.text : "";
    } catch (e) {
      // If pdf parsing fails, leave extractedText empty but continue
      console.warn("PDF parse failed:", e.message);
      extractedText = "";
    }

    // Extract structured fields from text
    const extractedFields = extractFieldsFromText(extractedText);

    // Find candidate by authenticated user's email or create/update
    let candidate = null;
    if (req.user && req.user.email) {
      candidate = await Candidate.findOne({ email: req.user.email });
    }

    if (!candidate) {
      // create a minimal candidate record with extracted data
      candidate = await Candidate.create({
        name: req.user?.name || req.user?.email || "Unknown",
        email: req.user?.email || `unknown_${Date.now()}@local`,
        resumeUrl: fileUrl,
        resumeText: extractedText,
        skills: extractedFields.skills.length > 0 ? extractedFields.skills : [],
        experience: extractedFields.experience || 0,
        university: extractedFields.university || "",
        degree: extractedFields.degree || "",
        phone: extractedFields.phone || "",
      });
    } else {
      // Update existing candidate with extracted data
      candidate.resumeUrl = fileUrl;
      candidate.resumeText = extractedText;
      
      // Merge skills (avoid duplicates)
      if (extractedFields.skills.length > 0) {
        const existingSkills = new Set(candidate.skills.map(s => s.toLowerCase()));
        extractedFields.skills.forEach(skill => {
          if (!existingSkills.has(skill.toLowerCase())) {
            candidate.skills.push(skill);
          }
        });
      }
      
      // Update other fields only if they're empty or extracted value is better
      if (extractedFields.experience > 0 && candidate.experience === 0) {
        candidate.experience = extractedFields.experience;
      }
      if (extractedFields.university && !candidate.university) {
        candidate.university = extractedFields.university;
      }
      if (extractedFields.degree && !candidate.degree) {
        candidate.degree = extractedFields.degree;
      }
      if (extractedFields.phone && !candidate.phone) {
        candidate.phone = extractedFields.phone;
      }
      
      await candidate.save();
    }

    return res.json({
      success: true,
      message: "Resume uploaded and text extracted",
      data: {
        resumeUrl: fileUrl,
        resumeText: extractedText,
        extractedFields: extractedFields,
        candidateId: candidate._id,
        candidate: {
          skills: candidate.skills,
          experience: candidate.experience,
          university: candidate.university,
          degree: candidate.degree,
          phone: candidate.phone,
        }
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};
