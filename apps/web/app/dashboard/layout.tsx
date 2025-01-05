'use client';
import { Logout } from '@/components/Logout';
import { PageLoader } from '@/components/PageLoader';
import { AppShell, Group, Text } from '@mantine/core';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={{
        height: 64,
      }}
      padding={25}
      bg='#F8F9FA'
    >
      <AppShell.Header>
        <Group justify='space-between' align='center' h='100%' px='md'>
          <Text>Balance:</Text>
          <Logout />
        </Group>
      </AppShell.Header>
      <Suspense fallback={<PageLoader />}>
        <AppShell.Main h='100vh'>{children}</AppShell.Main>
      </Suspense>
    </AppShell>
  );
}
