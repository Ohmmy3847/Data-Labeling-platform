'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, RefreshCw, Eye, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import TaskSummary from '@/components/shared/TaskSummary';
import TaskHeader from '@/components/shared/TaskHeader';
import BottomNavigation from '@/components/shared/BottomNavigation';

interface ImageBatch {
  id: number;
  imageUrl: string;
  description?: string;
  tags?: string[];
}

interface TaskResult {
  completed: number;
  total: number;
  earnings: number;
  completedAt: string;
}

const imageBatch: ImageBatch[] = [
  { 
    id: 1, 
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  { 
    id: 2, 
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
  },
  { 
    id: 3, 
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=300&fit=crop"
  },
  { 
    id: 4, 
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
  },
  { 
    id: 5, 
    imageUrl: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&h=300&fit=crop"
  },
  { 
    id: 6, 
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop"
  },
  { 
    id: 7, 
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
  },
  { 
    id: 8, 
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
  }
];

const availableTags = [
  'ธรรมชาติ', 'เมือง', 'รถยนต์', 'อาหาร', 'สถาปัตยกรรม', 'สัตว์', 
  'กีฬา', 'ป่าไผ่', 'ท้องฟ้า', 'น้ำ', 'ภูเขา', 'อาคาร', 'ผู้คน', 
  'ต้นไม้', 'ดอกไม้', 'เทคโนโลยี', 'ศิลปะ', 'ดนตรี'
];

export default function ImageTaggingBatch() {
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [responses, setResponses] = useState<ImageBatch[]>(
    imageBatch.map(item => ({ ...item, tags: [] }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handleTagToggle = (tag: string) => {
    const updatedResponses = [...responses];
    const currentTags = updatedResponses[currentIndex].tags || [];
    const wasCompleted = currentTags.length >= 3;
    
    if (currentTags.includes(tag)) {
      updatedResponses[currentIndex].tags = currentTags.filter(t => t !== tag);
    } else {
      if (currentTags.length < 5) { // Max 5 tags
        updatedResponses[currentIndex].tags = [...currentTags, tag];
      }
    }
    
    setResponses(updatedResponses);
    
    // Update completed count
    const newTagsLength = updatedResponses[currentIndex].tags?.length || 0;
    const isNowCompleted = newTagsLength >= 3;
    
    if (!wasCompleted && isNowCompleted) {
      setCompletedCount(prev => prev + 1);
    } else if (wasCompleted && !isNowCompleted) {
      setCompletedCount(prev => prev - 1);
    }
  };

  const resetAll = () => {
    setResponses(imageBatch.map(item => ({ ...item, tags: [] })));
    setCurrentIndex(0);
    setCompletedCount(0);
  };

  const submitBatch = () => {
    const completed = responses.filter(r => (r.tags?.length || 0) >= 3).length;
    const earnings = completed * 0.15;
    
    // เก็บผลงานและแสดงหน้าสรุป
    setTaskResult({
      completed,
      total: responses.length,
      earnings,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  const resetForm = () => {
    setShowSummary(false);
    setTaskResult(null);
    setResponses(imageBatch.map(item => ({ ...item, tags: [] })));
    setCurrentIndex(0);
    setCompletedCount(0);
  };

  const currentImage = responses[currentIndex];
  const progressPercentage = (completedCount / responses.length) * 100;

  // หน้าสรุปผลงาน
  if (showSummary && taskResult) {
    return (
      <TaskSummary
        taskResult={taskResult}
        taskInfo={{
          name: 'การติดป้ายรูปภาพ',
          description: 'การติดป้ายรูปภาพ',
          emoji: '🎉',
          color: 'purple',
          unit: 'รูป',
          rate: 0.15
        }}
        onReset={resetForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b-4 border-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/labeler/tasks">
              <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">ติดป้ายรูปภาพ</h1>
              <p className="text-base text-gray-700 font-medium">รางวัล: ฿0.15 / รูป</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{completedCount}/{responses.length}</div>
            <div className="text-sm text-gray-600">เสร็จแล้ว</div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Progress Bar */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-purple-300">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">📊 ความคืบหน้า</h3>
              <span className="text-lg font-bold text-purple-600">
                ฿{(completedCount * 0.15).toFixed(2)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>เริ่มต้น</span>
              <span>เสร็จสิ้น</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Image */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                รูปที่ {currentIndex + 1}: เลือกป้ายที่เหมาะสม
              </h3>
            </div>
            
            {/* Image */}
            <div className="mb-6 relative rounded-2xl overflow-hidden border-3 border-gray-300">
              <img 
                src={currentImage?.imageUrl} 
                alt="รูปภาพที่ต้องติดป้าย"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Loading+Image";
                }}
              />
            </div>

            {/* Selected Tags */}
            {currentImage?.tags && currentImage.tags.length > 0 && (
              <div className="mb-4">
                <h4 className="text-base font-bold text-gray-900 mb-2">
                  ป้ายที่เลือกแล้ว ({currentImage.tags.length}/5):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentImage.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium flex items-center space-x-1"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                      <span className="ml-1">×</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Available Tags */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3">เลือกป้าย:</h4>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => {
                  const isSelected = currentImage?.tags?.includes(tag);
                  const isDisabled = !isSelected && (currentImage?.tags?.length || 0) >= 5;
                  
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      disabled={isDisabled}
                      className={`px-3 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600'
                          : isDisabled
                            ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex-1 py-3 bg-gray-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← รูปก่อน
              </button>
              
              <button
                onClick={() => setCurrentIndex(Math.min(responses.length - 1, currentIndex + 1))}
                disabled={currentIndex === responses.length - 1}
                className="flex-1 py-3 bg-purple-500 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                รูปถัดไป →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <h3 className="text-lg font-bold text-gray-900 mb-4">📋 สรุปความคืบหน้า</h3>
            <div className="grid grid-cols-4 gap-2">
              {responses.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    index === currentIndex
                      ? 'bg-purple-100 border-purple-500 text-purple-900'
                      : (item.tags?.length || 0) >= 3
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  รูป {index + 1}
                  <div className="text-xs mt-1">
                    {item.tags?.length || 0} ป้าย
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300">
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={resetAll}
                  className="flex-1 py-4 bg-gray-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>เริ่มใหม่</span>
                </button>
              </div>
              
              <Button
                onClick={submitBatch}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Check className="w-6 h-6" />
                <span>ส่งชุดงาน (฿{(completedCount * 0.15).toFixed(2)})</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}