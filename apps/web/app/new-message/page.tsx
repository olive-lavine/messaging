'use client';

import ImageUpload from '@/components/ImageUpload';
import { useForm } from '@/hooks/use-form';
import { zMessageData, ZMessageData } from '@/schema/zod';
import { Alert, Button, TextInput } from '@mantine/core';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Twilio } from 'twilio';
import { sendMessage } from './action';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const twilioAccountSid = 'your-twilio-account-sid';
const twilioAuthToken = 'your-twilio-auth-token';
const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

export default function NewMessagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const handleUpload = async (file: File | null) => {
    if (file) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.log(uploadError);
      } else {
        setFile(file);
        setFilePath(filePath);
      }
    }
  };
  const handleDelete = async (filePath: string | null) => {
    if (filePath) {
      const { error: deleteError, data: deleteData } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) {
        console.log(deleteError);
      } else {
        console.log(deleteData);
        setFilePath(null);
        setFile(null);
      }
    }

    setFilePath(null);
  };
  const sendMessageWithImageUrl = sendMessage.bind(null, filePath);

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
