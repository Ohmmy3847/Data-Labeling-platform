'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import TaskSummary from '@/components/shared/TaskSummary';
import TaskHeader from '@/components/shared/TaskHeader';
import BottomNavigation from '@/components/shared/BottomNavigation';
import { TASK_CONFIGS } from '@/config/taskConfig';

interface TextBatch {
  id: number;
  text: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface TaskResult {
  completed: number;
  total: number;
  earnings: number;
  completedAt: string;
}

const sentimentBatch: TextBatch[] = [
  { id: 1, text: "วันนี้อากาศดีมาก แสงแดดส่องใส ทำให้อารมณ์ดีขึ้นเลย" },
  { id: 2, text: "สินค้าที่สั่งมาไม่ตรงกับรูป ผิดหวังมาก" },
  { id: 3, text: "รายงานการขายเดือนนี้เป็นไปตามเป้าหมาย" },
  { id: 4, text: "ฝนตกหนักมาก จราจรติดขัดทั่วกรุง น่าร้ายจริงๆ" },
  { id: 5, text: "คอนเสิร์ตเมื่อคืนสนุกมากๆ นักร้องร้องเพราะด้วย" },
  { id: 6, text: "ข้อมูลที่ได้รับมีความถูกต้องและครบถ้วน" },
  { id: 7, text: "บริการลูกค้าแย่มาก รอนานแล้วยังไม่มีคนมาช่วย" },
  { id: 8, text: "ผลการทดสอบออกมาเป็นไปตามที่คาดการณ์ไว้" },
  { id: 9, text: "ร้านอาหารร้านนี้อร่อยมาก แนะนำให้มาลอง" },
  { id: 10, text: "เครื่องใช้ไฟฟ้าเสียอีกแล้ว ซ่อมได้ไม่กี่วันก็เสียอีก" }
];

export default function TextSentimentBatch() {
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [responses, setResponses] = useState<TextBatch[]>(
    sentimentBatch.map(item => ({ ...item, sentiment: undefined }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handleSentimentSelect = (sentiment: 'positive' | 'negative' | 'neutral') => {
    const updatedResponses = [...responses];
    const wasCompleted = updatedResponses[currentIndex].sentiment !== undefined;
    updatedResponses[currentIndex].sentiment = sentiment;
    setResponses(updatedResponses);

    // Count completed items
    if (!wasCompleted) {
      setCompletedCount(prev => prev + 1);
    }

    // Auto advance to next item
    if (currentIndex < responses.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500);
    }
  };

  const resetAll = () => {
    setResponses(sentimentBatch.map(item => ({ ...item, sentiment: undefined })));
    setCurrentIndex(0);
    setCompletedCount(0);
  };

  const submitBatch = () => {
    const completed = responses.filter(r => r.sentiment).length;
    const earnings = completed * 0.12;
    
    // เก็บผลงานและแสดงหน้าสรุป
    setTaskResult({
      completed,
      total: responses.length,
      earnings,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  const resetForm = () => {
    setShowSummary(false);
    setTaskResult(null);
    setResponses(sentimentBatch.map(item => ({ ...item, sentiment: undefined })));
    setCurrentIndex(0);
    setCompletedCount(0);
  };

  const currentText = responses[currentIndex];
  const progressPercentage = (completedCount / responses.length) * 100;

  // หน้าสรุปผลงาน
  if (showSummary && taskResult) {
    return (
      <TaskSummary
        taskResult={taskResult}
        taskInfo={{
          name: TASK_CONFIGS.t1.name,
          description: TASK_CONFIGS.t1.description,
          emoji: TASK_CONFIGS.t1.emoji,
          color: TASK_CONFIGS.t1.color,
          unit: TASK_CONFIGS.t1.unit,
          rate: TASK_CONFIGS.t1.rate
        }}
        onReset={resetForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <TaskHeader
        title={TASK_CONFIGS.t1.title}
        reward={TASK_CONFIGS.t1.reward}
        color={TASK_CONFIGS.t1.color}
        completedCount={completedCount}
        totalCount={responses.length}
      />

      <div className="px-4 py-6">
        {/* Progress Bar */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-blue-300">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">📊 ความคืบหน้า</h3>
              <span className="text-lg font-bold text-blue-600">
                ฿{(completedCount * TASK_CONFIGS.t1.rate).toFixed(2)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>เริ่มต้น</span>
              <span>เสร็จสิ้น</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Text */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                ข้อ {currentIndex + 1}: ความรู้สึกของข้อความนี้คืออะไร?
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 mb-6">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                "{currentText?.text}"
              </p>
            </div>

            {/* Sentiment Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleSentimentSelect('positive')}
                className={`w-full p-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                  currentText?.sentiment === 'positive'
                    ? 'bg-green-600 text-white border-green-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                }`}
              >
                😊 บวก (Positive)
              </button>
              
              <button
                onClick={() => handleSentimentSelect('neutral')}
                className={`w-full p-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                  currentText?.sentiment === 'neutral'
                    ? 'bg-gray-600 text-white border-gray-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                }`}
              >
                😐 เป็นกลาง (Neutral)
              </button>
              
              <button
                onClick={() => handleSentimentSelect('negative')}
                className={`w-full p-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                  currentText?.sentiment === 'negative'
                    ? 'bg-red-600 text-white border-red-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                }`}
              >
                😔 ลบ (Negative)
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex-1 py-3 bg-gray-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← ก่อนหน้า
              </button>
              
              <button
                onClick={() => setCurrentIndex(Math.min(responses.length - 1, currentIndex + 1))}
                disabled={currentIndex === responses.length - 1}
                className="flex-1 py-3 bg-blue-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-900 mb-4">📋 สรุปคำตอบ</h3>
            <div className="grid grid-cols-2 gap-3">
              {responses.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    index === currentIndex
                      ? 'bg-blue-100 border-blue-500 text-blue-900'
                      : item.sentiment
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  ข้อ {index + 1}
                  {item.sentiment && (
                    <div className="text-xs mt-1">
                      {item.sentiment === 'positive' ? '😊' : item.sentiment === 'negative' ? '😔' : '😐'}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300">
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={resetAll}
                  className="flex-1 py-4 bg-gray-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>เริ่มใหม่</span>
                </button>
              </div>
              
              <Button
                onClick={submitBatch}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Check className="w-6 h-6" />
                <span>ส่งชุดงาน (฿{(completedCount * 0.12).toFixed(2)})</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="tasks" />
    </div>
  );
}