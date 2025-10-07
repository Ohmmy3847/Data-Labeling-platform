'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Gift, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { SPECIAL_BONUSES } from '@/config/rewardsConfig';
import { TASK_CONFIGS } from '@/config/taskConfig';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'new_task',
      icon: Bell,
      color: 'blue',
      title: 'งานใหม่มาแล้ว!',
      message: 'มี 5 งานใหม่รอคุณอยู่',
      time: '5 นาทีที่แล้ว',
      read: false
    },
    {
      id: 2,
      type: 'reward',
      icon: Gift,
      color: 'green',
      title: `รับรางวัล ฿${SPECIAL_BONUSES.weeklyStreakBonus}`,
      message: `คุณได้รับโบนัสจากการทำงานครบ 100 งาน`,
      time: '2 ชั่วโมงที่แล้ว',
      read: false
    },
    {
      id: 3,
      type: 'achievement',
      icon: Star,
      color: 'yellow',
      title: 'ปลดล็อกความสำเร็จใหม่!',
      message: 'ยินดีด้วย! คุณได้รับเหรียญ "มือโปร"',
      time: '5 ชั่วโมงที่แล้ว',
      read: false
    },
    {
      id: 4,
      type: 'earnings',
      icon: TrendingUp,
      color: 'purple',
      title: 'รายได้เพิ่มขึ้น',
      message: 'คุณทำได้ดีมาก! รายได้เดือนนี้เพิ่ม 25%',
      time: 'เมื่อวาน',
      read: true
    },
    {
      id: 5,
      type: 'task_complete',
      icon: CheckCircle2,
      color: 'green',
      title: 'งานสำเร็จ',
      message: `งานแปลข้อความของคุณผ่านการตรวจสอบแล้ว +฿${TASK_CONFIGS.t2.rate}`,
      time: 'เมื่อวาน',
      read: true
    },
    {
      id: 6,
      type: 'reminder',
      icon: AlertCircle,
      color: 'orange',
      title: 'อย่าลืมทำงานวันนี้',
      message: 'ทำงานทุกวันรับโบนัสพิเศษ!',
      time: '2 วันที่แล้ว',
      read: true
    },
    {
      id: 7,
      type: 'new_task',
      icon: Bell,
      color: 'blue',
      title: 'งานใหม่มาแล้ว!',
      message: 'มี 3 งานใหม่รอคุณอยู่',
      time: '2 วันที่แล้ว',
      read: true
    },
    {
      id: 8,
      type: 'reward',
      icon: Gift,
      color: 'green',
      title: `รับโบนัส ฿${SPECIAL_BONUSES.referralSignupBonus}`,
      message: 'คุณได้รับโบนัสจากการแนะนำเพื่อน',
      time: '3 วันที่แล้ว',
      read: true
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-50 border-b-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/mobile/labeler/profile">
              <button className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <ArrowLeft className="w-6 h-6 text-blue-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">การแจ้งเตือน</h1>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} ข้อความใหม่` : 'ไม่มีข้อความใหม่'}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button className="text-sm text-blue-600 font-medium">
              อ่านทั้งหมด
            </button>
          )}
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Unread Notifications */}
        {unreadCount > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ใหม่</h2>
            <div className="space-y-3">
              {notifications.filter(n => !n.read).map((notification) => {
                const IconComponent = notification.icon;
                const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
                  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-300' },
                  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-300' },
                  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-300' },
                  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-300' },
                  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-300' },
                };
                const colors = colorMap[notification.color];

                return (
                  <Card key={notification.id} className={`border-2 ${colors.border} ${colors.bg}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${colors.border}`}>
                          <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-gray-900">{notification.title}</h3>
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {notifications.filter(n => n.read).length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">ก่อนหน้านี้</h2>
            <div className="space-y-3">
              {notifications.filter(n => n.read).map((notification) => {
                const IconComponent = notification.icon;
                const colorMap: Record<string, { bg: string; icon: string }> = {
                  blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
                  green: { bg: 'bg-green-100', icon: 'text-green-600' },
                  yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
                  purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
                  orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
                };
                const colors = colorMap[notification.color];

                return (
                  <Card key={notification.id} className="bg-white opacity-80 hover:opacity-100 transition-opacity">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-500">เมื่อมีข้อความใหม่จะแสดงที่นี่</p>
            </CardContent>
          </Card>
        )}

        {/* Settings Link */}
        <div className="mt-6 pt-6 border-t">
          <Link href="/mobile/labeler/settings">
            <button className="w-full p-4 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-xl transition-colors">
              ตั้งค่าการแจ้งเตือน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
