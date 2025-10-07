'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Settings, Bell, HelpCircle, Star,
  Trophy, Award, Gift, CreditCard, Users,
  ChevronRight, Shield, Heart, LogOut,
  FileText, CheckCircle, MessageSquare, Crown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BottomNavigation from '@/components/shared/BottomNavigation';
import { mockLabelers } from '@/data/mockData';

export default function MobileProfilePage() {
  const user = mockLabelers[0]; // Current user

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - High Contrast */}
      <header className="bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b-4 border-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/labeler">
              <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900 text-xl">โปรไฟล์</h1>
              <p className="text-base text-gray-700 font-medium">ข้อมูลส่วนตัว</p>
            </div>
          </div>
          
          <Link href="/mobile/labeler/settings">
            <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </Link>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Profile Header - High Contrast */}
        <Card variant="elevated" padding="xl" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="text-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <Crown className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              
              {/* User Info */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                คุณ{user.name}
              </h2>
              <p className="text-gray-700 font-semibold mb-3">
                {user.location} • อายุ {user.age} ปี
              </p>
              
              {/* Level Badge */}
              <div className="inline-flex items-center bg-white/80 rounded-2xl px-4 py-2 mb-4 border-3 border-gray-300 shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="font-bold text-gray-900">
                  เลเวล {user.level} • {user.points.toLocaleString()} คะแนน
                </span>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.tasksCompleted}</div>
                  <div className="text-base text-gray-700 font-semibold">งานสำเร็จ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(user.accuracy)}%</div>
                  <div className="text-base text-gray-700 font-semibold">ความแม่นยำ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">฿{user.balance.toFixed(2)}</div>
                  <div className="text-base text-gray-700 font-semibold">ยอดเงิน</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - High Contrast */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/mobile/labeler/wallet">
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300 hover:shadow-xl transition-all active:scale-95">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">กระเป๋าเงิน</h3>
                  <p className="text-sm text-gray-700 font-semibold">฿{user.balance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/mobile/labeler/achievements">
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300 hover:shadow-xl transition-all active:scale-95">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">รางวัล</h3>
                  <p className="text-sm text-gray-700 font-semibold">5 รางวัล</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/mobile/labeler/referrals">
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300 hover:shadow-xl transition-all active:scale-95">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">เชิญเพื่อน</h3>
                  <p className="text-sm text-gray-700 font-semibold">รับโบนัส</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/mobile/labeler/rewards">
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300 hover:shadow-xl transition-all active:scale-95">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">ของรางวัล</h3>
                  <p className="text-sm text-gray-700 font-semibold">แลกของ</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Achievements Showcase - High Contrast */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">รางวัลล่าสุด</h3>
              <Link href="/mobile/labeler/achievements">
                <Button variant="ghost" size="sm">
                  ดูทั้งหมด
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Trophy className="w-6 h-6 text-yellow-900" />
                </div>
                <p className="text-sm font-bold text-gray-900">100 งานแรก</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Star className="w-6 h-6 text-blue-900" />
                </div>
                <p className="text-sm font-bold text-gray-900">คะแนนสูง</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <CheckCircle className="w-6 h-6 text-green-900" />
                </div>
                <p className="text-sm font-bold text-gray-900">ความแม่นยำ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options - High Contrast */}
        <Card variant="elevated" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="divide-y divide-gray-200">
              <Link href="/mobile/labeler/history" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">ประวัติการทำงาน</h4>
                    <p className="text-base text-gray-700 font-semibold">ดูงานที่ทำแล้ว</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              
              <Link href="/mobile/labeler/statistics" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">สถิติของฉัน</h4>
                    <p className="text-base text-gray-700 font-semibold">ดูผลงานโดยรวม</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              
              <Link href="/mobile/labeler/notifications" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">การแจ้งเตือน</h4>
                    <p className="text-base text-gray-700 font-semibold">ตั้งค่าแจ้งเตือน</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              
              <Link href="/mobile/labeler/help" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">ความช่วยเหลือ</h4>
                    <p className="text-base text-gray-700 font-semibold">คำถามที่พบบ่อย</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              
              <Link href="/mobile/labeler/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">การตั้งค่า</h4>
                    <p className="text-base text-gray-700 font-semibold">ตั้งค่าบัญชี</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Support & Security - High Contrast */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">ความปลอดภัย</h3>
              <p className="text-base text-gray-700 font-semibold mb-4">
                ข้อมูลของคุณได้รับการปกป้องอย่างดี
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Shield className="w-4 h-4" />
                <span className="text-base font-bold">ยืนยันตัวตนแล้ว</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out - High Contrast */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <button className="w-full flex items-center justify-center space-x-2 py-2 text-red-600 hover:text-red-700 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-bold text-lg">ออกจากระบบ</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="profile" />
    </div>
  );
}