import { Router } from "express";
import { createJob,getAllJobs,deleteJob } from "../controllers/jobController";

const router = Router();

router.post("/", createJob);
router.get('/', getAllJobs); 
router.delete("/:id", deleteJob);
export default router;
