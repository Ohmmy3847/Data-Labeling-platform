'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Image, MessageSquare, Volume2, Upload, DollarSign, Users, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { gradients, typography, components } from '@/styles/designSystem';

interface Template {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  minReward: number;
  maxReward: number;
  estimatedTime: string;
  sampleSize: string;
  instructions: string[];
  preparation: string[];
}

const templates: Template[] = [
  {
    id: 'text-sentiment',
    name: 'วิเคราะห์ความรู้สึก',
    icon: Brain,
    description: 'ประเมินความรู้สึกบวก ลบ เป็นกลาง ในข้อความ',
    minReward: 0.08,
    maxReward: 0.15,
    estimatedTime: '30 วิ/ข้อ',
    sampleSize: '100-1,000 ข้อ',
    instructions: [
      'อัปโหลดไฟล์ CSV หรือ JSON ที่มีคอลัมน์ "text"',
      'กำหนดคำแนะนำการประเมิน (เช่น โฟกัสที่อารมณ์โดยรวม)',
      'เลือกตัวเลือก: บวก/ลบ/เป็นกลาง หรือปรับแต่งเพิ่ม',
      'ตั้งค่าราคาต่องาน 0.08-0.15 บาท'
    ],
    preparation: [
      '📄 ไฟล์ข้อมูล (.csv/.json)',
      '📝 คำแนะนำการประเมิน',
      '💰 งบประมาณขั้นต่ำ 80 บาท',
      '⏱️ เวลาดำเนินการ 1-3 วัน'
    ]
  },
  {
    id: 'image-tagging',
    name: 'ติดป้ายรูปภาพ',
    icon: Image,
    description: 'ระบุวัตถุ หมวดหมู่ หรือเนื้อหาในรูปภาพ',
    minReward: 0.10,
    maxReward: 0.25,
    estimatedTime: '45 วิ/รูป',
    sampleSize: '50-500 รูป',
    instructions: [
      'อัปโหลดไฟล์รูปภาพ หรือลิงก์รูป URL',
      'กำหนดรายการป้ายที่ต้องการ (เช่น รถ, คน, สัตว์)',
      'เลือกจำนวนป้ายต่อรูป (1-10 ป้าย)',
      'ตั้งราคาตามความซับซ้อน 0.10-0.25 บาท'
    ],
    preparation: [
      '🖼️ ไฟล์รูปภาพ (.jpg/.png) หรือ URL',
      '🏷️ รายการป้ายที่ต้องการ',
      '💰 งบประมาณขั้นต่ำ 50 บาท',
      '⏱️ เวลาดำเนินการ 1-2 วัน'
    ]
  },
  {
    id: 'chat-qa',
    name: 'ประเมินการสนทนา AI',
    icon: MessageSquare,
    description: 'ตรวจสอบคุณภาพคำตอบของ Chatbot',
    minReward: 0.20,
    maxReward: 0.50,
    estimatedTime: '2 นาที/สนทนา',
    sampleSize: '20-200 สนทนา',
    instructions: [
      'อัปโหลดบทสนทนา (JSON format)',
      'กำหนดเกณฑ์การประเมิน (ความถูกต้อง, ความเป็นธรรมชาติ)',
      'เลือกคะแนน 1-5 หรือ Yes/No',
      'ตั้งราคาตามความยากง่าย 0.20-0.50 บาท'
    ],
    preparation: [
      '💬 ไฟล์บทสนทนา (.json)',
      '📋 เกณฑ์การประเมิน',
      '💰 งบประมาณขั้นต่ำ 100 บาท',
      '⏱️ เวลาดำเนินการ 2-4 วัน'
    ]
  },
  {
    id: 'audio-classification',
    name: 'จัดหมวดเสียง',
    icon: Volume2,
    description: 'แยกประเภทเสียง เช่น เพลง เสียงพูด เสียงธรรมชาติ',
    minReward: 0.15,
    maxReward: 0.30,
    estimatedTime: '1 นาที/ไฟล์',
    sampleSize: '30-300 ไฟล์',
    instructions: [
      'อัปโหลดไฟล์เสียง (.mp3/.wav) หรือลิงก์',
      'กำหนดหมวดหมู่ที่ต้องการ',
      'ระบุความยาวไฟล์เสียงสูงสุด (แนะนำ 30 วิ)',
      'ตั้งราคาตามความซับซ้อน 0.15-0.30 บาท'
    ],
    preparation: [
      '🎵 ไฟล์เสียง (.mp3/.wav) หรือ URL',
      '📂 รายการหมวดหมู่',
      '💰 งบประมาณขั้นต่ำ 90 บาท',
      '⏱️ เวลาดำเนินการ 2-5 วัน'
    ]
  }
];

