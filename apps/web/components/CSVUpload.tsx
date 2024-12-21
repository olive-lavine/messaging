import {
  Button,
  FileButton,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { z } from 'zod';
import { parseCSV } from 'zod-csv';

// Schema to validate each row
const rowSchema = z.record(z.string()); // Flexible schema for dynamic column detection
const phoneNumberSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

export default function CSVUpload({
  handleUpload,
  handleDelete,
}: {
  handleUpload: (data: Array<{ phone_number: string }>) => Promise<void>;
  handleDelete: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (f: File | null) => {
    if (!f) return; // Ensure `f` is a `File`
    setFile(f);

    try {
      const parsedCSV = await parseCSV(f, rowSchema); // Directly parse the File object
      if (!parsedCSV.success) {
        throw new Error('Invalid CSV format');
      }

      // Use validRows to process data
      const rows = parsedCSV.validRows;
      const columns = parsedCSV.header;
      const phoneColumn = columns.find((col) =>
        rows.every((row) => phoneNumberSchema.safeParse(row[col]).success)
      );

      if (!phoneColumn) {
        throw new Error('No valid phone number column found');
      }

      // Extract and format data for upload
      const phoneData = rows.map((row) => ({
        phone_number: row[phoneColumn],
      }));

      await handleUpload(phoneData);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <SimpleGrid cols={1} verticalSpacing={16} spacing='xl'>
      <Group>
        <Stack>
          <FileButton onChange={(f) => handleFileChange(f)} accept='.csv'>
            {(props) => (
              <Button variant='light' size='xs' {...props}>
                Select CSV File
              </Button>
            )}
          </FileButton>
          <Button
            variant='transparent'
            size='xs'
            onClick={() => {
              setFile(null);
              handleDelete();
              setError(null);
            }}
          >
            Remove File
          </Button>
          {file && <Text size='sm'>Selected File: {file.name}</Text>}
          {error && (
            <Text color='red' size='sm'>
              {error}
            </Text>
          )}
        </Stack>
      </Group>
      <Space />
    </SimpleGrid>
  );
}
