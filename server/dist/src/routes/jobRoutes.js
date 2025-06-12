"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const router = (0, express_1.Router)();
router.post("/", jobController_1.createJob);
router.get('/', jobController_1.getAllJobs);
router.delete("/:id", jobController_1.deleteJob);
exports.default = router;
