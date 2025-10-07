'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BarChart3, PieChart, TrendingUp, Users, 
  Download, Filter, Calendar, Eye, AlertTriangle 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { gradients, typography, components, getBiasRiskColor, getImpactBorderColor } from '@/styles/designSystem';

const demographicData = {
  age: {
    '60-69': { count: 85, percentage: 38, sentiment_positive: 92 },
    '70-79': { count: 72, percentage: 32, sentiment_positive: 89 },
    '80+': { count: 38, percentage: 17, sentiment_positive: 85 },
    '55-59': { count: 22, percentage: 10, sentiment_positive: 88 },
    '50-54': { count: 8, percentage: 3, sentiment_positive: 86 }
  },
  gender: {
    'หญิง': { count: 76, percentage: 54, accuracy: 94 },
    'ชาย': { count: 64, percentage: 46, accuracy: 91 }
  },
  education: {
    'มัธยม': { count: 32, percentage: 23, avg_time: 45 },
    'ปริญญาตรี': { count: 78, percentage: 56, avg_time: 38 },
    'ปริญญาโท+': { count: 30, percentage: 21, avg_time: 35 }
  }
};

const projectStats = [
  {
    id: 1,
    name: 'Sentiment Analysis - Social Media',
    type: 'text-sentiment',
    progress: 85,
    accuracy: 94,
    totalLabelers: 45,
    costSoFar: 1250,
    biasRisk: 'low'
  },
  {
    id: 2,
    name: 'Product Image Tagging',
    type: 'image-tagging',
    progress: 67,
    accuracy: 89,
    totalLabelers: 32,
    costSoFar: 890,
    biasRisk: 'medium'
  },
  {
    id: 3,
    name: 'Chatbot Quality Evaluation',
    type: 'chat-qa',
    progress: 34,
    accuracy: 96,
    totalLabelers: 18,
    costSoFar: 420,
    biasRisk: 'high'
  }
];

const biasInsights = [
  {
    type: 'age',
    title: 'การกระจายผู้สูงอายุ',
    finding: 'ผู้สูงอายุ 60-79 ปี เป็นกลุ่มหลัก (70%) มีความแม่นยำสูง',
    impact: 'low',
    recommendation: 'ควรเพิ่มกลุ่ม 80+ เพื่อความหลากหลาย'
  },
  {
    type: 'gender',
    title: 'อคติด้านเพศ',
    finding: 'ผู้หญิงมีความแม่นยำในการติดป้ายสูงกว่าผู้ชาย 3%',
    impact: 'low',
    recommendation: 'พิจารณาสัดส่วนเพศในการรับงาน'
  },
  {
    type: 'education',
    title: 'อคติด้านการศึกษา',
    finding: 'ผู้ที่จบสูงใช้เวลาน้อยกว่า แต่อาจข้ามรายละเอียด',
    impact: 'medium',
    recommendation: 'ปรับคำแนะนำตามระดับการศึกษา'
  }
];

