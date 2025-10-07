'use client';

import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, Star, FileText, Target } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Mock rubric evaluation data
const taskDescription = "ให้ AI เขียนบทความอธิบายเรื่อง 'ผลกระทบของโซเชียลมีเดียต่อสุขภาพจิต' ประมาณ 500 คำ";

const aiResponse = `โซเชียลมีเดียในยุคปัจจุบันมีผลกระทบอย่างมากต่อสุขภาพจิตของผู้คน ทั้งในแง่บวกและลบ

ผลกระทบเชิงบวก:
- เชื่อมต่อผู้คนทั่วโลก ช่วยลดความเหงา
- เป็นแหล่งข้อมูลและการเรียนรู้
- สร้างชุมชนออนไลน์ที่มีความสนใจเดียวกัน
- เป็นเครื่องมือในการแสดงออกและความคิดสร้างสรรค์

ผลกระทบเชิงลบ:
- การเปรียบเทียบตัวเองกับผู้อื่น ทำให้เกิดความรู้สึกด้อยค่า
- การติดโซเชียลมีเดีย ส่งผลต่อการนอนหลับและกิจกรรมในชีวิตจริง
- การถูกกลั่นแกล้งออนไลน์ (Cyberbullying)
- ข้อมูลข่าวสารที่มากเกินไป ทำให้เกิดความวิตกกังวล (Information Overload)

การป้องกันและแก้ไข:
- ใช้โซเชียลมีเดียอย่างมีสติ จำกัดเวลาการใช้
- เลือกติดตามเนื้อหาที่เป็นประโยชน์
- หาสมดุลระหว่างโลกออนไลน์และออฟไลน์
- ขอความช่วยเหลือจากผู้เชี่ยวชาญเมื่อมีปัญหา

โซเชียลมีเดียเป็นเครื่องมือที่มีประโยชน์ แต่ต้องใช้อย่างรู้เท่าทัน เพื่อให้ได้ประโยชน์สูงสุดและลดผลเสียต่อสุขภาพจิต`;

const rubricCriteria = [
  {
    id: 'content',
    name: 'เนื้อหาและความถูกต้อง',
    description: 'ความครบถ้วน ถูกต้อง และเกี่ยวข้องของเนื้อหา',
    weight: 30,
    levels: [
      { score: 5, description: 'เนื้อหาครบถ้วน ถูกต้อง มีข้อมูลสนับสนุนชัดเจน' },
      { score: 4, description: 'เนื้อหาดี มีความถูกต้องส่วนใหญ่' },
      { score: 3, description: 'เนื้อหาพอใช้ มีข้อผิดพลาดเล็กน้อย' },
      { score: 2, description: 'เนื้อหาไม่สมบูรณ์ มีข้อผิดพลาดหลายจุด' },
      { score: 1, description: 'เนื้อหาไม่ถูกต้องหรือไม่เกี่ยวข้อง' }
    ]
  },
  {
    id: 'structure',
    name: 'โครงสร้างและการจัดระเบียบ',
    description: 'ความเป็นระเบียบ ลำดับความคิด และการแบ่งหัวข้อ',
    weight: 25,
    levels: [
      { score: 5, description: 'โครงสร้างชัดเจน มีการแบ่งหัวข้อดี' },
      { score: 4, description: 'โครงสร้างดี มีลำดับความคิด' },
      { score: 3, description: 'โครงสร้างพอใช้ เข้าใจได้' },
      { score: 2, description: 'โครงสร้างไม่ชัดเจน สับสน' },
      { score: 1, description: 'ไม่มีโครงสร้างที่ชัดเจน' }
    ]
  },
  {
    id: 'language',
    name: 'การใช้ภาษาและไวยากรณ์',
    description: 'ความถูกต้องของภาษา การสะกดคำ และไวยากรณ์',
    weight: 20,
    levels: [
      { score: 5, description: 'ภาษาถูกต้อง เหมาะสม ไม่มีข้อผิดพลาด' },
      { score: 4, description: 'ภาษาดี มีข้อผิดพลาดเล็กน้อย' },
      { score: 3, description: 'ภาษาพอใช้ มีข้อผิดพลาดบ้าง' },
      { score: 2, description: 'ภาษาไม่เหมาะสม ข้อผิดพลาดหลายจุด' },
      { score: 1, description: 'ภาษาผิดมาก เข้าใจยาก' }
    ]
  },
  {
    id: 'length',
    name: 'ความยาวและความเหมาะสม',
    description: 'ความยาวตามที่กำหนด (500 คำ) และความเหมาะสม',
    weight: 15,
    levels: [
      { score: 5, description: 'ความยาวเหมาะสม (480-520 คำ)' },
      { score: 4, description: 'ความยาวใกล้เคียง (450-550 คำ)' },
      { score: 3, description: 'ความยาวพอใช้ (400-600 คำ)' },
      { score: 2, description: 'สั้นหรือยาวเกินไป (300-400 หรือ 600-700 คำ)' },
      { score: 1, description: 'ความยาวไม่เหมาะสม (<300 หรือ >700 คำ)' }
    ]
  },
  {
    id: 'engagement',
    name: 'ความน่าสนใจ',
    description: 'ความสามารถในการดึงดูดความสนใจและการอ่าน',
    weight: 10,
    levels: [
      { score: 5, description: 'น่าสนใจมาก มีส่วนที่ดึงดูดผู้อ่าน' },
      { score: 4, description: 'น่าสนใจดี อ่านเข้าใจง่าย' },
      { score: 3, description: 'น่าสนใจปานกลาง' },
      { score: 2, description: 'ไม่ค่อยน่าสนใจ' },
      { score: 1, description: 'น่าเบื่อ ไม่ดึงดูดความสนใจ' }
    ]
  }
];

