'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Text,
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Grid,
  Stack,
  NumberInput,
  Box,
  rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar, IconChevronDown, IconSend, IconDeviceFloppy } from '@tabler/icons-react';

interface CreateJobFormProps {
  onSuccess?: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    applicationDeadline: null as Date | null,
    description: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.companyName || !formData.location || !formData.jobType) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const deadlineDate = formData.applicationDeadline
        ? new Date(formData.applicationDeadline)
        : null;
  
      const submitData = {
        ...formData,
        applicationDeadline:
          deadlineDate && !isNaN(deadlineDate.getTime())
            ? deadlineDate.toISOString() // ✅ full ISO date
            : null,
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
  
      if (res.ok) {
        if (onSuccess) onSuccess();
        alert('Job Published!');
        setFormData({
          title: '',
          companyName: '',
          location: '',
          jobType: '',
          salaryMin: '',
          salaryMax: '',
          applicationDeadline: null,
          description: '',
        });
      } else {
        const errorData = await res.json();
        alert('Error publishing job: ' + errorData.message);
      }
    } catch (error) {
      console.log(error);
      alert('Server error!');
    }
  };
  
  
  const locationOptions = [
    'Remote',
    'Onsite',
    'Hybrid',
    'Bangalore',
    'Delhi',
    'Mumbai',
    'Chennai',
    'Hyderabad',
  ];

  const jobTypeOptions = [
    'FullTime',
    'PartTime',
    'Internship',
    'Contract',
    'Freelance',
  ];

  return (
    <Container size="sm" py={0} style={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
      <Paper shadow="md" radius="lg" p="lg" withBorder style={{ width: '100%' }}>
        <Stack gap={8}>
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                styles={{
                  label: { 
                    fontSize: rem(12), 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    marginBottom: rem(4)
                  },
                  input: { 
                    height: rem(40),
                    fontSize: rem(14)
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                required
                styles={{
                  label: { 
                    fontSize: rem(12), 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    marginBottom: rem(4)
                  },
                  input: { 
                    height: rem(40),
                    fontSize: rem(14)
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Row 2: Location and Job Type */}
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Location"
                placeholder="Choose Preferred Location"
                data={locationOptions}
                value={formData.location}
                onChange={(value) => handleChange('location', value)}
                rightSection={<IconChevronDown size={16} />}
                required
                styles={{
                  label: { 
                    fontSize: rem(12), 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    marginBottom: rem(4)
                  },
                  input: { 
                    height: rem(40),
                    fontSize: rem(14)
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Job Type"
                placeholder="FullTime"
                data={jobTypeOptions}
                value={formData.jobType}
                onChange={(value) => handleChange('jobType', value)}
                rightSection={<IconChevronDown size={16} />}
                required
                styles={{
                  label: { 
                    fontSize: rem(12), 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    marginBottom: rem(4)
                  },
                  input: { 
                    height: rem(40),
                    fontSize: rem(14)
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Row 3: Salary Range and Application Deadline */}
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box>
                <Text size="xs" fw={600} tt="uppercase" mb={2}>Salary Range</Text>
                <Group gap={4}>
                  <NumberInput
                    placeholder="₹0"
                    value={formData.salaryMin}
                    onChange={(value) => handleChange('salaryMin', value)}
                    hideControls
                    styles={{ 
                      input: { 
                        height: rem(40),
                        fontSize: rem(14)
                      } 
                    }}
                    style={{ flex: 1 }}
                  />
                  <NumberInput
                    placeholder="₹12,00,000"
                    value={formData.salaryMax}
                    onChange={(value) => handleChange('salaryMax', value)}
                    hideControls
                    styles={{ 
                      input: { 
                        height: rem(40),
                        fontSize: rem(14)
                      } 
                    }}
                    style={{ flex: 1 }}
                  />
                </Group>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <DateInput
                label="Application Deadline"
                placeholder="Select date"
                value={formData.applicationDeadline}
                onChange={(value) => handleChange('applicationDeadline', value)}
                rightSection={<IconCalendar size={16} />}
                valueFormat="DD/MM/YYYY"
                clearable
                styles={{
                  label: { 
                    fontSize: rem(12), 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    marginBottom: rem(4)
                  },
                  input: { 
                    height: rem(40),
                    fontSize: rem(14)
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Job Description */}
          <Textarea
            label="Job Description"
            placeholder="Please share a description to let the candidate know more about the job role"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            autosize
            minRows={3}
            maxRows={4}
            styles={{
              label: { 
                fontSize: rem(12), 
                fontWeight: 600, 
                textTransform: 'uppercase',
                marginBottom: rem(4)
              },
              input: { 
                border: '1px solid #BCBCBC', 
                borderRadius: rem(6),
                fontSize: rem(14)
              },
            }}
          />

          {/* Action Buttons */}
          <Group justify="space-between" mt={8}>
            <Button
              variant="outline"
              leftSection={<IconDeviceFloppy size={16} />}
              styles={{
                root: {
                  height: rem(36),
                  paddingLeft: rem(16),
                  paddingRight: rem(16),
                  fontSize: rem(13),
                  border: '2px solid #d1d5db',
                },
              }}
            >
              Save Draft
            </Button>
            
            <Button
              rightSection={<IconSend size={16} />}
              onClick={handlePublish}
              styles={{
                root: {
                  height: rem(36),
                  paddingLeft: rem(24),
                  paddingRight: rem(24),
                  fontSize: rem(13),
                  fontWeight: 700,
                },
              }}
            >
              Publish
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CreateJobForm;