const express = require("express")

const { 
    applyToJob,
    getMyApplication,
    getApplicationsForJob,
    getApplicantById,
    updateStatus
} = require("../controllers/applicationController") 
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/:jobId", protect, applyToJob)
router.get("/my", protect, getMyApplication)
router.get("/job/:jobId", protect, getApplicationsForJob)
router.get("/:id", protect, getApplicantById)
router.put("/:id/status", protect, updateStatus)

module.exports = router