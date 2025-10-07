'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { gradients, components, typography } from '@/styles/designSystem';
import { TASK_CONFIGS } from '@/config/taskConfig';

interface TaskResult {
  url: string;
  dataType: string;
  documentType: string;
  requirement: string;
  
  wordCount: number;
  payment: number;
  completedAt: string;
}

export default function DataScrapingTask() {
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    dataType: 'Public Policy',
    documentType: 'PDF Scraping Data',
    requirement: ''
  });

  const submitCustomTask = () => {
    if (!formData.url) {
      alert('กรุณากรอก URL');
      return;
    }
    
    // คำนวณค่าจ้างจากจำนวนคำ (สมมติ 5,000 คำ = 1 บาท)
    const estimatedWords = 5000; // ปกติจะคำนวณจากข้อมูลจริง
    const payment = Math.ceil(estimatedWords / 5000);
    
    // เก็บผลงานและแสดงหน้าสรุป
    setTaskResult({
      url: formData.url,
      dataType: formData.dataType,
      documentType: formData.documentType,
      requirement: formData.requirement,
      wordCount: estimatedWords,
      payment: payment,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  const resetForm = () => {
    setShowSummary(false);
    setTaskResult(null);
    setFormData({ url: '', dataType: 'Public Policy', documentType: 'PDF Scraping Data', requirement: '' });
  };

  // หน้าสรุปผลงาน
  if (showSummary && taskResult) {
    return (
      <div className={`min-h-screen ${gradients.backgroundLight}`}>
        {/* Header */}
        <header className={components.header.container}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={resetForm}
                className={components.iconContainer.secondary}
              >
                <ArrowLeft className="w-5 h-5 text-green-600" />
              </button>
              <div>
                <h1 className={typography.h2}>สรุปผลงาน</h1>
                <p className={typography.caption}>งานเสร็จสิ้นแล้ว</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-6">
          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">งานเสร็จสิ้น!</h2>
            <p className="text-green-700">ขอบคุณที่ส่งงานเรียบร้อยแล้ว</p>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 สรุปค่าตอบแทน</h3>
            
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-700">จำนวนคำที่ดึงได้:</span>
                <span className="font-bold text-green-800">{taskResult.wordCount.toLocaleString()} คำ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-700">อัตราการจ่าย:</span>
                <span className="text-green-800">5,000 คำ = 1 บาท</span>
              </div>
              <hr className="my-2 border-green-200" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-green-700">ค่าตอบแทนรวม:</span>
                <span className="text-2xl font-bold text-green-800">฿{taskResult.payment} บาท</span>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 รายละเอียดงาน</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ประเภทข้อมูล:</span>
                <span className="font-medium">{taskResult.dataType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">รูปแบบการดึงข้อมูล:</span>
                <span className="font-medium">{taskResult.documentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">แหล่งข้อมูล:</span>
                <span className="font-medium text-blue-600 truncate max-w-48">{taskResult.url}</span>
              </div>
              <div>
                <span className="text-gray-600">รายละเอียดงาน:</span>
                <p className="mt-1 text-gray-800 bg-gray-50 p-3 rounded">{taskResult.requirement || 'ไม่ได้ระบุ'}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เวลาที่ส่งงาน:</span>
                <span className="font-medium">{taskResult.completedAt}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={resetForm}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              ทำงานใหม่
            </button>
            <button 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors"
              onClick={() => router.push('/mobile/labeler/tasks')}
            >
              ดูประวัติการทำงาน
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${gradients.backgroundLight}`}>
      {/* Header */}
      <header className={components.header.container}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className={components.iconContainer.secondary}
            >
              <ArrowLeft className="w-5 h-5 text-green-600" />
            </button>
            <div>
              <h1 className={typography.h2}>งานรายบุคคล</h1>
              <p className={typography.caption}>ส่งงานดึงข้อมูลของคุณ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 คำแนะนำการใช้งาน</h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p><strong>วิธีการทำงาน:</strong> ดึงข้อมูลเฉพาะจาก URL ที่ระบุ ตามประเภทและรูปแบบที่เลือก</p>
            
            <div className="mt-3">
              <p className="font-medium mb-2">ประเภทข้อมูล:</p>
              <ul className="space-y-1 ml-4">
                <li><strong>• เทคโนโลยี:</strong> ข่าวเทค, รายละเอียดสินค้า, อัปเดตซอฟต์แวร์, บทเรียนเขียนโปรแกรม</li>
                <li><strong>• การท่องเที่ยว:</strong> ข้อมูลสถานที่ท่องเที่ยว, รายละเอียดโรงแรม, ข้อมูลเที่ยวบิน, สถานที่น่าเที่ยว</li>
                <li><strong>• การศึกษา:</strong> ข้อมูลหลักสูตร, เอกสารวิชาการ, ข้อมูลงานวิจัย, สื่อการเรียน</li>
                <li><strong>• นโยบายสาธารณะ:</strong> ประกาศของรัฐ, เอกสารนโยบาย, กฎระเบียบ, ข้อมูลสาธารณะ</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <p className="font-medium mb-2">รูปแบบการดึงข้อมูล:</p>
              <ul className="space-y-1 ml-4">
                <li><strong>• Web Scraping:</strong> ดึงข้อมูลจากหน้าเว็บไซต์โดยตรง</li>
                <li><strong>• Youtube:</strong> ดึงข้อมูลวิดีโอ, ความคิดเห็น, คำอธิบาย</li>
                <li><strong>• PDF:</strong> ดึงข้อความและข้อมูลจากเอกสาร PDF</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Simple Task Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">งานรายบุคคล</h2>
          
          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">ประเภทข้อมูล</label>
            <select 
              value={formData.dataType}
              onChange={(e) => setFormData(prev => ({ ...prev, dataType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="Technologies">เทคโนโลยี</option>
              <option value="Travel">การท่องเที่ยว</option>
              <option value="Education">การศึกษา</option>
              <option value="Public Policy">นโยบายสาธารณะ</option>
            </select>
          </div>

          {/* Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">รูปแบบการดึงข้อมูล</label>
            <select 
              value={formData.documentType}
              onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="WebScraping Data">Web Scraping</option>
              <option value="Youtube Scraping Data">Youtube</option>
              <option value="PDF Scraping Data">พีดีเอฟ</option>
            </select>
          </div>

          {/* Source URL */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">ข้อมูล/ลิงก์แหล่งข้อมูล</label>
            <textarea
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="https://example.com"
            />
          </div>

         

          {/* Submit Button */}
          <button 
            onClick={submitCustomTask}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            ส่งงาน
          </button>
        </div>
      </div>
    </div>
  );
}