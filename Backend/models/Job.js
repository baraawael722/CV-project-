import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    // المهارات التقنية
    technicalSkills: [
      {
        type: String,
      },
    ],
    // المهارات الشخصية
    softSkills: [
      {
        type: String,
      },
    ],
    // للتوافق مع الكود القديم
    requiredSkills: [
      {
        type: String,
      },
    ],
    // المؤهلات
    qualifications: {
      degree: {
        type: String, // المؤهل الدراسي المطلوب
      },
      yearsOfExperience: {
        type: Number, // عدد سنوات الخبرة
      },
      certificates: [
        {
          type: String, // الشهادات أو الدورات المطلوبة
        },
      ],
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Junior", "Mid", "Senior", "Lead"],
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "EGP",
      },
    },
    location: {
      type: String,
      required: true,
    },
    // نظام العمل
    workType: {
      type: String,
      enum: ["دوام كامل", "دوام جزئي", "تدريب", "عمل عن بُعد", "هجين", "Full-time", "Part-time", "Contract", "Remote", "Hybrid", "Internship"],
      default: "دوام كامل",
    },
    // للتوافق مع الكود القديم
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Remote", "Hybrid", "Internship"],
      default: "Full-time",
    },
    // تاريخ البدء المتوقع
    expectedStartDate: {
      type: String,
    },
    // سبب فتح الوظيفة
    openingReason: {
      type: String,
      enum: ["جديدة", "بديلة عن موظف", "توسّع في الفريق", "New Position", "Replacement", "Team Expansion"],
    },
    // اسم المدير المباشر
    directManager: {
      type: String,
    },
    // الموافقات المطلوبة
    approvals: {
      directManagerApproval: {
        type: Boolean,
        default: false,
      },
      financeApproval: {
        type: Boolean,
        default: false,
      },
      generalManagerApproval: {
        type: Boolean,
        default: false,
      },
    },
    // تفاصيل الإعلان للنشر
    publicationDetails: {
      companyLogo: {
        type: String, // URL or emoji
      },
      companyDescription: {
        type: String,
      },
      applicationLink: {
        type: String, // Email or Form link
      },
      deadline: {
        type: Date, // تاريخ انتهاء التقديم
      },
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active",
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
jobSchema.index({ title: "text", description: "text", requiredSkills: "text" });

export default mongoose.model("Job", jobSchema);
