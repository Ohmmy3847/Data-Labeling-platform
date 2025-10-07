'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientCreatePage() {
  useEffect(() => {
    // Redirect /mobile/client/create to /mobile/client/create-project
    redirect('/mobile/client/create-project');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600">กำลังเปลี่ยนหน้า...</div>
      </div>
    </div>
  );
}
