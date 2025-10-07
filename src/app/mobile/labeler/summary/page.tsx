'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, Calendar, Award, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import BottomNavigation from '@/components/shared/BottomNavigation';

interface TaskSummary {
  taskId: string;
  taskName: string;
  completedItems: number;
  totalEarnings: number;
  completedAt: string;
  color: string;
}

export default function TaskSummaryPage() {
  const router = useRouter();
  const [taskSummaries, setTaskSummaries] = useState<TaskSummary[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    // จำลองข้อมูลสรุปงาน (จริงๆ ควรดึงจาก localStorage หรือ API)
    const mockSummaries: TaskSummary[] = [
      {
        taskId: 't1',
        taskName: 'วิเคราะห์ความรู้สึก',
        completedItems: 25,
        totalEarnings: 3.00,
        completedAt: '2025-10-06 14:30',
        color: 'blue'
      },
      {
        taskId: 't2',
        taskName: 'แท็กรูปภาพ',
        completedItems: 20,
        totalEarnings: 3.00,
        completedAt: '2025-10-06 15:45',
        color: 'purple'
      },
      {
        taskId: 't3',
        taskName: 'ประเมินการสนทนา',
        completedItems: 5,
        totalEarnings: 1.25,
        completedAt: '2025-10-06 16:20',
        color: 'orange'
      },
      {
        taskId: 't10',
        taskName: 'วาดกรอบวัตถุ',
        completedItems: 12,
        totalEarnings: 6.00,
        completedAt: '2025-10-06 17:10',
        color: 'teal'
      },
      {
        taskId: 't11',
        taskName: 'จำแนกเสียง',
        completedItems: 15,
        totalEarnings: 2.70,
        completedAt: '2025-10-06 18:00',
        color: 'yellow'
      },
      {
        taskId: 't12',
        taskName: 'รวบรวมข้อมูล',
        completedItems: 8,
        totalEarnings: 4.50,
        completedAt: '2025-10-06 19:15',
        color: 'green'
      }
    ];

    setTaskSummaries(mockSummaries);
    setTotalEarnings(mockSummaries.reduce((sum, task) => sum + task.totalEarnings, 0));
    setTotalTasks(mockSummaries.length);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-300 text-blue-800',
      purple: 'bg-purple-100 border-purple-300 text-purple-800',
      orange: 'bg-orange-100 border-orange-300 text-orange-800',
      teal: 'bg-teal-100 border-teal-300 text-teal-800',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      green: 'bg-green-100 border-green-300 text-green-800'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const getBadgeColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 text-white',
      purple: 'bg-purple-600 text-white',
      orange: 'bg-orange-600 text-white',
      teal: 'bg-teal-600 text-white',
      yellow: 'bg-yellow-600 text-white',
      green: 'bg-green-600 text-white'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-24">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <Button
            onClick={() => router.push('/mobile/labeler')}
            variant="secondary"
            className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>กลับ</span>
          </Button>
          <h1 className="text-xl font-bold text-gray-800">สรุปผลงาน</h1>
          <div className="w-20"></div>
        </header>

        {/* Overall Summary */}
        <Card variant="soft" padding="lg" className="border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-green-100">
          <CardContent>
            <div className="text-center space-y-3">
              <div className="text-5xl">💰</div>
              <h2 className="text-xl font-bold text-gray-800 break-words">สรุปรายได้รวม</h2>
              <div className="text-3xl font-bold text-green-600 break-words">
                ฿{totalEarnings.toFixed(2)}
              </div>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span>{totalTasks} งาน</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>วันนี้</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Breakdown */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="break-words">รายละเอียดตามงาน</span>
            </h3>
            <div className="space-y-3">
              {taskSummaries.map((task) => (
                <div
                  key={task.taskId}
                  className={`p-3 rounded-xl border-2 ${getColorClasses(task.color)}`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1 flex-wrap">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getBadgeColorClasses(task.color)}`}>
                          {task.taskId.toUpperCase()}
                        </span>
                        <span className="font-bold text-gray-800 text-sm break-words">{task.taskName}</span>
                      </div>
                      <div className="text-xs text-gray-600 break-words">
                        {task.completedItems} รายการ • {task.completedAt}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-gray-800">
                        ฿{task.totalEarnings.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300">
          <CardContent>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 flex-shrink-0" />
              สถิติ
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-xl font-bold text-blue-600">
                  {taskSummaries.reduce((sum, task) => sum + task.completedItems, 0)}
                </div>
                <div className="text-xs text-gray-600">รายการทั้งหมด</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-xl font-bold text-green-600 break-words">
                  ฿{(totalEarnings / totalTasks).toFixed(2)}
                </div>
                <div className="text-xs text-gray-600">เฉลี่ยต่องาน</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push('/mobile/labeler')}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl font-bold text-base shadow-lg hover:from-blue-700 hover:to-green-700 transition-all"
          >
            กลับทำงานต่อ
          </Button>
          <Button
            onClick={() => {
              // ล้างข้อมูลสรุป (จริงๆ ควรแสดง confirmation dialog)
              setTaskSummaries([]);
              setTotalEarnings(0);
              setTotalTasks(0);
            }}
            variant="secondary"
            className="w-full py-3 bg-white text-gray-600 border-2 border-gray-300 rounded-2xl font-bold text-base hover:bg-gray-50 transition-colors"
          >
            ล้างประวัติ
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="summary" />
    </div>
  );
}