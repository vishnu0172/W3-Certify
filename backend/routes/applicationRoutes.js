const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  apply,
  getAll,
  getUserApplications,
  updateStatus,
  downloadCertificate
} = require("../controllers/applicationController");

router.post("/apply", auth(), upload, apply);
router.get("/all", auth("admin"), getAll);
router.get("/my-applications", auth(), getUserApplications);
router.put("/:id/status", auth("admin"), updateStatus);
router.get("/:id/download", auth(), downloadCertificate);

module.exports = router;
