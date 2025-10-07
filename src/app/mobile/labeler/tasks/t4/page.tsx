'use client';

import { useState } from 'react';
import { ArrowLeft, Send, User, Bot, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TASK_CONFIGS } from '@/config/taskConfig';

// Mock dialogue data
const dialogue = [
  { role: 'user', message: 'สวัสดีครับ ผมต้องการข้อมูลเกี่ยวกับการลงทุนในหุ้น' },
  { role: 'bot', message: 'สวัสดีครับ! ยินดีที่ได้ช่วยเหลือเรื่องการลงทุนในหุ้น คุณมีประสบการณ์การลงทุนมาแล้วหรือเปล่าครับ?' },
  { role: 'user', message: 'ยังไม่เคยเลยครับ อยากเริ่มต้นแต่ไม่รู้จะเริ่มยังไง' },
  { role: 'bot', message: 'เข้าใจครับ สำหรับผู้เริ่มต้น ผมแนะนำให้เริ่มจากการศึกษาพื้นฐานก่อน เช่น เข้าใจความเสี่ยง กำหนดเป้าหมายการลงทุน และจัดสรรเงินทุน คุณมีเป้าหมายการลงทุนอะไรไหมครับ?' },
  { role: 'user', message: 'อยากได้เงินเพิ่มสำหรับเกษียณครับ อายุ 35 แล้ว' },
  { role: 'bot', message: 'เยี่ยมครับ! การวางแผนเพื่อเกษียณตอนอายุ 35 ถือเป็นการเริ่มต้นที่ดีมาก ระยะเวลา 25-30 ปี จะช่วยให้การลงทุนมีผลตอบแทนที่ดี ผมแนะนำให้เริ่มจากกองทุนรวมหุ้นระยะยาวและค่อยๆ เรียนรู้ คุณมีเงินทุนเริ่มต้นประมาณเท่าไหร่ครับ?' }
];

const evaluationCriteria = [
  { id: 'helpful', label: 'ความเป็นประโยชน์', description: 'คำตอบช่วยผู้ใช้ได้จริงหรือไม่' },
  { id: 'accurate', label: 'ความถูกต้อง', description: 'ข้อมูลที่ให้มีความแม่นยำ' },
  { id: 'relevant', label: 'ความเกี่ยวข้อง', description: 'ตอบตรงประเด็นคำถาม' },
  { id: 'clear', label: 'ความชัดเจน', description: 'อธิบายเข้าใจง่าย' },
  { id: 'engaging', label: 'ความน่าสนใจ', description: 'ทำให้ผู้ใช้อยากสนทนาต่อ' }
];

export default function MultiTurnDialogueTask() {
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [overallRating, setOverallRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (criteria: string, rating: number) => {
    setRatings(prev => ({ ...prev, [criteria]: rating }));
  };

  const handleSubmit = () => {
    if (Object.keys(ratings).length === evaluationCriteria.length && overallRating > 0) {
      setSubmitted(true);
      console.log('Multi-turn dialogue evaluation:', { ratings, overallRating });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <ThumbsUp className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งการประเมินแล้ว!</h1>
            <p className="text-gray-600 mb-6">ขอบคุณสำหรับการประเมินบทสนทนา</p>
            <Link href="/mobile/labeler/tasks">
              <Button variant="primary" size="lg">
                กลับไปหน้า Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b-4 border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Link href="/mobile/labeler/tasks">
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Multi-turn Dialogue</h1>
            <p className="text-sm text-gray-600">ประเมินคุณภาพบทสนทนา</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Instructions */}
        <Card className="p-6 border-3 border-blue-200 bg-blue-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3">คำแนะนำ</h2>
          <p className="text-gray-700 mb-3">
            อ่านบทสนทนาต่อไปนี้และประเมินคุณภาพของ AI ในแต่ละด้าน
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ให้คะแนนแต่ละด้าน 1-5 ดาว</li>
            <li>• พิจารณาความเหมาะสมของคำตอบ</li>
            <li>• ให้คะแนนรวมท้ายสุด</li>
          </ul>
        </Card>

        {/* Dialogue Display */}
        <Card className="p-4 border-3 border-gray-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">บทสนทนา</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {dialogue.map((msg, index) => (
              <div key={index} className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {msg.role === 'user' ? 
                    <User className="w-5 h-5 text-blue-600" /> : 
                    <Bot className="w-5 h-5 text-green-600" />
                  }
                </div>
                <div className={`flex-1 p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rating Criteria */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">ประเมินตามเกณฑ์</h3>
          {evaluationCriteria.map((criteria) => (
            <Card key={criteria.id} className="p-4 border-2 border-gray-300">
              <div className="mb-3">
                <h4 className="font-bold text-gray-900">{criteria.label}</h4>
                <p className="text-sm text-gray-600">{criteria.description}</p>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(criteria.id, star)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      ratings[criteria.id] >= star
                        ? 'bg-yellow-400 border-yellow-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-yellow-300'
                    }`}
                  >
                    <Star className={`w-6 h-6 ${ratings[criteria.id] >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <Card className="p-4 border-3 border-purple-300 bg-purple-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">คะแนนรวม</h3>
          <p className="text-sm text-gray-600 mb-3">ให้คะแนนรวมของบทสนทนาทั้งหมด</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setOverallRating(star)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  overallRating >= star
                    ? 'bg-purple-500 border-purple-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400 hover:border-purple-300'
                }`}
              >
                <Star className={`w-7 h-7 ${overallRating >= star ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={Object.keys(ratings).length !== evaluationCriteria.length || overallRating === 0}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            ส่งการประเมิน
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          ประเมินแล้ว {Object.keys(ratings).length + (overallRating > 0 ? 1 : 0)}/{evaluationCriteria.length + 1} ข้อ
        </div>
      </div>
    </div>
  );
}