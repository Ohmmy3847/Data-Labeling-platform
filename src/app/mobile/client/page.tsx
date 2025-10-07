'use client';

import Link from 'next/link';
import { 
  Building2, Plus, Users, TrendingUp, Eye, 
  FileText, Activity, DollarSign, Settings,
  BarChart3, PieChart, Calendar, FolderOpen, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockProjects } from '@/data/mockData';

export default function MobileClientDashboard() {
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const totalCost = mockProjects.reduce((sum, p) => sum + (p.rewardPerLabel * p.totalItems), 0);
  const avgProgress = mockProjects.reduce((sum, p) => sum + (p.completedItems / p.totalItems * 100), 0) / mockProjects.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold">น</span>
            </div>
            <div>
              <h1 className="font-bold text-green-800">น้องปันปัน บิซิเนส</h1>
              <p className="text-xs text-green-600">แดชบอร์ดบริษัท</p>
            </div>
          </div>
          
          <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Welcome & Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-2">สวัสดี คุณเดวิด! 👋</h2>
          <p className="text-green-700 mb-4">ภาพรวมโปรเจคจากปู่ย่านักป้ายข้อมูล</p>
          
          {/* Main CTA Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/mobile/client/create-project">
              <Button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>สร้างโปรเจค</span>
              </Button>
            </Link>
            
            <Link href="/mobile/client/custom-request">
              <Button className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>ขอปรับแต่ง</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics - Mobile Grid */}
                {/* Stats Overview - Key Point #1 - เน้นภาพรวมโปรเจกต์ */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">{activeProjects}</div>
                <div className="text-sm text-green-600">โปรเจกต์กำลังรัน</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {mockProjects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-green-600">โปรเจกต์สำเร็จ</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">{Math.round(avgProgress)}%</div>
                <div className="text-sm text-green-600">ความคืบหน้าเฉลี่ย</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-xl font-bold text-green-800">฿{(totalCost/1000).toFixed(0)}K</div>
                <div className="text-sm text-green-600">ค่าใช้จ่ายรวม</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Key Point #2 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">การดำเนินการ</h3>
          
          <Card variant="gradient" padding="lg" className="mb-4">
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-green-800 mb-2">สร้างโปรเจคใหม่</h3>
                <p className="text-green-700 text-sm mb-4">เริ่มต้นด้วยเทมเพลตหรือคำขอพิเศษ</p>
                <Link href="/mobile/client/create">
                  <Button variant="primary" size="lg" fullWidth>
                    เริ่มสร้างเลย
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/mobile/client/projects">
              <Card variant="soft" padding="lg" className="group active:scale-95 transition-transform">
                <CardContent>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="font-medium text-green-800 text-sm">โปรเจคทั้งหมด</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/mobile/client/insights">
              <Card variant="soft" padding="lg" className="group active:scale-95 transition-transform">
                <CardContent>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="font-medium text-green-800 text-sm">รายงานผล</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Projects - Key Point #3 - แสดงเป็นรายโปรเจกต์ */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-800">โปรเจกต์ทั้งหมด</h3>
            <Link href="/mobile/client/projects" className="text-green-600 text-sm font-medium">
              จัดการ
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockProjects.map((project) => {
              const progress = Math.round(project.completedItems / project.totalItems * 100);
              const cost = project.rewardPerLabel * project.completedItems;
              
              return (
                <Link key={project.id} href={`/mobile/client/projects/${project.id}`}>
                  <Card variant="elevated" padding="lg" className="group active:scale-98 transition-transform">
                    <CardContent>
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                project.status === 'active' ? 'bg-green-500' :
                                project.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                              }`}></div>
                              <h4 className="font-bold text-green-800 truncate">{project.title}</h4>
                            </div>
                            <p className="text-xs text-green-600 line-clamp-1">{project.description}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ml-2 ${
                            project.status === 'active' ? 'bg-green-100 text-green-700' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {project.status === 'active' ? 'กำลังรัน' : 
                             project.status === 'completed' ? 'สำเร็จ' : 'รอเริ่ม'}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-green-600">ความคืบหน้า</span>
                            <span className="text-xs font-bold text-green-800">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                progress === 100 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-green-100">
                          <div className="text-center">
                            <div className="text-xs text-green-600">งาน</div>
                            <div className="text-sm font-bold text-green-800">
                              {project.completedItems}/{project.totalItems}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-green-600">ค่าใช้จ่าย</div>
                            <div className="text-sm font-bold text-green-800">
                              ฿{cost.toFixed(0)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-green-600">ความแม่น</div>
                            <div className="text-sm font-bold text-green-800">
                              {project.currentAccuracy}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile App Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          <Link href="/mobile/client" className="flex flex-col items-center py-3 text-green-600">
            <Building2 className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">หน้าหลัก</span>
          </Link>
          <Link href="/mobile/client/projects" className="flex flex-col items-center py-3 text-green-400 hover:text-green-600">
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">โปรเจค</span>
          </Link>
          <Link href="/mobile/client/insights" className="flex flex-col items-center py-3 text-green-400 hover:text-green-600">
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">รายงาน</span>
          </Link>
          <Link href="/mobile/client/profile" className="flex flex-col items-center py-3 text-green-400 hover:text-green-600">
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">ตั้งค่า</span>
          </Link>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-20"></div>
    </div>
  );
}