import { Box, LoadingOverlay } from '@mantine/core';

export function PageLoader() {
  //  notifications are currently set at zIndex 1000

  return (
    <Box pos='absolute' w='100%' h='100%'>
      <LoadingOverlay visible zIndex={900} c='dark' />
    </Box>
  );
}
