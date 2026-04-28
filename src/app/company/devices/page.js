'use client';

import { useMessage } from '@/hooks/useMessage';
import MessageAlert from '@/app/company/components/ui/MessageAlert';
import DevicesManager from '@/app/company/components/devices/DevicesManager';

export default function CompanyDevicesPage() {
  const { message, showMessage, clearMessage } = useMessage();

  return (
    <>
      <DevicesManager showMessage={showMessage} />
      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}
