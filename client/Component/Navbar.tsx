'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  TextInput,
  Select,
  RangeSlider,
  Text,
  Modal,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconPlus } from '@tabler/icons-react';
import JobForm from './JobCard'; // ✅ Adjust the path as needed
import CreateJobForm from './CreateJobForm';

const Navbar: FC = () => {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([30000, 100000]);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

  return (
    <>
      <Box
        style={{
          maxWidth: '1440px',
          width: '100%',
          height: '214px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 14px 0px rgba(198, 191, 191, 0.25)',
          margin: '0 auto',
        }}
      >
        <Container size="xl" h="100%" py="md">
          <Flex justify="center" align="center" gap={68}>
            <Link href="/">
              <Image src="/logo2.png" alt="Logo" width={44} height={44.67} style={{ marginTop: '1.66px' }} />
            </Link>

            <Group gap={32} h={48}>
              <Link href="/" passHref>
                <Text component="a" c="black" fw={500} style={{ textDecoration: 'none' }}>Home</Text>
              </Link>
              <Link href="/jobs" passHref>
                <Text component="a" c="black" fw={500} style={{ textDecoration: 'none' }}>Find Jobs</Text>
              </Link>
              <Link href="/talents" passHref>
                <Text component="a" c="black" fw={500} style={{ textDecoration: 'none' }}>Find Talents</Text>
              </Link>
              <Link href="/about" passHref>
                <Text component="a" c="black" fw={500} style={{ textDecoration: 'none' }}>About us</Text>
              </Link>
              <Link href="/testimonials" passHref>
                <Text component="a" c="black" fw={500} style={{ textDecoration: 'none' }}>Testimonials</Text>
              </Link>
            </Group>



            <Button
              radius={30}
              onClick={() => setIsCreateJobModalOpen(true)}
              styles={{
                root: {
                  width: 140,
                  height: 38,
                  borderRadius: 30,
                  padding: '8px 24px',
                  background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
                  fontWeight: 600,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                },
              }}
            >
              Create Jobs
            </Button>

          </Flex>

          <Flex justify="center" align="center" gap="md" mt="lg" wrap="wrap">
            <TextInput
              placeholder="Job Title"
              w={220}
              radius="md"
              variant="filled"
              leftSection={<IconSearch size={18} />}
            />

            <TextInput
              placeholder="Location"
              w={220}
              radius="md"
              variant="filled"
              leftSection={<IconMapPin size={18} />}
            />

            <Select
              placeholder="Select Job Type"
              w={220}
              radius="md"
              variant="filled"
              data={[
                { value: 'full-time', label: 'Full-time' },
                { value: 'part-time', label: 'Part-time' },
                { value: 'contract', label: 'Contract' },
                { value: 'internship', label: 'Internship' },
              ]}
            />

            <Box w={280}>
              <Text size="sm" mb={4}>Salary Range</Text>
              <RangeSlider
                min={0}
                max={200000}
                step={1000}
                value={salaryRange}
                onChange={setSalaryRange}
                labelAlwaysOn
                radius="md"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Modal containing the JobForm */}
      <Modal
        opened={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        title="Create New Job"
        size="lg"
        centered
      >
        <CreateJobForm onSuccess={() => setIsCreateJobModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Navbar;
