'use client';

import ImageUpload from '@/components/ImageUpload';
import { useForm } from '@/hooks/use-form';
import { getSupabaseClientComponentClient } from '@/lib/supabase/client-component';
import { zMessageData, ZMessageData } from '@/schema/zod';
import { Alert, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { sendMessage } from './action';

const supabase = getSupabaseClientComponentClient();

export default function NewMessagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const handleUpload = async (file: File | null) => {
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      console.error('Unsupported file type. Please upload a PNG or JPEG.');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') // Ensure this is the correct bucket name
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: '3600',
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: imageData } = await supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log(imageData.publicUrl);

      setFileUrl(imageData.publicUrl);
      setFile(file);
      setFilePath(filePath);
      console.log('File uploaded successfully:', filePath);
    } catch (error) {
      console.error('Error during file upload:', error);
      alert('Failed to upload the file. Please try again.');
    }
  };

  const handleDelete = async (filePath: string | null) => {
    if (!filePath) {
      console.error('No file path specified for deletion.');
      return;
    }

    try {
      const { error: deleteError, data: deleteData } = await supabase.storage
        .from('images') // Ensure this matches the correct bucket name
        .remove([filePath]);

      if (deleteError) {
        throw new Error(`Delete failed: ${deleteError.message}`);
      }

      console.log('File deleted successfully:', deleteData);
      setFilePath(null);
      setFile(null);
    } catch (error) {
      console.error('Error during file deletion:', error);
      alert('Failed to delete the file. Please try again.');
    }
  };

  const sendMessageWithImageUrl = sendMessage.bind(
    null,
    'https://c8.alamy.com/comp/B3MG67/britney-spears-us-pop-singer-B3MG67.jpg'
  );

  const { mantineForm, onSubmit, isLoading, errorMessage } =
    useForm<ZMessageData>({
      schema: zMessageData,
      action: sendMessageWithImageUrl,
      options: {
        initialValues: {
          text: '',
        },
      },
    });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label='Text'
        placeholder='Enter your message'
        {...mantineForm.getInputProps('text')}
      />

      <ImageUpload
        file={file}
        filePath={filePath}
        fileUrl={fileUrl}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
      />

      {errorMessage && (
        <Alert color='red' mt='md'>
          {errorMessage}
        </Alert>
      )}

      <Button type='submit' mt='md' loading={isLoading}>
        Send Message
      </Button>
    </form>
  );
}
