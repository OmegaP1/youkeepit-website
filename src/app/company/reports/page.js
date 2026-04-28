'use client';

import { useMessage } from '@/hooks/useMessage';
import MessageAlert from '@/app/company/components/ui/MessageAlert';
import ReportsManager from '@/app/company/components/reports/ReportsManager';

export default function CompanyReportsPage() {
  const { message, showMessage, clearMessage } = useMessage();

  return (
    <>
      <ReportsManager showMessage={showMessage} />
      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}
