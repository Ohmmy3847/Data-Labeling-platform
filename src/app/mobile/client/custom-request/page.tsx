'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Send, FileText, Paperclip, Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { gradients, typography, components } from '@/styles/designSystem';

const dataTypes = [
  'Text / ข้อความ',
  'Image / รูปภาพ', 
  'Audio / เสียง',
  'Video / วิดีโอ',
  'Multimodal / หลายรูปแบบ',
  'Other / อื่นๆ'
];

const qualityLevels = [
  { value: 'basic', label: 'Basic - ปู่ย่าทั่วไป', description: 'งานพื้นฐาน ไม่ซับซ้อน' },
  { value: 'expert', label: 'Expert - ผู้เชี่ยวชาญ', description: 'งานที่ต้องการความรู้เฉพาะ' }
];

export default function CustomRequest() {
  const [formData, setFormData] = useState({
    projectName: '',
    objective: '',
    dataType: '',
    qualityLevel: 'basic',
    exampleFormat: '',
    outputFormat: '',
    additionalNotes: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.projectName || !formData.objective || !formData.dataType) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    alert(`ส่งคำขอสำเร็จ! 🎉\\n\\nทีม LabelLink จะติดต่อกลับภายใน 24 ชั่วโมง\\nผ่านทาง Email หรือ LINE: @labellink\\n\\nรหัสคำขอ: REQ-${Date.now().toString().slice(-6)}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

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
              <h1 className={typography.h2}>คำขอปรับแต่ง</h1>
              <p className={typography.caption}>งานพิเศษตามความต้องการ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Info Banner */}
        <Card variant="elevated" padding="lg" className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200">
          <CardContent>
            <div className="flex items-start space-x-3">
              <Star className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`${typography.h3} text-green-800 mb-2`}>🎯 ต้องการงานพิเศษ?</h3>
                <p className={`${typography.body} text-sm mb-2`}>
                  ส่งรายละเอียดมาให้เรา ทีมจะออกแบบโปรเจคตามความต้องการของคุณ
                </p>
                <div className="flex items-center space-x-4 text-xs text-green-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>ตอบกลับใน 24 ชม.</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="w-3 h-3" />
                    <span>ปรึกษาฟรี</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <div className="space-y-6">
          {/* Project Name */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                📝 ชื่อโปรเจค *
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                placeholder="เช่น ประเมินคุณภาพการแปลภาษาไทย-อังกฤษ"
              />
            </CardContent>
          </Card>

          {/* Objective */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                🎯 วัตถุประสงค์ / Use Case *
              </label>
              <textarea
                rows={4}
                value={formData.objective}
                onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                placeholder="อธิบายว่าต้องการใช้ข้อมูลที่ป้ายแล้วเพื่ออะไร เช่น ฝึก AI model สำหรับ..."
              />
            </CardContent>
          </Card>

          {/* Data Type */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                📊 ประเภทข้อมูล *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dataTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData(prev => ({ ...prev, dataType: type }))}
                    className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                      formData.dataType === type
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Level */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                ⭐ ระดับคุณภาพที่ต้องการ
              </label>
              <div className="space-y-3">
                {qualityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData(prev => ({ ...prev, qualityLevel: level.value }))}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      formData.qualityLevel === level.value
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <div className="font-bold mb-1">{level.label}</div>
                    <div className="text-sm opacity-90">{level.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Example Format */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                📋 ตัวอย่างรูปแบบข้อมูลที่มี
              </label>
              <textarea
                rows={3}
                value={formData.exampleFormat}
                onChange={(e) => setFormData(prev => ({ ...prev, exampleFormat: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                placeholder='เช่น {"text": "ข้อความ", "image_url": "https://..."}'
              />
            </CardContent>
          </Card>

          {/* Output Format */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                📤 รูปแบบผลลัพธ์ที่ต้องการ
              </label>
              <textarea
                rows={3}
                value={formData.outputFormat}
                onChange={(e) => setFormData(prev => ({ ...prev, outputFormat: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                placeholder='เช่น {"label": "positive", "confidence": 0.95, "labeler_age": "30-40"}'
              />
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className={`block text-sm font-bold ${typography.h3} mb-3`}>
                📎 แนบไฟล์เพิ่มเติม (ไม่บังคับ)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center mb-4">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">ลากไฟล์มาวาง หรือคลิกเพื่อเลือก</p>
                <p className="text-xs text-gray-500 mb-3">รองรับ: PDF, DOC, XLS, รูปภาพ, ฯลฯ</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className={`${components.button.secondary} cursor-pointer`}>
                    เลือกไฟล์
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">ไฟล์ที่แนบ:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <label className="block text-sm font-bold text-purple-800 mb-3">
                💭 หมายเหตุเพิ่มเติม
              </label>
              <textarea
                rows={3}
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                placeholder="ข้อมูลเพิ่มเติม ข้อกังวล หรือข้อเสนอแนะ..."
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-4">
            <Button 
              onClick={handleSubmit}
              className={`${components.button.cta} w-full flex items-center justify-center space-x-2`}
            >
              <Send className="w-5 h-5" />
              <span>ส่งคำขอ</span>
            </Button>
          </div>

          {/* Contact Info */}
          <Card variant="elevated" padding="lg" className="bg-gray-50">
            <CardContent>
              <h4 className={`${typography.h4} mb-2`}>📞 ติดต่อโดยตรง</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📧 Email: custom@labellink.co.th</p>
                <p>📱 LINE: @labellink</p>
                <p>⏰ ตอบกลับภายใน 24 ชั่วโมง</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}