'use client';

import Link from 'next/link';
import { ArrowLeft, FolderOpen, Clock, Users, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ProjectsPage() {
  const projects = [
    {
      id: 'p1',
      name: 'Thai Voice Recognition',
      type: 'เสียง',
      status: 'active',
      progress: 75,
      labelers: 45,
      completed: 7500,
      total: 10000,
      quality: 96,
      deadline: '15 ธ.ค. 2024',
      budget: 125000,
      spent: 93750
    },
    {
      id: 'p2',
      name: 'Thai Text Translation',
      type: 'ข้อความ',
      status: 'active',
      progress: 60,
      labelers: 32,
      completed: 12000,
      total: 20000,
      quality: 94,
      deadline: '20 ธ.ค. 2024',
      budget: 250000,
      spent: 150000
    },
    {
      id: 'p3',
      name: 'Object Detection Dataset',
      type: 'ภาพ',
      status: 'active',
      progress: 40,
      labelers: 28,
      completed: 4000,
      total: 10000,
      quality: 98,
      deadline: '31 ธ.ค. 2024',
      budget: 200000,
      spent: 80000
    },
    {
      id: 'p4',
      name: 'Sentiment Analysis',
      type: 'ข้อความ',
      status: 'completed',
      progress: 100,
      labelers: 50,
      completed: 15000,
      total: 15000,
      quality: 97,
      deadline: '1 ธ.ค. 2024',
      budget: 180000,
      spent: 180000
    },
  ];

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const stats = {
    total: projects.length,
    active: activeProjects.length,
    completed: completedProjects.length,
    totalLabelers: projects.reduce((sum, p) => sum + p.labelers, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-50 border-b-2 border-green-200">
        <div className="flex items-center space-x-4">
          <Link href="/mobile/client">
            <button className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-green-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">โปรเจคทั้งหมด</h1>
            <p className="text-sm text-gray-600">{stats.total} โปรเจค</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600">
            <CardContent className="p-4 text-center">
              <FolderOpen className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <div className="text-xs text-white/80">กำลังดำเนินการ</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.completed}</div>
              <div className="text-xs text-white/80">เสร็จสิ้น</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalLabelers}</div>
              <div className="text-xs text-white/80">ปู่ย่าทำงาน</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        {activeProjects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">กำลังดำเนินการ</h2>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <Link key={project.id} href={`/mobile/client/projects/${project.id}`}>
                  <Card className="border-2 border-green-300 hover:border-green-400 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                              {project.type}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {project.labelers} คน
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-green-100 rounded-full">
                          <span className="text-xs font-bold text-green-700">ดำเนินการ</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">ความคืบหน้า</span>
                          <span className="text-sm font-bold text-green-600">
                            {project.completed.toLocaleString()} / {project.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
                          <span>{project.progress}% เสร็จสิ้น</span>
                          <span>คุณภาพ {project.quality}%</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>ครบกำหนด {project.deadline}</span>
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          ฿{project.spent.toLocaleString()} / ฿{project.budget.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">เสร็จสิ้นแล้ว</h2>
            <div className="space-y-4">
              {completedProjects.map((project) => (
                <Link key={project.id} href={`/mobile/client/projects/${project.id}`}>
                  <Card className="border-2 border-gray-200 opacity-90 hover:opacity-100 transition-opacity">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">
                              {project.type}
                            </span>
                            <span className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />
                              {project.completed.toLocaleString()} งาน
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-gray-100 rounded-full">
                          <span className="text-xs font-bold text-gray-600">เสร็จสิ้น</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          คุณภาพ <span className="font-bold text-green-600">{project.quality}%</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          ฿{project.spent.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Create New Project */}
        <Link href="/mobile/client/create-project">
          <Card className="border-4 border-dashed border-green-300 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">สร้างโปรเจคใหม่</h3>
              <p className="text-gray-600">เริ่มโปรเจคของคุณวันนี้</p>
            </CardContent>
          </Card>
        </Link>

        {/* Empty State */}
        {projects.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">ยังไม่มีโปรเจค</h3>
              <p className="text-gray-500 mb-6">เริ่มสร้างโปรเจคแรกของคุณ</p>
              <Link href="/mobile/client/create-project">
                <Button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold">
                  สร้างโปรเจค
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
