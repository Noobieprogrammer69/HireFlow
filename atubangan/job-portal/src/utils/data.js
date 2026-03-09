import {
  MessageSquare,
  Search,
  FileText,
  Upload,
  Bookmark,
  Bell,
  Briefcase,
  MapPin,
  BarChart3,
  ShieldCheck,
  Clock,
  Star,
  Users,
  FileSearch,
  Edit,
  CheckCircle,
  LayoutDashboard,
  Plus,
  Building2
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description:
      "Connect directly with hiring managers and recruiters through our secure messaging platform."
  },
  {
    icon: Search,
    title: "Smart Job Search",
    description:
      "Find jobs instantly using advanced filters like location, salary range, job type, and remote options."
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create and manage your professional resume directly on the platform with structured sections."
  },
  {
    icon: Upload,
    title: "Easy Resume Upload",
    description:
      "Upload your existing resume in PDF format and make it searchable to employers."
  },
  {
    icon: Bookmark,
    title: "Save Jobs",
    description:
      "Bookmark job listings and revisit them anytime from your personalized dashboard."
  },
  {
    icon: Bell,
    title: "Job Alerts",
    description:
      "Receive instant notifications when new jobs match your skills and preferences."
  },
  {
    icon: Briefcase,
    title: "One-Click Apply",
    description:
      "Apply to jobs quickly using your saved resume and profile information."
  },
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description:
      "Discover jobs near you or explore remote opportunities worldwide."
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "Talent Pool Access",
    description:
      "Access our searchable database of candidates and find the perfect fit for your team."
  },
  {
    icon: Briefcase,
    title: "Post & Manage Jobs",
    description:
      "Create, edit, and manage job listings from your employer dashboard."
  },
  {
    icon: FileSearch,
    title: "Advanced Candidate Search",
    description:
      "Filter candidates by skills, experience level, location, and availability."
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description:
      "Communicate securely with applicants through the built-in messaging system."
  },
  {
    icon: BarChart3,
    title: "Applicant Analytics",
    description:
      "Track job performance, application rates, and hiring progress with real-time insights."
  },
  {
    icon: Edit,
    title: "Easy Job Editing",
    description:
      "Update job descriptions, salary ranges, and requirements anytime."
  },
  {
    icon: Clock,
    title: "Application Tracking",
    description:
      "Monitor application status from received to hired in one centralized view."
  },
  {
    icon: Bell,
    title: "New Applicant Alerts",
    description:
      "Receive instant notifications when candidates apply to your job posts."
  },
];

// export const NAVIGATION_MENU = [
//   { id: "employer-dashboard", name: "Dashboard", icon: LayoutDashboard},
//   { id: "post-job", name: "Post Job", icon: Plus},
//   { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase},
//   { id: "company-profile", name: "Company Profile", icon: Building2},
// ]

export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/employer-dashboard"
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase,
    path: "/manage-jobs"
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus,
    path: "/post-job"
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
    path: "/company-profile"
  }
];

export const CATEGORIES = [
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "IT & Software", label: "IT & Software" },
  { value: "Customer-service", label: "Customer-service" },
  { value: "Product", label: "Product" },
  { value: "Operation", label: "Operation" },
  { value: "Finance", label: "Finance" },
  { value: "HR", label: "HR" },
  { value: "Other", label: "Other" },
]

export const JOB_TYPES = [
  { value: "Remote", label: "Remote" },
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
]

export const SALARY_RABES = [
  "Less than PHP10,000",
  "PHP1000 - PHP15,000",
  "More than PHP15,000"
]