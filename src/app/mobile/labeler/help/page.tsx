'use client';

import Link from 'next/link';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, FileText, Video, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LABELER_REWARDS, WITHDRAWAL_CONFIG } from '@/config/rewardsConfig';

export default function HelpPage() {
  const faqs = [
    {
      category: 'การเริ่มต้น',
      questions: [
        { q: 'วิธีสมัครเป็นปู่ย่าทำงาน?', a: 'คลิกปุ่ม "สำหรับปู่ย่า" จากหน้าแรก กรอกข้อมูลพื้นฐาน ยืนยันตัวตน แล้วเริ่มทำงานได้เลย' },
        { q: 'ต้องมีคุณสมบัติอะไรบ้าง?', a: 'อายุ 50 ปีขึ้นไป หรือเป็นคนพิการ มีบัตรประชาชน และสามารถใช้สมาร์ทโฟนได้' },
        { q: 'ใช้งานยากไหม?', a: 'ไม่เลย! เราออกแบบให้ง่ายที่สุด ตัวอักษรใหญ่ ปุ่มชัดเจน มีคู่มือแนะนำทุกขั้นตอน' },
      ]
    },
    {
      category: 'การทำงาน',
      questions: [
        { q: 'มีงานอะไรบ้าง?', a: 'มีหลากหลาย เช่น แปลข้อความ อ่านออกเสียง แท็กรูปภาพ บันทึกเสียง ฯลฯ' },
        { q: 'ทำงานได้กี่ชั่วโมง?', a: 'ไม่จำกัด! ทำเท่าไหร่ได้เท่านั้น ทำตอนไหนก็ได้ ยืดหยุ่นเต็มที่' },
        { q: 'ถ้าทำผิดจะเป็นอย่างไร?', a: 'ไม่เป็นไร! เราเข้าใจว่าต้องใช้เวลาเรียนรู้ มีระบบให้แก้ไข และมีทีมงานช่วยเหลือ' },
      ]
    },
    {
      category: 'รายได้',
      questions: [
        { q: 'ได้เงินเท่าไหร่?', a: `ขึ้นกับประเภทงานและจำนวนงาน เฉลี่ย ${LABELER_REWARDS.earnings.avgPerDayMin}-${LABELER_REWARDS.earnings.avgPerDayMax} บาท/วัน ถ้าทำเต็มที่อาจได้ ${LABELER_REWARDS.earnings.avgPerMonthMin.toLocaleString()}-${LABELER_REWARDS.earnings.avgPerMonthMax.toLocaleString()} บาท/เดือน` },
        { q: 'เมื่อไหร่จะได้รับเงิน?', a: `ถอนได้ทุกเมื่อ เมื่อยอดขั้นต่ำ ${WITHDRAWAL_CONFIG.minimum} บาท โอนเข้าบัญชีภายใน ${WITHDRAWAL_CONFIG.processingDays} วันทำการ` },
        { q: 'มีค่าธรรมเนียมไหม?', a: 'ไม่มี! เราไม่เก็บค่าธรรมเนียมการถอนเงิน' },
      ]
    },
  ];

  const contactMethods = [
    { 
      icon: Phone, 
      title: 'โทรศัพท์', 
      detail: '02-XXX-XXXX', 
      subdetail: 'จ-ศ 9:00-18:00',
      color: 'green' 
    },
    { 
      icon: MessageCircle, 
      title: 'LINE', 
      detail: '@labellink', 
      subdetail: 'ตอบกลับภายใน 1 ชม.',
      color: 'blue' 
    },
    { 
      icon: Mail, 
      title: 'อีเมล', 
      detail: 'help@labellink.app', 
      subdetail: 'ตอบกลับภายใน 24 ชม.',
      color: 'purple' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Link href="/mobile/labeler/profile">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">ศูนย์ช่วยเหลือ</h1>
          <div className="w-12"></div>
        </div>

        <Card className="bg-white/95">
          <CardContent className="p-5 text-center">
            <HelpCircle className="w-12 h-12 text-teal-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">ยินดีช่วยเหลือคุณ</h2>
            <p className="text-gray-600">ค้นหาคำตอบหรือติดต่อทีมงาน</p>
          </CardContent>
        </Card>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 cursor-pointer active:scale-95 transition-transform">
            <CardContent className="p-5 text-center">
              <Video className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-bold">วิดีโอสอน</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 cursor-pointer active:scale-95 transition-transform">
            <CardContent className="p-5 text-center">
              <FileText className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-bold">คู่มือใช้งาน</div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">ติดต่อเรา</h3>
            <div className="space-y-3">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const colorMap: Record<string, { bg: string; text: string }> = {
                  green: { bg: 'bg-green-100', text: 'text-green-600' },
                  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                };
                const colors = colorMap[method.color];

                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{method.title}</div>
                        <div className="text-sm text-gray-600">{method.detail}</div>
                        <div className="text-xs text-gray-500">{method.subdetail}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">คำถามที่พบบ่อย</h2>
          
          {faqs.map((category, catIndex) => (
            <Card key={catIndex}>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-teal-600 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => (
                    <details key={qIndex} className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-5 h-5 text-teal-600" />
                          </div>
                          <span className="font-medium text-gray-900 text-left">{item.q}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="mt-3 ml-11 p-4 bg-teal-50 rounded-xl border-l-4 border-teal-400">
                        <p className="text-gray-700 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Chat Button */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600">
          <CardContent className="p-6">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">ยังหาคำตอบไม่เจอ?</h3>
              <p className="text-white/90 mb-4">คุยกับทีมงานได้เลย</p>
              <Button className="w-full py-4 bg-white text-green-600 rounded-2xl font-bold shadow-lg hover:bg-gray-50">
                เริ่มแชท
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="p-5 text-center">
            <p className="text-gray-700 mb-3">ช่วยเราปรับปรุงได้ไหม?</p>
            <Button variant="outline" className="border-2 border-yellow-500 text-yellow-700 font-bold">
              แสดงความคิดเห็น
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
