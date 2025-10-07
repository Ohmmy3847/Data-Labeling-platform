'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { LABELER_REWARDS } from '@/config/rewardsConfig';

export default function HistoryPage() {
  const history = [
    { 
      date: 'วันนี้', 
      tasks: [
        { id: 't1', name: 'งานแปลข้อความ', completed: '14:30', reward: 12.50, status: 'completed' },
        { id: 't2', name: 'งานอ่านออกเสียง', completed: '12:15', reward: 25.00, status: 'completed' },
        { id: 't11', name: 'งานบันทึกเสียง', completed: '10:20', reward: 0.25, status: 'completed' },
      ]
    },
    { 
      date: 'เมื่อวาน', 
      tasks: [
        { id: 't3', name: 'งานแท็กรูปภาพ', completed: '16:45', reward: 8.00, status: 'completed' },
        { id: 't4', name: 'งานจับคู่ข้อความ', completed: '15:30', reward: 15.00, status: 'completed' },
        { id: 't5', name: 'งานประเมินความรู้สึก', completed: '14:10', reward: 5.00, status: 'completed' },
        { id: 't2', name: 'งานอ่านออกเสียง', completed: '11:00', reward: 25.00, status: 'completed' },
      ]
    },
    { 
      date: '2 วันที่แล้ว', 
      tasks: [
        { id: 't6', name: 'งานระบุวัตถุในภาพ', completed: '18:20', reward: 20.00, status: 'completed' },
        { id: 't1', name: 'งานแปลข้อความ', completed: '13:45', reward: 12.50, status: 'completed' },
      ]
    },
    { 
      date: '3 วันที่แล้ว', 
      tasks: [
        { id: 't7', name: 'งานจัดกลุ่มคำ', completed: '17:30', reward: 10.00, status: 'completed' },
        { id: 't8', name: 'งานตรวจสอบไวยากรณ์', completed: '16:15', reward: 18.00, status: 'completed' },
        { id: 't3', name: 'งานแท็กรูปภาพ', completed: '12:50', reward: 8.00, status: 'completed' },
      ]
    },
  ];

  const stats = {
    totalTasks: LABELER_REWARDS.tasks.completed,
    totalEarned: LABELER_REWARDS.earnings.totalEarned,
    thisWeek: LABELER_REWARDS.tasks.thisWeek,
    thisMonth: LABELER_REWARDS.tasks.thisMonth
  };

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
            <h1 className="text-2xl font-bold text-gray-900">ประวัติการทำงาน</h1>
            <p className="text-sm text-gray-600">งานที่ทำทั้งหมด</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{stats.totalTasks}</div>
              <div className="text-sm text-white/80">งานทั้งหมด</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">฿{stats.totalEarned}</div>
              <div className="text-sm text-white/80">รายได้รวม</div>
            </CardContent>
          </Card>
        </div>

        {/* This Week/Month */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 divide-x">
              <div className="text-center pr-4">
                <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.thisWeek}</div>
                <div className="text-sm text-gray-600">งานสัปดาห์นี้</div>
              </div>
              <div className="text-center pl-4">
                <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.thisMonth}</div>
                <div className="text-sm text-gray-600">งานเดือนนี้</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {history.map((day, dayIndex) => {
            const dayTotal = day.tasks.reduce((sum, task) => sum + task.reward, 0);
            
            return (
              <Card key={dayIndex}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">{day.date}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{day.tasks.length} งาน</div>
                      <div className="text-lg font-bold text-green-600">+฿{dayTotal.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {day.tasks.map((task, taskIndex) => (
                      <Link key={taskIndex} href={`/mobile/labeler/tasks/${task.id}`}>
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{task.name}</div>
                              <div className="text-sm text-gray-600">เสร็จเมื่อ {task.completed}</div>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            +฿{task.reward.toFixed(2)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <button className="w-full py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors">
          โหลดเพิ่มเติม
        </button>

        {/* End Message */}
        <div className="text-center text-sm text-gray-500 pb-4">
          <p>แสดง 4 วันล่าสุด</p>
        </div>
      </div>
    </div>
  );
}
