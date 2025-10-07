'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, MessageSquare, User, Bot } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { TASK_CONFIGS } from '@/config/taskConfig';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TaskResult {
  completed: number;
  total: number;
  earnings: number;
  completedAt: string;
}

const conversation: Message[] = [
  { role: 'user', content: 'สวัสดีครับ ผมอยากสอบถามเรื่องการดูแลสุขภาพในช่วงหน้าร้อน' },
  { role: 'assistant', content: 'สวัสดีครับ! ยินดีที่ได้ช่วยเหลือ การดูแลสุขภาพในหน้าร้อนเป็นเรื่องสำคัญมาก ผมแนะนำให้ดื่มน้ำเปล่าอย่างน้อย 8-10 แก้วต่อวัน หลีกเลี่ยงการออกแดดช่วง 10:00-15:00 น. และควรสวมเสื้อผ้าสีอ่อนที่ระบายอากาศได้ดี' },
  { role: 'user', content: 'แล้วเรื่องอาหารล่ะครับ มีข้อแนะนำอะไรบ้าง?' },
  { role: 'assistant', content: 'สำหรับอาหารในช่วงหน้าร้อน ควรเน้นอาหารที่ย่อยง่าย เช่น ผลไม้สดที่มีน้ำสูง เช่น แตงโม ส้ม ลิ้นจี่ ลดการกินอาหารมัน อาหารทอด และอาหารรสจัด ควรกินอาหารที่ปรุงสุกใหม่ เพื่อป้องกันท้องเสีย และควรกินอาหารเป็นมื้อเล็กๆ บ่อยๆ จะดีกว่าการกินมื้อใหญ่' }
];

const questions = [
  {
    id: 1,
    question: 'การตอบของ AI ถูกต้องและมีประโยชน์หรือไม่?',
    options: [
      { value: 'very_helpful', label: '✅ มีประโยชน์มาก', color: 'green' },
      { value: 'helpful', label: '👍 มีประโยชน์', color: 'blue' },
      { value: 'neutral', label: '😐 เฉยๆ', color: 'gray' },
      { value: 'not_helpful', label: '👎 ไม่มีประโยชน์', color: 'red' }
    ]
  },
  {
    id: 2,
    question: 'ความชัดเจนและเข้าใจง่ายของคำตอบ',
    options: [
      { value: 'very_clear', label: '💯 ชัดเจนมาก', color: 'green' },
      { value: 'clear', label: '👌 ชัดเจน', color: 'blue' },
      { value: 'somewhat_clear', label: '🤔 ค่อนข้างชัดเจน', color: 'yellow' },
      { value: 'unclear', label: '😵 ไม่ชัดเจน', color: 'red' }
    ]
  },
  {
    id: 3,
    question: 'ความสุภาพและเป็นมิตรของการตอบ',
    options: [
      { value: 'very_polite', label: '🤗 สุภาพมาก', color: 'green' },
      { value: 'polite', label: '😊 สุภาพ', color: 'blue' },
      { value: 'neutral', label: '😐 เฉยๆ', color: 'gray' },
      { value: 'impolite', label: '😠 หยาบคาย', color: 'red' }
    ]
  }
];

