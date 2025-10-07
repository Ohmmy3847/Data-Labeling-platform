'use client';

import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, Database, Search, Filter, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Mock data evaluation samples
const datasetInfo = {
  name: 'Thai Customer Reviews Dataset',
  description: 'ชุดข้อมูลรีวิวลูกค้าภาษาไทย สำหรับการวิเคราะห์ sentiment',
  totalSamples: 10000,
  sampleSize: 5
};

const dataSamples = [
  {
    id: 1,
    text: 'สินค้าดีมาก บรรจุภัณฑ์สวย ส่งเร็ว ประทับใจมาก จะซื้ออีกแน่นอน',
    label: 'positive',
    metadata: { source: 'e-commerce', category: 'electronics', rating: 5 }
  },
  {
    id: 2,
    text: 'ของไม่ดี แพงเกินไป ไม่คุ้มค่า ผิดหวังมาก',
    label: 'negative',
    metadata: { source: 'e-commerce', category: 'fashion', rating: 1 }
  },
  {
    id: 3,
    text: 'โอเค ใช้ได้ ราคาปานกลาง ก็พอใจ',
    label: 'neutral',
    metadata: { source: 'social-media', category: 'food', rating: 3 }
  },
  {
    id: 4,
    text: 'สินค้าคุณภาพดี แต่ส่งช้าไปหน่อย บริการต้องปรับปรุง',
    label: 'neutral',
    metadata: { source: 'e-commerce', category: 'home', rating: 3 }
  },
  {
    id: 5,
    text: 'ร้านนี้โกงลูกค้า ส่งของปลอม อย่าไปซื้อเด็ดขาด!!!',
    label: 'negative',
    metadata: { source: 'review-site', category: 'electronics', rating: 1 }
  }
];

const evaluationCriteria = [
  {
    id: 'quality',
    name: 'คุณภาพข้อมูล',
    description: 'ข้อความมีความชัดเจน สมบูรณ์ และเข้าใจได้',
    weight: 30
  },
  {
    id: 'accuracy',
    name: 'ความถูกต้องของ Label',
    description: 'Label ตรงกับ sentiment ของข้อความจริงหรือไม่',
    weight: 25
  },
  {
    id: 'relevance',
    name: 'ความเกี่ยวข้อง',
    description: 'ข้อมูลเกี่ยวข้องกับวัตถุประสงค์ของ dataset',
    weight: 20
  },
  {
    id: 'completeness',
    name: 'ความสมบูรณ์',
    description: 'ข้อมูล metadata ครบถ้วนและถูกต้อง',
    weight: 15
  },
  {
    id: 'bias',
    name: 'ความเป็นกลาง',
    description: 'ไม่มีอคติหรือการเลือกปฏิบัติในข้อมูล',
    weight: 10
  }
];

const qualityLevels = [
  { score: 5, label: 'ดีเยี่ยม', color: 'green', description: 'ข้อมูลมีคุณภาพสูงมาก' },
  { score: 4, label: 'ดี', color: 'blue', description: 'ข้อมูลมีคุณภาพดี' },
  { score: 3, label: 'ปานกลาง', color: 'yellow', description: 'ข้อมูลใช้ได้ แต่อาจต้องปรับปรุง' },
  { score: 2, label: 'ต่ำ', color: 'orange', description: 'ข้อมูลมีปัญหา ต้องแก้ไข' },
  { score: 1, label: 'แย่', color: 'red', description: 'ข้อมูลไม่ควรใช้' }
];

