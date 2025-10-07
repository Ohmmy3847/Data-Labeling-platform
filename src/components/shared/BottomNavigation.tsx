'use client';

import Link from 'next/link';
import { FileText, CheckCircle, Trophy, Users, Star } from 'lucide-react';

interface BottomNavigationProps {
  currentPage?: 'home' | 'tasks' | 'summary' | 'community' | 'profile';
}

const navItems = [
  {
    id: 'home',
    href: '/mobile/labeler',
    icon: FileText,
    label: 'หน้าหลัก'
  },
  {
    id: 'tasks',
    href: '/mobile/labeler/tasks',
    icon: CheckCircle,
    label: 'งาน'
  },
  {
    id: 'summary',
    href: '/mobile/labeler/summary',
    icon: Trophy,
    label: 'สรุป'
  },
  {
    id: 'community',
    href: '/mobile/labeler/community',
    icon: Users,
    label: 'ชุมชน'
  },
  {
    id: 'profile',
    href: '/mobile/labeler/profile',
    icon: Star,
    label: 'ฉัน'
  }
];

export default function BottomNavigation({ currentPage = 'home' }: BottomNavigationProps) {
  return (
    <>
      {/* Bottom Navigation - High Contrast */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-800 shadow-2xl">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Link 
                key={item.id}
                href={item.href} 
                className={`flex flex-col items-center py-4 ${
                  isActive 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-bold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24"></div>
    </>
  );
}