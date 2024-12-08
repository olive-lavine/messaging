import {
  Button,
  FileButton,
  Group,
  SimpleGrid,
  Space,
  Stack,
} from '@mantine/core';

import Image from 'next/image';

export default function ImageUpload({
  file,
  filePath,
  fileUrl,
  handleUpload,
  handleDelete,
}: {
  file: File | null;
  filePath: string | null;
  fileUrl: string | null;
  handleUpload: (file: File | null) => Promise<void>;
  handleDelete: (filePath: string | null) => Promise<void>;
}) {
  return (
    <SimpleGrid cols={2} verticalSpacing={16} spacing='xl'>
      <Group>
        <Image
          priority
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/600x400/png?text=Placeholder'
          }
          alt='MMS Preview'
          width={400}
          height={400}
          style={{ objectFit: 'contain' }}
        />
        <Stack>
          <FileButton
            onChange={(f) => handleUpload(f)}
            accept='image/png,image/jpeg'
          >
            {(props) => (
              <Button variant='light' size='xs' {...props}>
                Select Image to Send
              </Button>
            )}
          </FileButton>
          <Button
            variant='transparent'
            size='xs'
            onClick={() => handleDelete(filePath)}
          >
            Remove Image
          </Button>
        </Stack>
      </Group>
      <Space />
    </SimpleGrid>
  );
}
