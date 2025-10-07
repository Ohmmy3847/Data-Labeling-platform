'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ไปหน้า mobile app ทันที
    router.replace('/mobile');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white text-2xl font-bold">น</span>
        </div>
        <p className="text-gray-600 text-lg">กำลังเข้าสู่แอป น้องปันปัน...</p>
      </div>
    </div>
  );
}