export default function ChatQAEvaluation() {
  const [responses, setResponses] = useState<{[key: number]: string}>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const router = useRouter();

  const handleResponse = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Auto advance to next question
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    }
  };

  const submitEvaluation = () => {
    const completedResponses = Object.keys(responses).length;
    if (completedResponses < questions.length) {
      alert(`กรุณาตอบคำถามให้ครบทั้ง ${questions.length} ข้อ (ตอบแล้ว ${completedResponses} ข้อ)`);
      return;
    }
    
    // Set task result and show summary
    setTaskResult({
      completed: questions.length,
      total: questions.length,
      earnings: TASK_CONFIGS.t3.rate,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      green: isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:border-green-500',
      blue: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500',
      yellow: isSelected ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500',
      gray: isSelected ? 'bg-gray-600 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500',
      red: isSelected ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const completedCount = Object.keys(responses).length;

  if (showSummary && taskResult) {
    return (
      <div className="min-h-screen bg-orange-50 p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Success Banner */}
          <Card variant="soft" padding="lg" className="border-2 border-orange-300 bg-orange-100">
            <CardContent>
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">งานเสร็จสิ้น!</h1>
                <p className="text-gray-600">การประเมินการสนทนาเสร็จสมบูรณ์</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card variant="soft" padding="lg" className="border-2 border-orange-300">
            <CardContent>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">สรุปรายได้</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                  <span className="text-gray-600">งานที่ทำเสร็จ:</span>
                  <span className="font-bold text-gray-800">{taskResult.completed} คำถาม</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                  <span className="text-gray-600">อัตราค่าจ้าง:</span>
                  <span className="font-bold text-gray-800">฿{TASK_CONFIGS.t3.rate} ต่องาน</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-600 text-white rounded-xl">
                  <span className="text-lg font-bold">รวมทั้งหมด:</span>
                  <span className="text-2xl font-bold">฿{taskResult.earnings.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Details */}
          <Card variant="soft" padding="lg" className="border-2 border-orange-300">
            <CardContent>
              <h3 className="text-lg font-bold text-gray-800 mb-3">รายละเอียดงาน</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>ประเภทงาน:</strong> การประเมินการสนทนา</p>
                <p><strong>จำนวนคำถาม:</strong> {taskResult.total} คำถาม</p>
                <p><strong>เวลาที่เสร็จ:</strong> {taskResult.completedAt}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/mobile/labeler/summary')}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:from-orange-700 hover:to-red-700 transition-colors"
            >
              ดูสรุปผลงานทั้งหมด
            </Button>
            <Button
              onClick={() => router.push('/mobile/labeler')}
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-orange-700 transition-colors"
            >
              กลับหน้าหลัก
            </Button>
            <Button
              onClick={() => {
                setShowSummary(false);
                setTaskResult(null);
                setResponses({});
                setCurrentQuestion(0);
              }}
              variant="secondary"
              className="w-full py-4 bg-white text-orange-600 border-2 border-orange-600 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-colors"
            >
              ทำงานใหม่
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b-4 border-orange-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/labeler/tasks">
              <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">ประเมินการสนทนา AI</h1>
              <p className="text-base text-gray-700 font-medium">รางวัล: ฿{TASK_CONFIGS.t3.rate}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{completedCount}/{questions.length}</div>
            <div className="text-sm text-gray-600">เสร็จแล้ว</div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Conversation */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-900 mb-4">💬 บทสนทนาที่ต้องประเมิน</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conversation.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  } rounded-2xl px-4 py-3`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'ผู้ใช้' : 'AI Assistant'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-orange-300">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                📋 ข้อ {currentQuestion + 1}: {questions[currentQuestion].question}
              </h3>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(questions[currentQuestion].id, option.value)}
                  className={`w-full p-4 rounded-2xl border-3 font-bold text-lg transition-all ${
                    getColorClasses(option.color, responses[questions[currentQuestion].id] === option.value)
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex-1 py-3 bg-gray-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← ก่อนหน้า
              </button>
              
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="flex-1 py-3 bg-orange-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 สรุปความคืบหน้า</h3>
            <div className="grid grid-cols-3 gap-3">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    index === currentQuestion
                      ? 'bg-orange-100 border-orange-500 text-orange-900'
                      : responses[question.id]
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  ข้อ {index + 1}
                  {responses[question.id] && (
                    <div className="text-xs mt-1">✓ ตอบแล้ว</div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300">
          <CardContent>
            <Button
              onClick={submitEvaluation}
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="w-6 h-6" />
              <span>ส่งการประเมิน (฿{TASK_CONFIGS.t3.rate})</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}