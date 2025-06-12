import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  await prisma.job.create({
    data: {
      title: 'Software Engineer',
      companyName: 'Acme Corp',
      location: 'Remote',
      jobType: 'FullTime',
      salaryMin: 10,
      salaryMax: 20,
      applicationDeadline: new Date('2025-12-31'),
      description: 'Exciting opportunity at Acme Corp.',
      logo: 'logo1.png', // ✅ ADD THIS
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
