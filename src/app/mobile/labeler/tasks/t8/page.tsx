'use client';

import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, User, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TASK_CONFIGS } from '@/config/taskConfig';

// Mock persona data
const persona = {
  name: 'ครูสมหมาย',
  description: 'ครูประถมอายุ 45 ปี ใจดี อดทน รักเด็ก',
  characteristics: [
    'พูดเสียงใส ใช้คำพูดง่ายๆ',
    'อดทนกับคำถามของเด็ก',
    'ให้กำลังใจและชื่นชมเสมอ',
    'ใช้ตัวอย่างจากชีวิตประจำวัน',
    'เน้นการสอนค่านิยมที่ดี'
  ]
};

const testScenarios = [
  {
    id: 1,
    scenario: 'เด็กถามว่า "ครับครู ทำไมต้องเรียนคณิตศาสตร์ด้วยครับ เบื่อมาก"',
    aiResponse: 'ครูเข้าใจนะลูก ๆ หลายคนก็รู้สึกแบบนี้ แต่คณิตศาสตร์สำคัญมากเลยนะ เหมือนกับที่เราต้องนับเงินตอนซื้อขนม หรือแบ่งลูกอมให้เพื่อน ๆ ถ้าเราเข้าใจคณิตศาสตร์ดี เราจะสามารถแก้ปัญหาต่าง ๆ ในชีวิตได้อย่างฉลาดค่ะ ครูจะหาวิธีสอนที่สนุก ๆ ให้นะลูก',
    aspects: ['ความเข้าใจ', 'การใช้ภาษา', 'การให้กำลังใจ', 'การใช้ตัวอย่าง']
  },
  {
    id: 2,
    scenario: 'เด็กทำการบ้านผิดหมด มาบอกครูว่า "ครูครับ หนูทำผิดหมดเลย หนูโง่มาก"',
    aiResponse: 'ไม่ใช่ค่ะลูก หนูไม่โง่เลย หนูแค่ยังไม่เข้าใจเท่านั้นเอง การทำผิดเป็นเรื่องปกติ แม้แต่ครูยังทำผิดบ่อย ๆ เลยนะ สิ่งสำคัญคือเราต้องเรียนรู้จากความผิดพลาด มาครูจะอธิบายใหม่ให้ฟังอีกครั้งนะ คราวนี้จะใช้วิธีง่าย ๆ ที่หนูเข้าใจแน่นอน',
    aspects: ['การให้กำลังใจ', 'ความเข้าใจ', 'การแก้ไขปัญหา', 'ความอดทน']
  },
  {
    id: 3,
    scenario: 'เด็กขอให้ครูอธิบายเรื่องวิทยาศาสตร์ที่ยาก',
    aiResponse: 'เรื่องนี้น่าสนใจมาก ๆ เลยนะลูก ครูจะอธิบายให้ฟังแบบง่าย ๆ เหมือนกับตอนที่เราดูการ์ตูนกัน จำได้มั้ยตอนที่ตัวการ์ตูนต้มน้ำ? น้ำร้อนจะกลายเป็นไอน้ำลอยขึ้นไป นั่นคือสิ่งที่เรียกว่า "การระเหย" ค่ะ ในธรรมชาติก็เกิดแบบนี้เหมือนกัน',
    aspects: ['การใช้ตัวอย่าง', 'การใช้ภาษา', 'ความเข้าใจ', 'การสอน']
  }
];

const fidelityAspects = [
  { id: 'voice', name: 'น้ำเสียงและการพูด', description: 'ใช้น้ำเสียงและคำพูดตรงตาม persona หรือไม่' },
  { id: 'patience', name: 'ความอดทน', description: 'แสดงความอดทนและเข้าใจเด็กเหมือนครูที่ดี' },
  { id: 'encouragement', name: 'การให้กำลังใจ', description: 'ให้กำลังใจและสร้างความมั่นใจให้เด็ก' },
  { id: 'teaching', name: 'วิธีการสอน', description: 'ใช้วิธีสอนที่เหมาะสมกับเด็กประถม' },
  { id: 'examples', name: 'การใช้ตัวอย่าง', description: 'ยกตัวอย่างจากชีวิตประจำวันที่เด็กเข้าใจ' }
];

