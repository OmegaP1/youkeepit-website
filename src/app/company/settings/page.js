'use client';

import { useMessage } from '@/hooks/useMessage';
import MessageAlert from '@/app/company/components/ui/MessageAlert';
import SettingsManager from '@/app/company/components/settings/SettingsManager';

export default function CompanySettingsPage() {
  const { message, showMessage, clearMessage } = useMessage();

  return (
    <>
      <SettingsManager showMessage={showMessage} />
      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}
