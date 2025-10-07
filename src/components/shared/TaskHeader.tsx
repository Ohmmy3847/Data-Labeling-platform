'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TaskHeaderProps {
  title: string;
  reward: string;
  color: string;
  completedCount: number;
  totalCount: number;
  backUrl?: string;
}

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'border-blue-600',
    purple: 'border-purple-600',
    orange: 'border-orange-600',
    teal: 'border-teal-600',
    yellow: 'border-yellow-600',
    green: 'border-green-600'
  };
  return colors[color as keyof typeof colors] || 'border-blue-600';
};

export default function TaskHeader({ 
  title, 
  reward, 
  color, 
  completedCount, 
  totalCount, 
  backUrl = '/mobile/labeler/tasks' 
}: TaskHeaderProps) {
  const borderColor = getColorClasses(color);

  return (
    <header className={`bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href={backUrl}>
            <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">{title}</h1>
            <p className="text-base text-gray-700 font-medium">รางวัล: {reward}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold text-${color}-600`}>
            {completedCount}/{totalCount}
          </div>
          <div className="text-sm text-gray-600">เสร็จแล้ว</div>
        </div>
      </div>
    </header>
  );
}