'use client';

import { FC } from 'react';
import {
  Box,
  Text,
  Title,
  Group,
  Button,
  Stack,
  Image,
} from '@mantine/core';
import {
  IconBriefcase,
  IconMapPin,
  IconUser,
} from '@tabler/icons-react';

interface JobCardProps {
  id: number;
  logo: string;
  postedAgo: string;
  title: string;
  experience: string;
  location: string;
  salary: string;
  description: string[];
  onDelete: () => void;
}

const JobCard: FC<JobCardProps> = ({
  id,
  logo,
  postedAgo,
  title,
  experience,
  location,
  salary,
  description,
  onDelete,
}) => {
  return (
    <Box
      p="md"
      bg="white"
      style={{
        width: 316,
        borderRadius: 12,
        boxShadow: '0px 0px 14px 0px rgba(211, 211, 211, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Group justify="space-between" align="start" mb="sm">
        <Box
          style={{
            width: 83,
            height: 82,
            borderRadius: 13,
            background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={logo} width={50} height={50} alt="Company Logo" />
        </Box>

        <Text
          size="xs"
          mt={4}
          px={8}
          py={4}
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          {postedAgo}
        </Text>
      </Group>

      <Title order={4} mb={8}>
        {title}
      </Title>

      {/* KEEP IN ONE LINE */}
      <Group
        gap={16}
        mb="sm"
        wrap="nowrap"
        style={{
          overflow: 'hidden',
        }}
      >
        <Group gap={4} style={{ flexShrink: 0 }}>
          <IconUser size={16} />
          <Text size="sm" truncate="end">{experience}</Text>
        </Group>
        <Group gap={4} style={{ flexShrink: 0 }}>
          <IconMapPin size={16} />
          <Text size="sm" truncate="end">{location}</Text>
        </Group>
        <Group gap={4} style={{ flexShrink: 0 }}>
          <IconBriefcase size={16} />
          <Text size="sm" truncate="end">{salary}</Text>
        </Group>
      </Group>

      <Stack gap={4} mb="md">
        {description.map((line, idx) => (
          <Text size="sm" c="gray" key={idx}>
            • {line}
          </Text>
        ))}
      </Stack>

      <Group gap="sm">
        <Button fullWidth radius="md" size="md" color="blue">
          Apply Now
        </Button>
        {/* <Button fullWidth radius="md" size="md" color="red" onClick={onDelete}>
          Delete
        </Button> */}
      </Group>
    </Box>
  );
};

export default JobCard;