export default function PersonaFidelityTask() {
  const [ratings, setRatings] = useState<{[key: string]: {[key: string]: number}}>({});
  const [overallScores, setOverallScores] = useState<{[key: string]: number}>({});
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (scenarioId: number, aspect: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        [aspect]: rating
      }
    }));
  };

  const handleOverallScore = (scenarioId: number, score: number) => {
    setOverallScores(prev => ({ ...prev, [scenarioId]: score }));
  };

  const handleSubmit = () => {
    const completedScenarios = testScenarios.filter(scenario => 
      ratings[scenario.id] && 
      Object.keys(ratings[scenario.id]).length === fidelityAspects.length &&
      overallScores[scenario.id]
    );
    
    if (completedScenarios.length === testScenarios.length) {
      setSubmitted(true);
      console.log('Persona fidelity evaluation:', { ratings, overallScores });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งการทดสอบ Persona แล้ว!</h1>
            <p className="text-gray-600 mb-6">ขอบคุณสำหรับการประเมินความสอดคล้องของ Persona</p>
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
            <h1 className="text-xl font-bold text-gray-900">Persona Fidelity Testing</h1>
            <p className="text-sm text-gray-600">ทดสอบความสอดคล้องของ Persona</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Instructions */}
        <Card className="p-6 border-3 border-purple-200 bg-purple-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-600" />
            คำแนะนำ
          </h2>
          <p className="text-gray-700 mb-3">
            ประเมินว่า AI ตอบสนองตาม Persona ที่กำหนดได้ดีเพียงใด
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• อ่านคุณลักษณะของ Persona</li>
            <li>• ประเมินการตอบสนองในแต่ละสถานการณ์</li>
            <li>• ให้คะแนนแต่ละด้าน 1-5 คะแนน</li>
            <li>• ให้คะแนนรวมของแต่ละสถานการณ์</li>
          </ul>
        </Card>

        {/* Persona Description */}
        <Card className="p-4 border-3 border-blue-300 bg-blue-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Persona: {persona.name}
          </h3>
          <p className="text-gray-800 mb-3">{persona.description}</p>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">คุณลักษณะสำคัญ:</h4>
            <ul className="space-y-1">
              {persona.characteristics.map((char, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {char}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Test Scenarios */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">สถานการณ์ทดสอบ</h3>
          {testScenarios.map((scenario) => (
            <Card key={scenario.id} className="p-4 border-3 border-gray-300">
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2">สถานการณ์ {scenario.id}</h4>
                <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                  <p className="text-gray-800"><strong>สถานการณ์:</strong> {scenario.scenario}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-gray-800"><strong>คำตอบ AI:</strong> {scenario.aiResponse}</p>
                </div>
              </div>

              {/* Aspect Ratings */}
              <div className="space-y-4 mb-4">
                <h5 className="font-bold text-gray-900">ประเมินแต่ละด้าน</h5>
                {fidelityAspects.map((aspect) => (
                  <div key={aspect.id} className="space-y-2">
                    <div>
                      <h6 className="font-medium text-gray-900">{aspect.name}</h6>
                      <p className="text-xs text-gray-600">{aspect.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRating(scenario.id, aspect.id, rating)}
                          className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold transition-colors ${
                            ratings[scenario.id]?.[aspect.id] === rating
                              ? 'bg-blue-500 border-blue-600 text-white'
                              : 'bg-white border-gray-300 text-gray-400 hover:border-blue-300'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Score */}
              <div className="border-t-2 border-gray-200 pt-4">
                <h5 className="font-bold text-gray-900 mb-3">คะแนนรวมสถานการณ์นี้</h5>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleOverallScore(scenario.id, score)}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        overallScores[scenario.id] === score
                          ? 'bg-yellow-500 border-yellow-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400 hover:border-yellow-300'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${overallScores[scenario.id] === score ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={testScenarios.some(scenario => 
              !ratings[scenario.id] || 
              Object.keys(ratings[scenario.id]).length !== fidelityAspects.length ||
              !overallScores[scenario.id]
            )}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            ส่งการทดสอบ Persona
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          ประเมินแล้ว {testScenarios.filter(scenario => 
            ratings[scenario.id] && 
            Object.keys(ratings[scenario.id]).length === fidelityAspects.length &&
            overallScores[scenario.id]
          ).length}/{testScenarios.length} สถานการณ์
        </div>
      </div>
    </div>
  );
}