'use client';

import Link from 'next/link';
import { ArrowLeft, User, Settings, Building2, Mail, Phone, Globe, MapPin, TrendingUp, Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CLIENT_STATS } from '@/config/rewardsConfig';

export default function ClientProfilePage() {
  const companyInfo = {
    name: 'AI Solutions Co., Ltd.',
    email: 'contact@aisolutions.com',
    phone: '02-XXX-XXXX',
    website: 'www.aisolutions.com',
    address: 'Bangkok, Thailand',
    industry: 'Artificial Intelligence',
    founded: '2020'
  };

  const stats = {
    totalProjects: CLIENT_STATS.projects.total,
    activeProjects: CLIENT_STATS.projects.active,
    completedProjects: CLIENT_STATS.projects.completed,
    totalLabelers: CLIENT_STATS.labelers.total,
    totalSpent: CLIENT_STATS.budget.totalSpent,
    avgQuality: CLIENT_STATS.quality.average
  };

  const recentActivity = [
    { type: 'project', title: 'Thai Voice Recognition', action: 'อัปเดตความคืบหน้า 75%', time: '2 ชั่วโมงที่แล้ว' },
    { type: 'payment', title: 'ชำระเงิน', action: 'โอน ฿125,000', time: '5 ชั่วโมงที่แล้ว' },
    { type: 'complete', title: 'Sentiment Analysis', action: 'โปรเจคเสร็จสิ้น', time: 'เมื่อวาน' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Link href="/mobile/client">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">โปรไฟล์บริษัท</h1>
          <Link href="/mobile/client/settings">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </button>
          </Link>
        </div>

        {/* Company Card */}
        <Card className="bg-white/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{companyInfo.name}</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {companyInfo.address}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalProjects}</div>
                <div className="text-xs text-gray-600">โปรเจค</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalLabelers}</div>
                <div className="text-xs text-gray-600">ปู่ย่า</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.avgQuality}%</div>
                <div className="text-xs text-gray-600">คุณภาพ</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Statistics */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">สถิติโดยรวม</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="text-xs font-bold text-green-700">ใช้งาน</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
                <div className="text-sm text-gray-600">กำลังดำเนินการ</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">สำเร็จ</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.completedProjects}</div>
                <div className="text-sm text-gray-600">เสร็จสิ้นแล้ว</div>
              </div>

              <div className="col-span-2 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-600">งบประมาณใช้ไป</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ฿{stats.totalSpent.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">คุณภาพเฉลี่ย</div>
                    <div className="text-2xl font-bold text-purple-600">{stats.avgQuality}%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">ข้อมูลบริษัท</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">อุตสาหกรรม</div>
                  <div className="font-bold text-gray-900">{companyInfo.industry}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">อีเมล</div>
                  <div className="font-bold text-gray-900">{companyInfo.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">เบอร์โทร</div>
                  <div className="font-bold text-gray-900">{companyInfo.phone}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">เว็บไซต์</div>
                  <div className="font-bold text-gray-900">{companyInfo.website}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">กิจกรรมล่าสุด</h3>
              <button className="text-sm text-green-600 font-medium">ดูทั้งหมด</button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'project' ? 'bg-blue-100' :
                    activity.type === 'payment' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'project' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'payment' && <Star className="w-5 h-5 text-green-600" />}
                    {activity.type === 'complete' && <Award className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{activity.title}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">การตั้งค่า</h3>
            
            <div className="space-y-2">
              <Link href="/mobile/client/settings">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">การตั้งค่าบัญชี</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </button>
              </Link>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">แก้ไขข้อมูลบริษัท</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100">
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
