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
      {/* Bottom Navigation - High Contrast & Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-800 shadow-2xl z-50">
        <div className="container-responsive max-w-4xl mx-auto">
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Link 
                  key={item.id}
                  href={item.href} 
                  className={`touch-target flex flex-col items-center py-3 sm:py-4 px-1 sm:px-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mb-0.5 sm:mb-1" />
                  <span className="text-fluid-xs font-bold truncate w-full text-center leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Padding - Responsive */}
      <div className="h-20 sm:h-24 md:h-28"></div>
    </>
  );
}