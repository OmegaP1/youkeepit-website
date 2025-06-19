// src/app/company/components/transactions/TransactionsManager.js
'use client';

import { useState } from 'react';

export default function TransactionsManager({ showMessage }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">View all sales and payment transactions</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">Transaction management coming soon...</div>
      </div>
    </div>
  );
}