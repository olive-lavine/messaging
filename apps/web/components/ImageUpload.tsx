import {
  Button,
  FileButton,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
} from '@mantine/core';

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
        {fileUrl ? (
          <Image
            src={fileUrl}
            alt='MMS Preview'
            width={150}
            height={150}
            radius='md'
          />
        ) : (
          <Image
            src={null}
            alt='No image selected'
            width={150}
            height={150}
            radius='md'
          />
        )}
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
