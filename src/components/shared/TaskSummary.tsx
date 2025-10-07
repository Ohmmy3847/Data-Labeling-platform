'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface TaskSummaryProps {
  taskResult: {
    completed: number;
    total: number;
    earnings: number;
    completedAt: string;
  };
  taskInfo: {
    name: string;
    description: string;
    emoji: string;
    color: string;
    unit: string;
    rate: number;
  };
  onReset: () => void;
}

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: 'bg-blue-50',
      card: 'border-blue-300 bg-blue-100',
      cardBorder: 'border-blue-300',
      primary: 'bg-blue-600 text-white',
      secondary: 'text-blue-600 border-blue-600',
      gradient: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
    },
    purple: {
      bg: 'bg-purple-50',
      card: 'border-purple-300 bg-purple-100',
      cardBorder: 'border-purple-300',
      primary: 'bg-purple-600 text-white',
      secondary: 'text-purple-600 border-purple-600',
      gradient: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    },
    orange: {
      bg: 'bg-orange-50',
      card: 'border-orange-300 bg-orange-100',
      cardBorder: 'border-orange-300',
      primary: 'bg-orange-600 text-white',
      secondary: 'text-orange-600 border-orange-600',
      gradient: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
    },
    teal: {
      bg: 'bg-teal-50',
      card: 'border-teal-300 bg-teal-100',
      cardBorder: 'border-teal-300',
      primary: 'bg-teal-600 text-white',
      secondary: 'text-teal-600 border-teal-600',
      gradient: 'from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700'
    },
    yellow: {
      bg: 'bg-yellow-50',
      card: 'border-yellow-300 bg-yellow-100',
      cardBorder: 'border-yellow-300',
      primary: 'bg-yellow-600 text-white',
      secondary: 'text-yellow-600 border-yellow-600',
      gradient: 'from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
    },
    green: {
      bg: 'bg-green-50',
      card: 'border-green-300 bg-green-100',
      cardBorder: 'border-green-300',
      primary: 'bg-green-600 text-white',
      secondary: 'text-green-600 border-green-600',
      gradient: 'from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function TaskSummary({ taskResult, taskInfo, onReset }: TaskSummaryProps) {
  const router = useRouter();
  const colors = getColorClasses(taskInfo.color);

  return (
    <div className={`min-h-screen ${colors.bg} p-4`}>
      <div className="max-w-md mx-auto space-y-6">
        {/* Success Banner */}
        <Card variant="soft" padding="lg" className={`border-2 ${colors.card}`}>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl mb-4">{taskInfo.emoji}</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">งานเสร็จสิ้น!</h1>
              <p className="text-gray-600">{taskInfo.description}เสร็จสมบูรณ์</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card variant="soft" padding="lg" className={`border-2 ${colors.cardBorder}`}>
          <CardContent>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">สรุปรายได้</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                <span className="text-gray-600">{taskInfo.unit}ที่ทำเสร็จ:</span>
                <span className="font-bold text-gray-800">{taskResult.completed} {taskInfo.unit}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                <span className="text-gray-600">อัตราค่าจ้าง:</span>
                <span className="font-bold text-gray-800">฿{taskInfo.rate.toFixed(2)} ต่อ{taskInfo.unit}</span>
              </div>
              <div className={`flex justify-between items-center p-4 ${colors.primary} rounded-xl`}>
                <span className="text-lg font-bold">รวมทั้งหมด:</span>
                <span className="text-2xl font-bold">฿{taskResult.earnings.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Details */}
        <Card variant="soft" padding="lg" className={`border-2 ${colors.cardBorder}`}>
          <CardContent>
            <h3 className="text-lg font-bold text-gray-800 mb-3">รายละเอียดงาน</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>ประเภทงาน:</strong> {taskInfo.name}</p>
              <p><strong>จำนวน{taskInfo.unit}:</strong> {taskResult.total} {taskInfo.unit}</p>
              <p><strong>เวลาที่เสร็จ:</strong> {taskResult.completedAt}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push('/mobile/labeler/summary')}
            className={`w-full py-4 bg-gradient-to-r ${colors.gradient} text-white rounded-2xl font-bold text-lg shadow-lg transition-colors`}
          >
            ดูสรุปผลงานทั้งหมด
          </Button>
          <Button
            onClick={() => router.push('/mobile/labeler')}
            className={`w-full py-4 ${colors.primary} rounded-2xl font-bold text-lg shadow-lg hover:opacity-90 transition-colors`}
          >
            กลับหน้าหลัก
          </Button>
          
        </div>
      </div>
    </div>
  );
}