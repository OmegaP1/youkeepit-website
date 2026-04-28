'use client';

import { useMessage } from '@/hooks/useMessage';
import MessageAlert from '@/app/company/components/ui/MessageAlert';

export default function CompanyTransactionsPage() {
  const { message, showMessage, clearMessage } = useMessage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">
          View and analyze device sale transactions and payments.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Transaction history coming soon
        </h3>
        <p className="text-gray-600 mb-6">
          Track every device sale, payment status, and financial report from one
          place.
        </p>
        <button
          onClick={() =>
            showMessage('Transactions feature is in development', 'info')
          }
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Learn More
        </button>
      </div>

      <MessageAlert message={message} onClose={clearMessage} />
    </div>
  );
}
