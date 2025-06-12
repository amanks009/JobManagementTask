import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createJob = async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    companyName,
    location,
    jobType,
    salaryMin,
    salaryMax,
    applicationDeadline,
    description,
  } = req.body;

  // Random logo picker
  const logoList = ['logo1.png', 'logo2.png', 'logo3.png', 'logo4.png']; // keep these in /public/private/
  const randomLogo = logoList[Math.floor(Math.random() * logoList.length)];

  try {
    const newJob = await prisma.job.create({
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
  } catch (error: any) {
    console.error('Error creating job:', error);
    res.status(500).json({
      message: `Error creating a job: ${error.message}`,
    });
  }
};



  export const getAllJobs = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const jobs = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
      });
  
      res.status(200).json(jobs);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({
        message: `Error fetching jobs: ${error.message}`,
      });
    }
  };
  
  export const deleteJob = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const jobId = Number(req.params.id);
  
    try {
      await prisma.job.delete({
        where: { id: jobId },
      });
  
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting job:', error);
      res.status(500).json({
        message: `Failed to delete job: ${error.message}`,
      });
    }
  };
  