export default function RubricEvaluationTask() {
  const [scores, setScores] = useState<{[key: string]: number}>({});
  const [submitted, setSubmitted] = useState(false);

  const handleScore = (criteriaId: string, score: number) => {
    setScores(prev => ({ ...prev, [criteriaId]: score }));
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    rubricCriteria.forEach(criteria => {
      const score = scores[criteria.id];
      if (score) {
        totalScore += (score * criteria.weight) / 5; // Convert to percentage
        totalWeight += criteria.weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore) : 0;
  };

  const handleSubmit = () => {
    if (Object.keys(scores).length === rubricCriteria.length) {
      setSubmitted(true);
      console.log('Rubric evaluation:', { scores, totalScore: calculateTotalScore() });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Target className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งการประเมิน Rubric แล้ว!</h1>
            <p className="text-gray-600 mb-2">คะแนนรวม: {calculateTotalScore()}/100</p>
            <p className="text-gray-600 mb-6">ขอบคุณสำหรับการประเมินตาม Rubric</p>
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
            <h1 className="text-xl font-bold text-gray-900">Rubric Evaluation</h1>
            <p className="text-sm text-gray-600">ประเมินตามเกณฑ์มาตรฐาน</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Instructions */}
        <Card className="p-6 border-3 border-green-200 bg-green-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            คำแนะนำ
          </h2>
          <p className="text-gray-700 mb-3">
            ประเมินคำตอบของ AI ตามเกณฑ์ Rubric ที่กำหนด
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• อ่านโจทย์และคำตอบของ AI</li>
            <li>• ให้คะแนนแต่ละเกณฑ์ 1-5 คะแนน</li>
            <li>• พิจารณาน้ำหนักของแต่ละเกณฑ์</li>
            <li>• คะแนนรวมจะคำนวณอัตโนมัติ</li>
          </ul>
        </Card>

        {/* Task Description */}
        <Card className="p-4 border-3 border-blue-300 bg-blue-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">โจทย์</h3>
          <p className="text-gray-800 leading-relaxed">{taskDescription}</p>
        </Card>

        {/* AI Response */}
        <Card className="p-4 border-3 border-purple-300 bg-purple-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">คำตอบของ AI</h3>
          <div className="bg-white p-4 rounded-lg max-h-80 overflow-y-auto">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{aiResponse}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">จำนวนคำ: ~{aiResponse.split(' ').length} คำ</p>
        </Card>

        {/* Rubric Evaluation */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">ประเมินตามเกณฑ์ Rubric</h3>
          {rubricCriteria.map((criteria) => (
            <Card key={criteria.id} className="p-4 border-2 border-gray-300">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{criteria.name}</h4>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    น้ำหนัก {criteria.weight}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{criteria.description}</p>
              </div>

              {/* Score Selection */}
              <div className="space-y-2">
                {criteria.levels.map((level) => (
                  <button
                    key={level.score}
                    onClick={() => handleScore(criteria.id, level.score)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      scores[criteria.id] === level.score
                        ? 'bg-blue-100 border-blue-500 text-blue-900'
                        : 'bg-white border-gray-300 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= level.score
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{level.score} คะแนน</span>
                      </div>
                      {scores[criteria.id] === level.score && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm mt-1 ml-8">{level.description}</p>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Score Summary */}
        <Card className="p-4 border-3 border-yellow-300 bg-yellow-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">สรุปคะแนน</h3>
          <div className="space-y-2">
            {rubricCriteria.map((criteria) => (
              <div key={criteria.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{criteria.name} ({criteria.weight}%)</span>
                <span className="font-medium">
                  {scores[criteria.id] ? `${scores[criteria.id]}/5` : '-'}
                </span>
              </div>
            ))}
            <div className="border-t-2 border-yellow-300 pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">คะแนนรวม</span>
                <span className="font-bold text-xl text-blue-600">{calculateTotalScore()}/100</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={Object.keys(scores).length !== rubricCriteria.length}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            ส่งการประเมิน Rubric
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          ประเมินแล้ว {Object.keys(scores).length}/{rubricCriteria.length} เกณฑ์
        </div>
      </div>
    </div>
  );
}