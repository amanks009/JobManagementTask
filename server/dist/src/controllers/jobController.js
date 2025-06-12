"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.getAllJobs = exports.createJob = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, companyName, location, jobType, salaryMin, salaryMax, applicationDeadline, description, } = req.body;
    // Random logo picker
    const logoList = ['logo1.png', 'logo2.png', 'logo3.png', 'logo4.png']; // keep these in /public/private/
    const randomLogo = logoList[Math.floor(Math.random() * logoList.length)];
    try {
        const newJob = yield prisma.job.create({
            data: {
                title,
                companyName,
                location,
                jobType,
                salaryMin: Number(salaryMin),
                salaryMax: Number(salaryMax),
                applicationDeadline: new Date(applicationDeadline),
                description,
                logo: randomLogo, // attach logo here
            },
        });
        res.status(201).json(newJob);
    }
    catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            message: `Error creating a job: ${error.message}`,
        });
    }
});
exports.createJob = createJob;
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(jobs);
    }
    catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            message: `Error fetching jobs: ${error.message}`,
        });
    }
});
exports.getAllJobs = getAllJobs;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = Number(req.params.id);
    try {
        yield prisma.job.delete({
            where: { id: jobId },
        });
        res.status(200).json({ message: 'Job deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({
            message: `Failed to delete job: ${error.message}`,
        });
    }
});
exports.deleteJob = deleteJob;
