'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, RefreshCw, Mic, Square, Play, Pause } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import BottomNavigation from '@/components/shared/BottomNavigation';

interface SentenceBatch {
  id: number;
  text: string;
  category: 'greeting' | 'question' | 'instruction' | 'story' | 'conversation';
  audioBlob?: Blob;
  isRecorded?: boolean;
}

interface TaskResult {
  completed: number;
  total: number;
  earnings: number;
  completedAt: string;
}

const sentenceBatch: SentenceBatch[] = [
  { 
    id: 1, 
    text: "สวัสดีครับ ยินดีที่ได้รู้จักครับ",
    category: 'greeting'
  },
  { 
    id: 2, 
    text: "วันนี้อากาศเป็นอย่างไรบ้างครับ",
    category: 'question'
  },
  { 
    id: 3, 
    text: "กรุณาเปิดหน้าต่างด้วยครับ",
    category: 'instruction'
  },
  { 
    id: 4, 
    text: "กาลครั้งหนึ่งมีเจ้าหญิงคนหนึ่งอาศัยอยู่ในปราสาท",
    category: 'story'
  },
  { 
    id: 5, 
    text: "คุณชอบกินอาหารประเภทไหนครับ",
    category: 'conversation'
  },
  { 
    id: 6, 
    text: "ขอบคุณมากครับ มีความสุขมากเลย",
    category: 'greeting'
  },
  { 
    id: 7, 
    text: "ช่วยบอกวิธีไปสถานีรถไฟใกล้ที่สุดหน่อยได้ไหมครับ",
    category: 'question'
  },
  { 
    id: 8, 
    text: "โปรดพูดช้าๆ และชัดเจนหน่อยครับ",
    category: 'instruction'
  },
  { 
    id: 9, 
    text: "เขาเดินทางไปยังดินแดนไกลเพื่อตามหาสมบัติที่หายไป",
    category: 'story'
  },
  { 
    id: 10, 
    text: "ผมคิดว่าเราควรจะพักผ่อนกันบ้างนะครับ",
    category: 'conversation'
  }
];

