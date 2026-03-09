const SavedJob = require("../models/SavedJob")

exports.savedJob = async (req, res) => {
    try {
        const exists = await SavedJob.findOne({job: req.params.jobId, jobseeker: req.user._id})
        if(exists) return res.status(400).json({message: "Job Already Saved"})

        const saved = await SavedJob.create({
            job: req.params.jobId, jobseeker: req.user._id
        })

        res.status(201).json(saved)
    } catch (error) {
        console.error("Failed to save Job:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.unsaveJob = async (req, res) => {
    try {
        await SavedJob.findOneAndDelete({job: req.params.jobId, jobseeker: req.user._id})
        res.json({message: "Job Removed From saved lists"})
    } catch (error) {
        console.error("Failed to unsave job:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}

exports.getMySavedJob = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({jobseeker: req.user._id}).populate({ path: "job", populate: {path: "company", select: "name companyName companyLogo"} })
        res.json(savedJobs)
    } catch (error) {
        console.error("Failed to get saved jobs:", error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
}