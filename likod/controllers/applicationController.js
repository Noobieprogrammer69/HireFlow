const Application = require('../models/Application')
const Job = require("../models/Job")

exports.applyToJob = async (req, res) => {
    try {
        if(req.user.role !== "jobseeker") {
            return res.status(403).json({message: "only Job Seekers can apply"})
        }

        const existing = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user._id
        })

        if(existing) {
            return res.status(400).json({message: "You have already applied for this job"})
        }

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user._id,
            resume: req.user.resume
        })

        res.status(201).json(application)
    } catch (error) {
        console.error("Delete Resume Error:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.getMyApplication = async (req, res) => {
    try {

        const apps = await Application
            .find({ applicant: req.user._id })
            .populate("job", "title company location type")
            .sort({ createdAt: -1 })

        res.json(apps)

    } catch (error) {
        console.error("Get Applications Error:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.getApplicationsForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId)

        if(!job || job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to view applicants"})
        }

        const applications = await Application.find({ job: req.params.jobId }).populate("job", "title location category type").populate("applicant", "name email avatar resume")
        res.json(applications)
    } catch (error) {
        console.error("Delete Resume Error:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.getApplicantById = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id).populate("job", "title company").populate("applicant", "name email avatar resume")

        if(!app) return res.status(404).json({message: "Application not found.", id: req.params.id})

        const isOwner = app.applicant._id.toString() === req.user._id.toString() || 
        app.job.company.toString() === req.user._id.toString()

        if(!isOwner) {
            return res.status(403).json({message: "You are not authorized to view applicants"})
        }

        res.json(app)
    } catch (error) {
        console.error("Delete Resume Error:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const app = await Application.findById(req.params.id).populate("job")

        if(!app || app.job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to update this application"})
        }

        app.status = status
        await app.save()
        res.json({ message: "Application status updated", status })
    } catch (error) {
        console.error("Delete Resume Error:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}
