'use client';

import { FC, useEffect, useState } from 'react';
import { Container, SimpleGrid, Loader, Text } from '@mantine/core';
import JobCard from './JobCard';

interface ApiJob {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  logo: string; // added logo field
}

const Hero: FC = () => {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } else {
        console.error('Failed to delete job');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (loading) {
    return (
      <Container size="xl" py="xl" style={{ textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="sm">Loading jobs…</Text>
      </Container>
    );
  }

  if (jobs.length === 0) {
    return (
      <Container size="xl" py="xl" style={{ textAlign: 'center' }}>
        <Text>No jobs found.</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            logo={`/private/${job.logo}`} // updated to use dynamic logo
            postedAgo={getPostedAgo(job.createdAt)}
            title={job.title}
            experience="N/A"
            location={job.location}
            salary={`${job.salaryMin}-${job.salaryMax} LPA`}
            description={job.description.split('\n')}
            onDelete={() => handleDelete(job.id)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

function getPostedAgo(dateString: string): string {
  const postedMs = Date.now() - new Date(dateString).getTime();
  const hours = Math.floor(postedMs / (1000 * 60 * 60));
  return hours < 24 ? `${hours}h Ago` : `${Math.floor(hours / 24)}d Ago`;
}

export default Hero;
