const express = require("express")
const {
    savedJob,
    unsaveJob,
    getMySavedJob
} = require("../controllers/savedJobControllers")

const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/:jobId", protect, savedJob)
router.delete("/:jobId", protect, unsaveJob)
router.get("/my", protect, getMySavedJob)

module.exports = router