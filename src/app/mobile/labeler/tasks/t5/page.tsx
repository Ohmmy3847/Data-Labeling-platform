'use client';

import { useState } from 'react';
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Mock RLHF comparison data
const prompt = "อธิบายเรื่องการลงทุนในหุ้นให้คนที่ไม่มีความรู้เรื่องการเงินเลยฟัง";

const responses = {
  A: `หุ้นคือการเป็นเจ้าของส่วนหนึ่งของบริษัท เมื่อคุณซื้อหุ้น คุณจะได้รับส่วนแบ่งกำไรเมื่อบริษัทมีกำไร และราคาหุ้นอาจเพิ่มขึ้นหากบริษัทมีผลงานดี แต่ก็อาจลดลงได้เช่นกัน

การเริ่มต้นลงทุนหุ้น:
1. ศึกษาข้อมูลบริษัทก่อนซื้อ
2. เริ่มจากเงินที่เสียแล้วไม่กระทบชีวิต
3. กระจายความเสี่ยงด้วยการซื้อหลายหุ้น
4. ลงทุนระยะยาวจะได้ผลตอบแทนดีกว่า

ข้อควรระวัง: หุ้นมีความเสี่ยง อาจขาดทุนได้ ไม่ควรใช้เงินที่จำเป็นต้องใช้ในชีวิตประจำวัน`,

  B: `การลงทุนในหุ้นเปรียบเหมือนการซื้อของร่วมทุนธุรกิจ ยิ่งธุรกิจทำกำไรมาก เงินคุณก็เพิ่มขึ้น

วิธีง่ายๆ สำหรับมือใหม่:
• เริ่มจากกองทุนรวมหุ้น (มีผู้จัดการลงทุนให้)
• ตั้งเป้าลงทุนเดือนละ 1,000-3,000 บาท
• เลือกบริษัทที่คุณเข้าใจและใช้สินค้า/บริการ
• อย่าดูราคาหุ้นทุกวัน ให้มองระยะยาว 5-10 ปี

กฎทอง: "อย่าลงทุนในสิ่งที่ไม่เข้าใจ" และ "อย่าใส่ไข่ในตะกร้าใบเดียว"

ข้อดี: ได้ผลตอบแทนสูงกว่าเงินฝาก, ต้านทานเงินเฟ้อ
ข้อเสีย: อาจขาดทุนระยะสั้น, ต้องใช้เวลาศึกษา`
};

const comparisonCriteria = [
  { id: 'clarity', label: 'ความชัดเจน', description: 'อธิบายเข้าใจง่ายสำหรับมือใหม่' },
  { id: 'completeness', label: 'ความครบถ้วน', description: 'ครอบคลุมข้อมูลที่จำเป็น' },
  { id: 'practicality', label: 'ความเป็นประโยชน์', description: 'สามารถนำไปใช้ได้จริง' },
  { id: 'safety', label: 'ความปลอดภัย', description: 'เตือนความเสี่ยงเหมาะสม' }
];

export default function RLHFTask() {
  const [selectedResponse, setSelectedResponse] = useState<'A' | 'B' | null>(null);
  const [criteriaRatings, setCriteriaRatings] = useState<{[key: string]: 'A' | 'B'}>({});
  const [confidence, setConfidence] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleCriteriaRating = (criteria: string, choice: 'A' | 'B') => {
    setCriteriaRatings(prev => ({ ...prev, [criteria]: choice }));
  };

  const handleSubmit = () => {
    if (selectedResponse && Object.keys(criteriaRatings).length === comparisonCriteria.length && confidence > 0) {
      setSubmitted(true);
      console.log('RLHF evaluation:', { selectedResponse, criteriaRatings, confidence });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งการเปรียบเทียบแล้ว!</h1>
            <p className="text-gray-600 mb-6">ขอบคุณสำหรับการประเมิน RLHF</p>
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
            <h1 className="text-xl font-bold text-gray-900">RLHF Response Comparison</h1>
            <p className="text-sm text-gray-600">เปรียบเทียบคำตอบ AI</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Instructions */}
        <Card className="p-6 border-3 border-green-200 bg-green-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3">คำแนะนำ</h2>
          <p className="text-gray-700 mb-3">
            เปรียบเทียบคำตอบ 2 ข้อต่อไปนี้และเลือกข้อที่ดีกว่า
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• อ่านคำถามและคำตอบทั้ง 2 ข้อ</li>
            <li>• ประเมินตามเกณฑ์ที่กำหนด</li>
            <li>• เลือกคำตอบที่ดีกว่าโดยรวม</li>
          </ul>
        </Card>

        {/* Prompt */}
        <Card className="p-4 border-3 border-blue-300 bg-blue-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">คำถาม</h3>
          <p className="text-gray-800 leading-relaxed">{prompt}</p>
        </Card>

        {/* Response Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">เปรียบเทียบคำตอบ</h3>
          
          {/* Response A */}
          <Card className={`p-4 border-3 transition-colors cursor-pointer ${
            selectedResponse === 'A' ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`} onClick={() => setSelectedResponse('A')}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-gray-900">คำตอบ A</h4>
              {selectedResponse === 'A' && <CheckCircle2 className="w-6 h-6 text-green-600" />}
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{responses.A}</p>
          </Card>

          {/* Response B */}
          <Card className={`p-4 border-3 transition-colors cursor-pointer ${
            selectedResponse === 'B' ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`} onClick={() => setSelectedResponse('B')}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-gray-900">คำตอบ B</h4>
              {selectedResponse === 'B' && <CheckCircle2 className="w-6 h-6 text-green-600" />}
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{responses.B}</p>
          </Card>
        </div>

        {/* Criteria Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">ประเมินตามเกณฑ์</h3>
          {comparisonCriteria.map((criteria) => (
            <Card key={criteria.id} className="p-4 border-2 border-gray-300">
              <div className="mb-3">
                <h4 className="font-bold text-gray-900">{criteria.label}</h4>
                <p className="text-sm text-gray-600">{criteria.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCriteriaRating(criteria.id, 'A')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    criteriaRatings[criteria.id] === 'A'
                      ? 'bg-blue-500 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  คำตอบ A ดีกว่า
                </button>
                <button
                  onClick={() => handleCriteriaRating(criteria.id, 'B')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    criteriaRatings[criteria.id] === 'B'
                      ? 'bg-blue-500 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  คำตอบ B ดีกว่า
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Confidence Rating */}
        <Card className="p-4 border-3 border-purple-300 bg-purple-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">ความมั่นใจในการประเมิน</h3>
          <p className="text-sm text-gray-600 mb-3">คุณมั่นใจในการเลือกเพียงใด?</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setConfidence(level)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold transition-colors ${
                  confidence >= level
                    ? 'bg-purple-500 border-purple-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400 hover:border-purple-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>ไม่มั่นใจ</span>
            <span>มั่นใจมาก</span>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedResponse || Object.keys(criteriaRatings).length !== comparisonCriteria.length || confidence === 0}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            ส่งการเปรียบเทียบ
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          เลือกแล้ว {(selectedResponse ? 1 : 0) + Object.keys(criteriaRatings).length + (confidence > 0 ? 1 : 0)}/{1 + comparisonCriteria.length + 1} ข้อ
        </div>
      </div>
    </div>
  );
}