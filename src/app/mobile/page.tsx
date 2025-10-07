'use client';

import Link from 'next/link';
import { User, Building2, Heart, Star, Users, TrendingUp, Settings, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import BottomNavigation from '@/components/shared/BottomNavigation';

export default function MobileLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - Style เดียวกับ Labeler/Client */}
      <header className="bg-white shadow-lg px-4 py-5 sticky top-0 z-50 border-b-4 border-green-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-green-700 to-emerald-800 rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">น</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-xl">สวัสดีครับ! 👋</h1>
              <p className="text-base text-gray-700 font-semibold">เลือกตัวตนของคุณ</p>
            </div>
          </div>
          
          <button className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6 pb-28">
        {/* Hero Section */}
        <Card variant="elevated" padding="xl" className="mb-6 border-4 border-green-600 shadow-xl">
          <CardContent>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                ปันงานให้ปู่ย่า
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                รายได้เสริมสำหรับผู้สูงอายุและคนพิการ<br />
                พร้อมช่วยสอน AI ไทย
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card variant="elevated" padding="lg" className="border-2 border-blue-300 bg-blue-50">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15K+</div>
                <div className="text-sm text-blue-700 font-medium">ปู่ย่า</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg" className="border-2 border-purple-300 bg-purple-50">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">300+</div>
                <div className="text-sm text-purple-700 font-medium">บริษัท</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg" className="border-2 border-orange-300 bg-orange-50">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">95%</div>
                <div className="text-sm text-orange-700 font-medium">ความแม่นยำ</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Selection Cards */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">เลือกตัวตนของคุณ</h3>
          
          {/* Labeler Card */}
          <Link href="/mobile/labeler">
            <Card variant="elevated" padding="lg" className="group active:scale-98 transition-transform border-3 border-blue-300 shadow-lg hover:shadow-xl">
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">สำหรับปู่ย่า</h3>
                    <p className="text-gray-700 text-sm mb-2">รายได้เสริมจากการป้ายข้อมูล</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <Play className="w-4 h-4 mr-1" />
                      <span>เริ่มทำงานเลย</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Client Card */}
          <Link href="/mobile/client">
            <Card variant="elevated" padding="lg" className="group active:scale-98 transition-transform border-3 border-green-300 shadow-lg hover:shadow-xl">
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">สำหรับบริษัท AI</h3>
                    <p className="text-gray-700 text-sm mb-2">ข้อมูลคุณภาพจากปู่ย่า</p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>สร้างโปรเจค</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features */}
        <Card variant="elevated" padding="lg" className="mb-6 bg-gray-50 border-2 border-gray-200">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              ทำไมต้องเลือกน้องปันปัน?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center border-2 border-green-300">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">เป็นมิตรกับปู่ย่า</div>
                  <div className="text-sm text-gray-600">ตัวอักษรใหญ่ ใช้งานง่าย</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center border-2 border-blue-300">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">ชุมชนที่อบอุ่น</div>
                  <div className="text-sm text-gray-600">เชื่อมต่อกับเพื่อนๆ ปู่ย่า</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center border-2 border-purple-300">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">คุณภาพสูง</div>
                  <div className="text-sm text-gray-600">ข้อมูลแม่นยำกว่า 95%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card variant="elevated" padding="lg" className="border-4 border-yellow-400 bg-yellow-50">
          <CardContent>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">พร้อมเริ่มต้นแล้วใช่ไหม?</h3>
              <p className="text-gray-700 mb-4">เลือกตัวตนของคุณเพื่อเริ่มต้น</p>
              <div className="space-y-3">
                <Link href="/mobile/labeler">
                  <Button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-lg">
                    เริ่มทำงานเลย 🎯
                  </Button>
                </Link>
                <Link href="/mobile/client">
                  <Button variant="outline" className="w-full py-4 border-2 border-green-500 text-green-600 rounded-2xl font-bold text-lg">
                    สร้างโปรเจค 🚀
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}