export default function VoiceRecordingBatch() {
  const [responses, setResponses] = useState<SentenceBatch[]>(
    sentenceBatch.map(item => ({ ...item, isRecorded: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const newResponses = [...responses];
        newResponses[currentIndex] = {
          ...newResponses[currentIndex],
          audioBlob,
          isRecorded: true
        };
        setResponses(newResponses);
        setCompletedCount(prev => prev + 1);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งานไมโครโฟน');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    const currentSentence = responses[currentIndex];
    if (currentSentence.audioBlob) {
      const audio = new Audio(URL.createObjectURL(currentSentence.audioBlob));
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const nextSentence = () => {
    if (currentIndex < responses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetAll = () => {
    setResponses(sentenceBatch.map(item => ({ ...item, isRecorded: false })));
    setCurrentIndex(0);
    setCompletedCount(0);
    setIsRecording(false);
    setIsPlaying(false);
  };

  const submitBatch = () => {
    const completed = responses.filter(r => r.isRecorded).length;
    const earnings = completed * 0.25;
    
    setTaskResult({
      completed: completed,
      total: responses.length,
      earnings: earnings,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  const currentSentence = responses[currentIndex];
  const progressPercentage = (completedCount / responses.length) * 100;

  // หน้าสรุปผลงาน
  if (showSummary && taskResult) {
    return (
      <div className="min-h-screen bg-yellow-50 p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Success Banner */}
          <Card className="border-2 border-yellow-300 bg-yellow-100">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold text-yellow-800 mb-2">
                    🎤 เสร็จสิ้นแล้ว!
                  </h1>
                  <p className="text-yellow-700">
                    คุณบันทึกเสียงได้สำเร็จ
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">จำนวนที่ทำเสร็จ:</span>
                    <span className="font-bold text-yellow-600">
                      {taskResult.completed} / {taskResult.total} ประโยค
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">รายได้:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ฿{taskResult.earnings.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">เวลาที่ส่ง:</span>
                    <span className="text-gray-500">{taskResult.completedAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/mobile/labeler/tasks')}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 text-lg font-medium"
            >
              ดูงานอื่นๆ
            </Button>
            
            <Button
              onClick={() => router.push('/mobile/labeler')}
              variant="outline"
              className="w-full py-4 text-yellow-600 border-yellow-300 hover:bg-yellow-50"
            >
              กลับหน้าหลัก
            </Button>
          </div>
        </div>
        <BottomNavigation currentPage="tasks" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-50 border-b-2 border-yellow-300">
        <div className="flex items-center justify-between">
          <Link 
            href="/mobile/labeler/tasks"
            className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">กลับ</span>
          </Link>
          
          <div className="text-center">
            <h1 className="font-bold text-gray-900 text-lg">🎤 บันทึกเสียง</h1>
            <p className="text-sm text-gray-600">อ่านประโยคและบันทึกเสียง</p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">รางวัล</div>
            <div className="font-bold text-yellow-600">฿0.25/ประโยค</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>ความคืบหน้า</span>
            <span>{currentIndex + 1} / {responses.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / responses.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <div className="px-4 pb-28 pt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* คำแนะนำ */}
          <Card className="bg-yellow-50 border border-yellow-200">
            <CardContent className="p-4">
              <h3 className="font-medium text-yellow-800 mb-2">💡 คำแนะนำ:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• อ่านประโยคให้ชัดเจนและค่อนข้างช้า</li>
                <li>• หาสถานที่เงียบสำหรับบันทึกเสียง</li>
                <li>• ถือไมโครโฟนใกล้ปากประมาณ 15-20 ซม.</li>
                <li>• สามารถฟังเสียงที่บันทึกเพื่อตรวจสอบได้</li>
              </ul>
            </CardContent>
          </Card>
          {/* รายการประโยค */}
          <Card className="border-2 border-yellow-300 bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 font-medium">
                    ประโยคที่ {currentIndex + 1} จาก {responses.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentSentence.category === 'greeting' && '👋 ทักทาย'}
                    {currentSentence.category === 'question' && '❓ คำถาม'}
                    {currentSentence.category === 'instruction' && '📋 คำสั่ง'}
                    {currentSentence.category === 'story' && '📖 เรื่องเล่า'}
                    {currentSentence.category === 'conversation' && '💬 สนทนา'}
                  </span>
                </div>

                {/* ประโยคที่จะอ่าน */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <p className="text-lg leading-relaxed text-gray-800 font-medium">
                    "{currentSentence.text}"
                  </p>
                </div>

                {/* ปุ่มบันทึกเสียง */}
                <div className="flex flex-col items-center space-y-4">
                  {!currentSentence.isRecorded ? (
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`flex items-center space-x-2 px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-200 ${
                          isRecording 
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-6 h-6" />
                            <span>หยุดบันทึก</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-6 h-6" />
                            <span>เริ่มบันทึก</span>
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check className="w-6 h-6" />
                        <span className="font-medium">บันทึกเสร็จแล้ว</span>
                      </div>
                      
                      <Button
                        onClick={playRecording}
                        disabled={isPlaying}
                        className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>กำลังเล่น</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>ฟังเสียงที่บันทึก</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {isRecording && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-red-100 border border-red-200 rounded-lg px-4 py-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-700 font-medium">กำลังบันทึก...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* แถบความคืบหน้า */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>ความคืบหน้า</span>
                <span>{completedCount} / {responses.length} ประโยค</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-bold text-yellow-600">
                  ฿{(completedCount * 0.25).toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  (฿0.25 / ประโยค)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* ปุ่มนำทาง */}
          <div className="flex justify-between space-x-4">
            <Button
              onClick={prevSentence}
              disabled={currentIndex === 0}
              variant="outline"
              className="flex-1 py-3"
            >
              ← ก่อนหน้า
            </Button>
            
            <Button
              onClick={nextSentence}
              disabled={currentIndex === responses.length - 1}
              variant="outline"
              className="flex-1 py-3"
            >
              ถัดไป →
            </Button>
          </div>

          {/* ปุ่มจัดการ */}
          <div className="space-y-3">
            <Button
              onClick={submitBatch}
              disabled={completedCount === 0}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 text-lg font-medium"
            >
              ส่งผลงาน ({completedCount} ประโยค)
            </Button>
            
            <Button
              onClick={resetAll}
              variant="outline"
              className="w-full py-3 text-yellow-600 border-yellow-300 hover:bg-yellow-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              เริ่มใหม่ทั้งหมด
            </Button>
          </div>

          
        </div>
      </div>

      <BottomNavigation currentPage="tasks" />
    </div>
  );
}