export default function ClientInsights() {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('7d');

  const downloadReport = () => {
    alert('กำลังสร้างรายงาน PDF... จะส่งทาง Email ใน 5 นาที');
  };

  const getBiasColor = (level: string) => getBiasRiskColor(level);
  const getImpactColor = (impact: string) => getImpactBorderColor(impact);

  return (
    <div className={`min-h-screen ${gradients.backgroundLight}`}>
      {/* Header */}
      <header className={components.header.container}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/client">
              <button className={components.iconContainer.secondary}>
                <ArrowLeft className="w-5 h-5 text-green-600" />
              </button>
            </Link>
            <div>
              <h1 className={typography.h2}>Dashboard Insights</h1>
              <p className={typography.caption}>วิเคราะห์และ Bias Detection</p>
            </div>
          </div>
          
          <button 
            onClick={downloadReport}
            className={`${components.iconContainer.secondary} bg-green-100`}
          >
            <Download className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Filters */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className={typography.h3}>🔍 ตัวกรอง</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">โปรเจค</label>
                <select 
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="all">ทั้งหมด</option>
                  {projectStats.map(project => (
                    <option key={project.id} value={project.id.toString()}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงเวลา</label>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="7d">7 วันล่าสุด</option>
                  <option value="30d">30 วันล่าสุด</option>
                  <option value="90d">3 เดือนล่าสุด</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className={`text-2xl font-bold ${typography.h1.split(' ').pop()}`}>140</div>
                <div className={typography.bodySecondary}>ปู่ย่าทั้งหมด</div>
                <div className="text-xs text-gray-500 mt-1">+12 จากเมื่อวาน</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className={`text-2xl font-bold ${typography.h1.split(' ').pop()}`}>93%</div>
                <div className={typography.bodySecondary}>ความแม่นยำเฉลี่ย</div>
                <div className="text-xs text-gray-500 mt-1">+2% จากเดือนก่อน</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Performance */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className={typography.h3}>📊 ประสิทธิภาพโปรเจค</h3>
              <Link href="/mobile/client/projects" className={typography.linkSecondary}>
                ดูทั้งหมด
              </Link>
            </div>
            
            <div className="space-y-4">
              {projectStats.map((project) => (
                <div key={project.id} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">{project.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBiasColor(project.biasRisk)}`}>
                      {project.biasRisk === 'low' ? 'อคติต่ำ' : 
                       project.biasRisk === 'medium' ? 'อคติปานกลาง' : 'อคติสูง'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-gray-600">ความคืบหน้า</div>
                      <div className={`font-bold ${typography.h1.split(' ').pop()}`}>{project.progress}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ความแม่นยำ</div>
                      <div className="font-bold text-green-600">{project.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ค่าใช้จ่าย</div>
                      <div className="font-bold text-gray-800">฿{project.costSoFar}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demographic Analysis */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <CardContent>
            <h3 className={`${typography.h3} mb-4`}>👥 การวิเคราะห์ประชากร</h3>
            
            {/* Age Distribution */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">การกระจายตามอายุ</h4>
              <div className="space-y-2">
                {Object.entries(demographicData.age).map(([age, data]) => (
                  <div key={age} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-sm text-gray-600 w-12">{age}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 w-8">{data.count}</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">
                      {data.sentiment_positive}% Positive
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">การกระจายตามเพศ</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(demographicData.gender).map(([gender, data]) => (
                  <div key={gender} className="bg-gray-50 p-3 rounded-xl text-center">
                    <div className={`text-2xl font-bold ${typography.h1.split(' ').pop()}`}>{data.count}</div>
                    <div className="text-sm text-gray-600">{gender}</div>
                    <div className="text-xs text-green-600">แม่นยำ {data.accuracy}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Level */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">ระดับการศึกษา</h4>
              <div className="space-y-2">
                {Object.entries(demographicData.education).map(([edu, data]) => (
                  <div key={edu} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-800">{edu}</span>
                      <span className="text-xs text-gray-500">({data.count} คน)</span>
                    </div>
                    <div className={`text-sm font-medium ${typography.bodySecondary}`}>
                      {data.avg_time} วิ/งาน
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bias Detection */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${typography.h3} flex items-center space-x-2`}>
                <AlertTriangle className="w-5 h-5" />
                <span>🚨 การตรวจจับอคติ</span>
              </h3>
            </div>
            
            <div className="space-y-4">
              {biasInsights.map((bias, index) => (
                <Card 
                  key={index} 
                  variant="elevated" 
                  padding="md" 
                  className={`border-2 ${getImpactColor(bias.impact)}`}
                >
                  <CardContent>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{bias.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bias.impact === 'low' ? 'bg-green-100 text-green-700' :
                        bias.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {bias.impact === 'low' ? 'ผลกระทบต่ำ' : 
                         bias.impact === 'medium' ? 'ผลกระทบปานกลาง' : 'ผลกระทบสูง'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{bias.finding}</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">💡 คำแนะนำ:</div>
                      <div className="text-sm text-gray-800">{bias.recommendation}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={downloadReport}
            className={`${components.button.primary} flex items-center justify-center space-x-2`}
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลดรายงาน</span>
          </Button>
          
          <Link href="/mobile/client/projects">
            <Button className={`${components.button.secondary} w-full flex items-center justify-center space-x-2`}>
              <Eye className="w-4 h-4" />
              <span>ดูโปรเจค</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>
    </div>
  );
}