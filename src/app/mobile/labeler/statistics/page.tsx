'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, Target, Award, Calendar, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { LABELER_REWARDS } from '@/config/rewardsConfig';

export default function StatisticsPage() {
  const stats = {
    accuracy: LABELER_REWARDS.stats.accuracy,
    totalTasks: LABELER_REWARDS.tasks.completed,
    totalEarned: LABELER_REWARDS.earnings.totalEarned,
    avgPerTask: LABELER_REWARDS.earnings.avgPerTask,
    bestDay: LABELER_REWARDS.stats.bestDayTasks,
    currentStreak: LABELER_REWARDS.stats.currentStreak,
    longestStreak: LABELER_REWARDS.stats.longestStreak,
    tasksThisWeek: LABELER_REWARDS.tasks.thisWeek,
    tasksThisMonth: LABELER_REWARDS.tasks.thisMonth
  };

  const taskBreakdown = [
    { type: 'งานแปลข้อความ', count: 58, earnings: 725.00, percentage: 23 },
    { type: 'งานอ่านออกเสียง', count: 42, earnings: 1050.00, percentage: 17 },
    { type: 'งานแท็กรูปภาพ', count: 35, earnings: 280.00, percentage: 14 },
    { type: 'งานระบุวัตถุในภาพ', count: 28, earnings: 560.00, percentage: 11 },
    { type: 'งานตรวจสอบไวยากรณ์', count: 24, earnings: 432.00, percentage: 10 },
    { type: 'อื่นๆ', count: 60, earnings: 403.50, percentage: 25 },
  ];

  const weeklyData = [
    { day: 'จ', tasks: 3, earnings: 45.50 },
    { day: 'อ', tasks: 2, earnings: 32.00 },
    { day: 'พ', tasks: 4, earnings: 58.00 },
    { day: 'พฤ', tasks: 1, earnings: 12.50 },
    { day: 'ศ', tasks: 3, earnings: 47.00 },
    { day: 'ส', tasks: 2, earnings: 28.00 },
    { day: 'อา', tasks: 0, earnings: 0 },
  ];

  const maxTasks = Math.max(...weeklyData.map(d => d.tasks));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-5 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/mobile/labeler/profile">
              <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-white">สถิติการทำงาน</h1>
            <div className="w-12"></div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/95">
              <CardContent className="p-3 text-center">
                <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">{stats.accuracy}%</div>
                <div className="text-xs text-gray-600">ความแม่นยำ</div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-3 text-center">
                <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900">{stats.totalTasks}</div>
                <div className="text-xs text-gray-600">งานสำเร็จ</div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-3 text-center">
                <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-900 break-words">฿{stats.avgPerTask}</div>
                <div className="text-xs text-gray-600">เฉลี่ย/งาน</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Weekly Overview */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 text-indigo-600 mr-2 flex-shrink-0" />
              <span>สัปดาห์นี้</span>
            </h3>

            <div className="flex items-end justify-between h-32 mb-3">
              {weeklyData.map((day, index) => {
                const height = maxTasks > 0 ? (day.tasks / maxTasks) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="relative w-full px-1 flex flex-col justify-end" style={{ height: '100px' }}>
                      <div 
                        className={`w-full rounded-t-lg transition-all ${
                          day.tasks > 0 
                            ? 'bg-gradient-to-t from-indigo-500 to-purple-600' 
                            : 'bg-gray-200'
                        }`}
                        style={{ height: `${height}%`, minHeight: day.tasks > 0 ? '8px' : '4px' }}
                      >
                        {day.tasks > 0 && (
                          <div className="text-center text-white font-bold text-xs pt-1">
                            {day.tasks}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 font-medium">{day.day}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
              <div>
                <div className="text-xs text-gray-600">งานสัปดาห์นี้</div>
                <div className="text-xl font-bold text-indigo-600">{stats.tasksThisWeek}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">รายได้สัปดาห์นี้</div>
                <div className="text-xl font-bold text-green-600 break-words">
                  ฿{weeklyData.reduce((sum, d) => sum + d.earnings, 0).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streaks & Records */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300">
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <Zap className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
              <span className="break-words">สถิติและสถิติสูงสุด</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
                <div className="text-xs text-gray-600">วันติดต่อกัน</div>
              </div>

              <div className="text-center p-3 bg-white rounded-xl">
                <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-purple-600">{stats.longestStreak}</div>
                <div className="text-xs text-gray-600">สถิติสูงสุด</div>
              </div>

              <div className="text-center p-3 bg-white rounded-xl">
                <Target className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">{stats.bestDay}</div>
                <div className="text-xs text-gray-600">งาน/วันสูงสุด</div>
              </div>

              <div className="text-center p-3 bg-white rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">{stats.tasksThisMonth}</div>
                <div className="text-xs text-gray-600">งานเดือนนี้</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Breakdown */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3 break-words">ประเภทงานที่ทำ</h3>
            
            <div className="space-y-3">
              {taskBreakdown.map((task, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-sm font-medium text-gray-700 break-words flex-1">{task.type}</span>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-gray-900">{task.count} งาน</span>
                      <span className="text-xs text-gray-600 ml-2">฿{task.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${task.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Earnings */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600">
          <CardContent className="p-5 text-center">
            <TrendingUp className="w-10 h-10 text-white mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white mb-2 break-words">รายได้สะสมทั้งหมด</h3>
            <div className="text-3xl font-bold text-white mb-3 break-words">
              ฿{stats.totalEarned.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/30">
              <div>
                <div className="text-xs text-white/80">เฉลี่ยต่องาน</div>
                <div className="text-lg font-bold text-white break-words">฿{stats.avgPerTask}</div>
              </div>
              <div>
                <div className="text-xs text-white/80">ความแม่นยำ</div>
                <div className="text-lg font-bold text-white">{stats.accuracy}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
