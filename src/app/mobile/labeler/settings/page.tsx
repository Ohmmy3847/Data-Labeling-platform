'use client';

import Link from 'next/link';
import { ArrowLeft, User, Bell, Lock, Globe, Eye, Palette, HelpCircle, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-50 border-b-2 border-blue-200">
        <div className="flex items-center space-x-4">
          <Link href="/mobile/labeler/profile">
            <button className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-blue-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">การตั้งค่า</h1>
            <p className="text-sm text-gray-600">ปรับแต่งการใช้งาน</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Account Settings */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">บัญชีผู้ใช้</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ข้อมูลส่วนตัว</div>
                    <div className="text-sm text-gray-600">แก้ไขชื่อและรูปโปรไฟล์</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ความปลอดภัย</div>
                    <div className="text-sm text-gray-600">รหัสผ่านและการยืนยันตัวตน</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">การแจ้งเตือน</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">งานใหม่</div>
                    <div className="text-sm text-gray-600">แจ้งเตือนเมื่อมีงานใหม่</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">รางวัล</div>
                    <div className="text-sm text-gray-600">แจ้งเตือนเมื่อได้รางวัล</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">การแสดงผล</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ภาษา</div>
                    <div className="text-sm text-gray-600">ไทย</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ขนาดตัวอักษร</div>
                    <div className="text-sm text-gray-600">ใหญ่พิเศษ</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ธีม</div>
                    <div className="text-sm text-gray-600">สว่าง</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ช่วยเหลือ</h2>
            
            <Link href="/mobile/labeler/help">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">ศูนย์ช่วยเหลือ</div>
                    <div className="text-sm text-gray-600">คำถามที่พบบ่อยและการติดต่อ</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>
            </Link>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <button className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-xl transition-colors">
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-600 text-lg">ออกจากระบบ</span>
            </button>
          </CardContent>
        </Card>

        {/* Version */}
        <div className="text-center text-sm text-gray-500 pb-4">
          <p>น้องปันปัน เวอร์ชัน 1.0.0</p>
          <p className="mt-1">© 2024 Labellink. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