export default function DataEvaluationTask() {
  const [evaluations, setEvaluations] = useState<{[key: number]: {[key: string]: number}}>({});
  const [issues, setIssues] = useState<{[key: number]: string[]}>({});
  const [overallRatings, setOverallRatings] = useState<{[key: number]: number}>({});
  const [submitted, setSubmitted] = useState(false);

  const handleEvaluation = (sampleId: number, criteria: string, score: number) => {
    setEvaluations(prev => ({
      ...prev,
      [sampleId]: {
        ...prev[sampleId],
        [criteria]: score
      }
    }));
  };

  const handleIssueToggle = (sampleId: number, issue: string) => {
    setIssues(prev => {
      const currentIssues = prev[sampleId] || [];
      const hasIssue = currentIssues.includes(issue);
      
      return {
        ...prev,
        [sampleId]: hasIssue
          ? currentIssues.filter(i => i !== issue)
          : [...currentIssues, issue]
      };
    });
  };

  const handleOverallRating = (sampleId: number, rating: number) => {
    setOverallRatings(prev => ({ ...prev, [sampleId]: rating }));
  };

  const handleSubmit = () => {
    const completedSamples = dataSamples.filter(sample => 
      evaluations[sample.id] && 
      Object.keys(evaluations[sample.id]).length === evaluationCriteria.length &&
      overallRatings[sample.id]
    );
    
    if (completedSamples.length === dataSamples.length) {
      setSubmitted(true);
      console.log('Data evaluation:', { evaluations, issues, overallRatings });
    }
  };

  const getScoreColor = (score: number) => {
    const level = qualityLevels.find(l => l.score === score);
    return level?.color || 'gray';
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Database className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งการประเมินข้อมูลแล้ว!</h1>
            <p className="text-gray-600 mb-6">ขอบคุณสำหรับการประเมินคุณภาพข้อมูล</p>
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
            <h1 className="text-xl font-bold text-gray-900">Data Evaluation</h1>
            <p className="text-sm text-gray-600">ประเมินคุณภาพข้อมูล</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Instructions */}
        <Card className="p-6 border-3 border-blue-200 bg-blue-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-600" />
            คำแนะนำ
          </h2>
          <p className="text-gray-700 mb-3">
            ประเมินคุณภาพของข้อมูลตัวอย่างตามเกณฑ์ที่กำหนด
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• อ่านข้อมูลและ metadata ในแต่ละตัวอย่าง</li>
            <li>• ประเมินแต่ละเกณฑ์ด้วยคะแนน 1-5</li>
            <li>• ระบุปัญหาที่พบ (ถ้ามี)</li>
            <li>• ให้คะแนนรวมของข้อมูลแต่ละชิ้น</li>
          </ul>
        </Card>

        {/* Dataset Info */}
        <Card className="p-4 border-3 border-green-300 bg-green-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Search className="w-5 h-5 mr-2 text-green-600" />
            ข้อมูล Dataset
          </h3>
          <div className="space-y-2">
            <p><strong>ชื่อ:</strong> {datasetInfo.name}</p>
            <p><strong>คำอธิบาย:</strong> {datasetInfo.description}</p>
            <p><strong>จำนวนข้อมูลทั้งหมด:</strong> {datasetInfo.totalSamples.toLocaleString()} ตัวอย่าง</p>
            <p><strong>ตัวอย่างที่ต้องประเมิน:</strong> {datasetInfo.sampleSize} ตัวอย่าง</p>
          </div>
        </Card>

        {/* Evaluation Criteria Guide */}
        <Card className="p-4 border-3 border-purple-300 bg-purple-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-purple-600" />
            เกณฑ์การประเมิน
          </h3>
          <div className="space-y-2">
            {evaluationCriteria.map((criteria) => (
              <div key={criteria.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{criteria.name}</span>
                  <p className="text-xs text-gray-600">{criteria.description}</p>
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded ml-2">
                  {criteria.weight}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Samples Evaluation */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">ประเมินตัวอย่างข้อมูล</h3>
          {dataSamples.map((sample) => (
            <Card key={sample.id} className="p-4 border-3 border-gray-300">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900">ตัวอย่าง {sample.id}</h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    sample.label === 'positive' ? 'bg-green-100 text-green-700' :
                    sample.label === 'negative' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {sample.label}
                  </span>
                </div>
                
                {/* Sample Text */}
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-gray-800 leading-relaxed">"{sample.text}"</p>
                </div>
                
                {/* Metadata */}
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Metadata:</h5>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div><strong>Source:</strong> {sample.metadata.source}</div>
                    <div><strong>Category:</strong> {sample.metadata.category}</div>
                    <div><strong>Rating:</strong> {sample.metadata.rating}/5</div>
                  </div>
                </div>
              </div>

              {/* Criteria Evaluation */}
              <div className="space-y-4 mb-4">
                <h5 className="font-bold text-gray-900">ประเมินตามเกณฑ์</h5>
                {evaluationCriteria.map((criteria) => (
                  <div key={criteria.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h6 className="font-medium text-gray-900">{criteria.name}</h6>
                      <span className="text-xs text-purple-600">{criteria.weight}%</span>
                    </div>
                    <div className="flex space-x-2">
                      {qualityLevels.map((level) => (
                        <button
                          key={level.score}
                          onClick={() => handleEvaluation(sample.id, criteria.id, level.score)}
                          className={`flex-1 py-2 px-2 rounded-lg border-2 text-center transition-colors ${
                            evaluations[sample.id]?.[criteria.id] === level.score
                              ? `border-${level.color}-500 bg-${level.color}-100 text-${level.color}-900`
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-bold">{level.score}</div>
                          <div className="text-xs">{level.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Issues Checklist */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                  ปัญหาที่พบ (เลือกได้หลายข้อ)
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'ข้อความไม่ชัดเจน',
                    'Label ผิด',
                    'ข้อมูลไม่สมบูรณ์',
                    'มีอคติ',
                    'ไม่เกี่ยวข้อง',
                    'ข้อมูลซ้ำ'
                  ].map((issue) => (
                    <button
                      key={issue}
                      onClick={() => handleIssueToggle(sample.id, issue)}
                      className={`p-2 text-sm rounded-lg border-2 transition-colors ${
                        issues[sample.id]?.includes(issue)
                          ? 'bg-orange-100 border-orange-500 text-orange-900'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overall Rating */}
              <div className="border-t-2 border-gray-200 pt-4">
                <h5 className="font-bold text-gray-900 mb-3">คะแนนรวม</h5>
                <div className="flex space-x-2">
                  {qualityLevels.map((level) => (
                    <button
                      key={level.score}
                      onClick={() => handleOverallRating(sample.id, level.score)}
                      className={`flex-1 py-3 rounded-lg border-2 text-center transition-colors ${
                        overallRatings[sample.id] === level.score
                          ? `border-${level.color}-500 bg-${level.color}-100 text-${level.color}-900`
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-bold">{level.score}</div>
                      <div className="text-xs">{level.label}</div>
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
            disabled={dataSamples.some(sample => 
              !evaluations[sample.id] || 
              Object.keys(evaluations[sample.id]).length !== evaluationCriteria.length ||
              !overallRatings[sample.id]
            )}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            ส่งการประเมินข้อมูล
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          ประเมินแล้ว {dataSamples.filter(sample => 
            evaluations[sample.id] && 
            Object.keys(evaluations[sample.id]).length === evaluationCriteria.length &&
            overallRatings[sample.id]
          ).length}/{dataSamples.length} ตัวอย่าง
        </div>
      </div>
    </div>
  );
}