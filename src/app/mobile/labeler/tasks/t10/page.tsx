'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, RotateCcw, Info, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import TaskSummary from '@/components/shared/TaskSummary';
import TaskHeader from '@/components/shared/TaskHeader';
import BottomNavigation from '@/components/shared/BottomNavigation';

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
}

interface TaskResult {
  completed: number;
  total: number;
  earnings: number;
  completedAt: string;
}

const OBJECT_COLORS = {
//   'รถยนต์': '#ef4444',
//   'คน': '#3b82f6', 
  'สัญญาณไฟ': '#eab308',
//   'ป้ายร้าน': '#10b981',
//   'ต้นไม้': '#8b5cf6'
};

export default function BoundingBoxTask() {
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentBox, setCurrentBox] = useState<Partial<BoundingBox> | null>(null);
  const [selectedLabel, setSelectedLabel] = useState('สัญญาณไฟ');
  const [showInstructions, setShowInstructions] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const objectLabels = [
    // 'รถยนต์', 
    // 'คน', 
    'สัญญาณไฟ' 
    // 'ป้ายร้าน', 
    // 'ต้นไม้'
];

  const handleStart = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentBox({
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0,
      label: selectedLabel,
      color: OBJECT_COLORS[selectedLabel as keyof typeof OBJECT_COLORS]
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing || !currentBox || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setCurrentBox(prev => ({
      ...prev,
      width: x - (prev?.x || 0),
      height: y - (prev?.y || 0)
    }));
  };

  const handleEnd = () => {
    if (!isDrawing || !currentBox) return;
    
    if (Math.abs(currentBox.width || 0) > 20 && Math.abs(currentBox.height || 0) > 20) {
      const newBox: BoundingBox = {
        id: currentBox.id || Date.now().toString(),
        x: currentBox.x || 0,
        y: currentBox.y || 0,
        width: currentBox.width || 0,
        height: currentBox.height || 0,
        label: currentBox.label || selectedLabel,
        color: currentBox.color || OBJECT_COLORS[selectedLabel as keyof typeof OBJECT_COLORS]
      };
      
      setBoxes(prev => [...prev, newBox]);
    }
    
    setIsDrawing(false);
    setCurrentBox(null);
  };

  // Mouse events
  const handleMouseDown = (e: MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const deleteBox = (boxId: string) => {
    setBoxes(prev => prev.filter(box => box.id !== boxId));
  };

  const clearAll = () => {
    setBoxes([]);
    setCurrentBox(null);
    setIsDrawing(false);
  };

  const submitTask = () => {
    // Calculate earnings (฿0.50 per object)
    const earnings = boxes.length * 0.50;
    
    // Set task result and show summary
    setTaskResult({
      completed: boxes.length,
      total: boxes.length,
      earnings: earnings,
      completedAt: new Date().toLocaleString('th-TH')
    });
    setShowSummary(true);
  };

  if (showSummary && taskResult) {
    return (
      <TaskSummary
        taskResult={taskResult}
        taskInfo={{
          name: 'การวาดกรอบวัตถุ',
          description: 'การวาดกรอบวัตถุ',
          emoji: '🎯',
          color: 'teal',
          unit: 'วัตถุ',
          rate: 0.50
        }}
        onReset={() => {
          setShowSummary(false);
          setTaskResult(null);
          setBoxes([]);
          setCurrentBox(null);
          setIsDrawing(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <TaskHeader
        title="วาดกรอบวัตถุ"
        reward="฿0.50 / วัตถุ"
        color="teal"
        completedCount={boxes.length}
        totalCount={10}
      />

      <div className="px-4 py-6">
        {/* Instructions Toggle */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">วาดกรอบรอบวัตถุ</h2>
          <button 
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <Card variant="elevated" padding="lg" className="mb-6 border-3 border-teal-300">
            <CardContent>
              <h3 className="text-lg font-bold text-gray-900 mb-3">📍 วิธีการทำงาน</h3>
              <div className="space-y-2 text-gray-800">
                <p className="text-base font-medium">1. เลือกประเภทวัตถุที่ต้องการวาดกรอบ</p>
                <p className="text-base font-medium">2. กดค้างแล้วลากเพื่อวาดกรอบรอบวัตถุ</p>
                <p className="text-base font-medium">3. วาดกรอบให้พอดีกับขอบของวัตถุ</p>
                <p className="text-base font-medium">4. ทำซ้ำจนครบทุกวัตถุที่กำหนด</p>
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="mt-4 text-teal-600 font-bold underline"
              >
                เข้าใจแล้ว ซ่อนคำแนะนำ
              </button>
            </CardContent>
          </Card>
        )}

        {/* Object Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">เลือกประเภทวัตถุ</h3>
          <div className="grid grid-cols-2 gap-3">
            {objectLabels.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedLabel(label)}
                className={`p-4 rounded-2xl border-3 font-bold text-base transition-all ${
                  selectedLabel === label
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                }`}
              >
                <span 
                  className="inline-block w-4 h-4 rounded mr-2" 
                  style={{ backgroundColor: OBJECT_COLORS[label as keyof typeof OBJECT_COLORS] }}
                ></span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        

        {/* Canvas Area */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ภาพถนนในเมือง - วาดกรอบรอบวัตถุ ({boxes.length})
          </h3>
          
          <div className="relative border-4 border-gray-400 rounded-2xl overflow-hidden bg-blue-200">
            <div
              ref={canvasRef}
              className="relative w-full h-80 cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                backgroundColor: '#87CEEB',
                backgroundImage: imageLoaded ? 'none' : 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 50%, #696969 100%)',
                touchAction: 'none'
              }}
            >
              {/* Real image */}
              <img 
                src="/images/road.jpg" 
                alt="ภาพถนนในเมือง"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                onLoad={() => {
                  console.log('DPARKTraffic image loaded successfully');
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={(e) => {
                  console.error('DPARKTraffic image failed to load');
                  setImageError(true);
                  setImageLoaded(false);
                }}
              />
              
              {/* Loading state */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <p className="text-gray-600 font-bold">⏳ กำลังโหลด...</p>
                </div>
              )}
              
              {/* Simple fallback if image fails */}
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-gray-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-lg font-bold">🚗 ภาพถนนจำลอง</p>
                    <p className="text-sm">ใช้สำหรับฝึกวาดกรอบ</p>
                  </div>
                </div>
              )}
              
              
              {/* Existing boxes */}
              {boxes.map((box) => (
                <div
                  key={box.id}
                  className="absolute border-3 pointer-events-none"
                  style={{
                    left: box.x,
                    top: box.y,
                    width: Math.abs(box.width),
                    height: Math.abs(box.height),
                    borderColor: box.color,
                    backgroundColor: `${box.color}20`,
                    zIndex: 30
                  }}
                >
                  <div 
                    className="absolute -top-8 left-0 px-2 py-1 text-xs font-bold text-white rounded"
                    style={{ backgroundColor: box.color }}
                  >
                    {box.label}
                  </div>
                </div>
              ))}
              
              {/* Current drawing box */}
              {isDrawing && currentBox && (
                <div
                  className="absolute border-3 pointer-events-none"
                  style={{
                    left: currentBox.x,
                    top: currentBox.y,
                    width: Math.abs(currentBox.width || 0),
                    height: Math.abs(currentBox.height || 0),
                    borderColor: currentBox.color,
                    backgroundColor: `${currentBox.color}20`,
                    borderStyle: 'dashed',
                    zIndex: 30
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Drawn Objects List */}
        {boxes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">วัตถุที่วาดแล้ว ({boxes.length})</h3>
            <div className="space-y-3">
              {boxes.map((box) => (
                <Card key={box.id} variant="elevated" padding="md" className="border-2 border-gray-300">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="w-6 h-6 rounded" 
                          style={{ backgroundColor: box.color }}
                        ></span>
                        <div>
                          <p className="font-bold text-gray-900">{box.label}</p>
                          <p className="text-sm text-gray-600">
                            ตำแหน่ง: ({Math.round(box.x)}, {Math.round(box.y)})
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteBox(box.id)}
                        className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <Card variant="soft" padding="lg" className="border-2 border-gray-300 submit-section">
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={clearAll}
                  className="flex-1 py-4 bg-gray-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>ล้างทั้งหมด</span>
                </button>
              </div>
              
              <Button
                onClick={submitTask}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Check className="w-6 h-6" />
                <span>ส่งงาน ({boxes.length} วัตถุ)</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="tasks" />
    </div>
  );
}