export default function CreateProject() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showInstructions, setShowInstructions] = useState<string | null>(null);

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
              <h1 className={typography.h2}>สร้างโปรเจคใหม่</h1>
              <p className={typography.caption}>เลือก Template ที่เหมาะสม</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {!selectedTemplate ? (
          <>
            {/* Template Selection */}
            <div className="mb-6">
              <h2 className={typography.h1}>🎯 เลือก Template</h2>
              <p className={`${typography.body} mt-2 mb-4`}>
                เลือกแบบงานที่เหมาะกับความต้องการของคุณ
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {templates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card 
                    key={template.id} 
                    variant="elevated" 
                    padding="lg" 
                    className={`${components.card.interactive} cursor-pointer border-2 border-gray-200 hover:border-green-400`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 ${gradients.primaryButton} rounded-3xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`${typography.h3} mb-1`}>{template.name}</h3>
                          <p className={`${typography.body} text-sm mb-3`}>{template.description}</p>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">
                                {template.minReward}-{template.maxReward} บาท
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">{template.sampleSize}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowInstructions(
                              showInstructions === template.id ? null : template.id
                            );
                          }}
                          className={components.iconContainer.accent}
                        >
                          <Eye className="w-4 h-4 text-green-600" />
                        </button>
                      </div>

                      {/* Instructions Expansion */}
                      {showInstructions === template.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className={`${typography.h4} mb-2`}>📋 ขั้นตอนการสร้าง:</h4>
                              <ul className="space-y-1">
                                {template.instructions.map((instruction, index) => (
                                  <li key={index} className={`text-sm ${typography.body}`}>
                                    {index + 1}. {instruction}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className={`${typography.h4} mb-2`}>📦 สิ่งที่ต้องเตรียม:</h4>
                              <ul className="space-y-1">
                                {template.preparation.map((item, index) => (
                                  <li key={index} className={`text-sm ${typography.body}`}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Custom Option */}
            <Card variant="elevated" padding="lg" className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
              <CardContent>
                <div className="text-center">
                  <h3 className={`${typography.h3} text-purple-800 mb-2`}>
                    🎨 ต้องการแบบพิเศษ?
                  </h3>
                  <p className="text-purple-700 mb-4">
                    หากงานของคุณต้องการความปรับแต่งพิเศษ
                  </p>
                  <Link href="/mobile/client/custom-request">
                    <Button className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-8 py-3 rounded-2xl font-bold">
                      ส่งคำขอปรับแต่ง
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Template Configuration */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className={components.iconContainer.secondary}
                >
                  <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>
                <div>
                  <h2 className={typography.h1}>{selectedTemplate.name}</h2>
                  <p className={typography.caption}>กำหนดค่าและอัปโหลดข้อมูล</p>
                </div>
              </div>
            </div>

            {/* Configuration Form */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <h3 className={`${typography.h3} mb-4`}>📝 ข้อมูลโปรเจค</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อโปรเจค
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                        placeholder="เช่น วิเคราะห์ความรู้สึกโซเชียลมีเดีย"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        คำอธิบายงาน
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                        placeholder="อธิบายรายละเอียดงานที่ต้องการ..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Upload */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <h3 className="font-bold text-green-800 mb-4">📂 อัปโหลดข้อมูล</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">ลากไฟล์มาวาง หรือคลิกเพื่อเลือก</p>
                    <p className="text-sm text-gray-500">รองรับ: .csv, .json, .jpg, .png</p>
                    <Button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl">
                      เลือกไฟล์
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Settings */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <h3 className={`${typography.h3} mb-4`}>💰 ตั้งค่าราคา</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ราคาต่องาน (บาท)
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min={selectedTemplate.minReward}
                          max={selectedTemplate.maxReward}
                          step="0.01"
                          defaultValue={selectedTemplate.minReward}
                          className="flex-1"
                        />
                        <div className={`w-16 text-center bg-gray-100 py-2 rounded-lg font-bold ${typography.h1.split(' ').pop()}`}>
                          {selectedTemplate.minReward}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{selectedTemplate.minReward} บาท</span>
                        <span>{selectedTemplate.maxReward} บาท</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demographics Toggle */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={typography.h3}>📊 เก็บข้อมูลประชากร</h3>
                      <p className={typography.caption}>
                        เก็บข้อมูลอายุ เพศ การศึกษา เพื่อ Bias Analysis
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Launch Button */}
              <div className="sticky bottom-4">
                <Link href="/mobile/client/projects">
                  <Button className={components.button.cta}>
                    🚀 เปิดโปรเจค
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom padding for fixed button */}
      <div className="h-20"></div>
    </div>
  );
}