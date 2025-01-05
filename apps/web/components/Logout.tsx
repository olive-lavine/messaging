import { logout } from '@/app/actions/logout';
import { Button } from '@mantine/core';

export function Logout() {
  return <Button onClick={async () => logout()}>Logout</Button>;
}
