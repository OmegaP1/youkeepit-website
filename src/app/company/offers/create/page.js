'use client';

import { useRouter } from 'next/navigation';
import { useMessage } from '@/hooks/useMessage';
import MessageAlert from '@/app/company/components/ui/MessageAlert';
import CreateOfferWizard from '@/app/company/components/offers/CreateOfferWizard';

export default function CreateOfferPage() {
  const router = useRouter();
  const { message, showMessage, clearMessage } = useMessage();

  const handleClose = () => router.push('/company/offers');
  const handleSuccess = () => router.push('/company/offers');

  return (
    <>
      <CreateOfferWizard
        onClose={handleClose}
        onSuccess={handleSuccess}
        showMessage={showMessage}
      />
      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}
