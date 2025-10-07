'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Filter, Search, Clock, Star,
  FileText, Image, MessageSquare, Music,
  Users, Target, CheckCircle, PlayCircle,
  MessageCircle, Brain, Shield, Award,
  TestTube, Database, Square
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BottomNavigation from '@/components/shared/BottomNavigation';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';
import ResponsivePage from '@/components/layout/ResponsivePage';
import { mockTasks } from '@/data/mockData';
import { TASK_CONFIGS } from '@/config/taskConfig';

const taskTypeIcons = {
  'text-sentiment': MessageSquare,
  'image-tagging': Image,
  'chat-qa': FileText,
  'audio-classification': Music,
  'bounding-box': Square
};

// ใช้ข้อมูลจาก TASK_CONFIGS แทน hardcode
const getTaskDisplayName = (taskId: string, type: string) => {
  const config = TASK_CONFIGS[taskId as keyof typeof TASK_CONFIGS];
  if (config) {
    return config.name;
  }
  
  // fallback สำหรับ task ที่ไม่มีใน config
  const fallbackNames = {
    'text-sentiment': 'วิเคราะห์ความรู้สึก',
    'image-tagging': 'ติดป้ายรูปภาพ',
    'chat-qa': 'ตอบคำถาม',
    'audio-classification': 'จัดหมวดหมู่เสียง',
    'bounding-box': 'วาดกรอบวัตถุ'
  };
  return fallbackNames[type as keyof typeof fallbackNames] || 'งานใหม่';
};

const getTaskDescription = (taskId: string, content: any) => {
  const config = TASK_CONFIGS[taskId as keyof typeof TASK_CONFIGS];
  if (config) {
    return config.description;
  }
  
  // fallback ใช้ content ถ้าไม่มีใน config
  return typeof content === 'string' ? content : content?.text || 'เนื้อหางาน';
};

const difficultyColors = {
  easy: 'bg-green-200 text-green-900 border-green-400',
  medium: 'bg-yellow-200 text-yellow-900 border-yellow-400',
  hard: 'bg-red-200 text-red-900 border-red-400'
};

const difficultyNames = {
  easy: 'ง่าย',
  medium: 'ปานกลาง',
  hard: 'ยาก'
};

export default function MobileTasksList() {
  const availableTasks = mockTasks.filter(task => task.completedBy.length === 0);
  const myTasks = mockTasks.filter(task => task.completedBy.includes('labeler1'));
  
  // Tasks actually displayed on the page
  const displayedTasksFromList = availableTasks.slice(0, 10); // First 10 tasks from the list
  
  // Calculate stats from displayed tasks + t12 (featured task)
  const totalReward = displayedTasksFromList.reduce((sum, task) => sum + task.reward, 0) + TASK_CONFIGS.t12.rate;
  const totalTime = displayedTasksFromList.reduce((sum, task) => sum + task.estimatedTime, 0) + 45; // t12 estimated 45 min
  const totalTasks = displayedTasksFromList.length + 1; // +1 for t12

  return (
    <ResponsivePage withBottomNav>
      {/* Mobile Header - High Contrast */}
      <ResponsiveHeader borderColor="border-green-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/labeler">
              <button className="touch-target w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900 text-fluid-lg sm:text-fluid-xl">งานที่มี</h1>
              <p className="text-fluid-sm sm:text-fluid-base text-gray-700 font-medium">{availableTasks.length} งานใหม่</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="touch-target w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
              <Search className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </button>
            <button className="touch-target w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
              <Filter className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </ResponsiveHeader>

      <ResponsiveContainer maxWidth="lg">
        {/* Filter Tabs - Key Point #1 - High Contrast */}
        <div className="mb-4 sm:mb-6">
          <div className="flex bg-gray-200 rounded-3xl p-2 border-2 border-gray-400">
            <button className="touch-target flex-1 bg-white text-gray-900 font-bold py-3 sm:py-4 px-3 sm:px-4 rounded-2xl shadow-lg border-2 border-green-600 text-fluid-sm sm:text-fluid-base">
              งานใหม่ ({availableTasks.length})
            </button>
            <button className="touch-target flex-1 text-gray-700 py-3 sm:py-4 px-3 sm:px-4 rounded-2xl font-bold text-fluid-sm sm:text-fluid-base">
              งานที่ทำแล้ว ({myTasks.length})
            </button>
          </div>
        </div>

        {/* Quick Stats - High Contrast */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Card variant="elevated" padding="md" className="border-3 border-gray-300">
            <CardContent>
              <div className="text-center">
                <div className="text-fluid-lg sm:text-fluid-xl font-bold text-gray-900">{totalTasks}</div>
                <div className="text-fluid-xs sm:text-fluid-sm text-gray-700 font-semibold">งานใหม่</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="md" className="border-3 border-gray-300">
            <CardContent>
              <div className="text-center">
                <div className="text-fluid-lg sm:text-fluid-xl font-bold text-gray-900 break-words">
                  ฿{totalReward.toFixed(2)}
                </div>
                <div className="text-fluid-xs sm:text-fluid-sm text-gray-700 font-semibold">รางวัลรวม</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="md" className="border-3 border-gray-300">
            <CardContent>
              <div className="text-center">
                <div className="text-fluid-lg sm:text-fluid-xl font-bold text-gray-900">
                  {Math.round(totalTime / 60)}ช.
                </div>
                <div className="text-fluid-xs sm:text-fluid-sm text-gray-700 font-semibold">เวลารวม</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Tasks - Key Point #2 - High Contrast */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl font-bold text-gray-900 mb-3">งานที่มีให้ทำ 🎯</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Data Scraping Task - Featured */}
            <Link href="/mobile/labeler/tasks/t12">
              <Card variant="elevated" padding="md" className="group active:scale-98 transition-transform border-3 border-purple-300 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardContent>
                  <div className="flex items-start space-x-2 sm:space-x-3 gap-2">
                    <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-purple-100 rounded-3xl flex items-center justify-center flex-shrink-0 border-3 border-purple-400">
                      <Search className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-purple-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <h3 className="font-bold text-gray-900 text-fluid-sm sm:text-fluid-base line-clamp-1">
                          🔍 {TASK_CONFIGS.t12.name}
                        </h3>
                        <div className="text-purple-700 font-bold text-fluid-base sm:text-fluid-lg flex-shrink-0">
                          {TASK_CONFIGS.t12.reward}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-fluid-xs sm:text-fluid-sm mb-2 line-clamp-2 font-medium">
                        {TASK_CONFIGS.t12.description}
                      </p>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="px-2 py-1 rounded-2xl text-fluid-xs sm:text-fluid-sm font-bold border-2 bg-purple-200 text-purple-900 border-purple-400">
                            ใหม่!
                          </span>
                          <div className="flex items-center text-gray-700 text-fluid-xs sm:text-fluid-sm font-medium">
                            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="whitespace-nowrap">30-60 นาที</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-purple-700 flex-shrink-0">
                          <PlayCircle className="w-5 h-5 mr-1" />
                          <span className="text-fluid-xs sm:text-fluid-sm font-bold">เริ่มทำ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            {availableTasks.slice(0, 10).map((task) => {
              const IconComponent = taskTypeIcons[task.type];
              return (
                <Link key={task.id} href={`/mobile/labeler/tasks/${task.id}`}>
                  <Card variant="elevated" padding="md" className="group active:scale-98 transition-transform border-3 border-gray-300 shadow-lg">
                    <CardContent>
                      <div className="flex items-start space-x-2 sm:space-x-3 gap-2">
                        <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-orange-100 rounded-3xl flex items-center justify-center flex-shrink-0 border-3 border-orange-400">
                          <IconComponent className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-orange-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <h3 className="font-bold text-gray-900 text-fluid-sm sm:text-fluid-base line-clamp-1">
                              {getTaskDisplayName(task.id, task.type)}
                            </h3>
                            <div className="text-blue-700 font-bold text-fluid-base sm:text-fluid-lg flex-shrink-0">
                              ฿{task.reward.toFixed(2)}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-fluid-xs sm:text-fluid-sm mb-2 line-clamp-2 font-medium">
                            {getTaskDescription(task.id, task.content)}
                          </p>
                          
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center space-x-2 flex-wrap">
                              <span className={`px-2 py-1 rounded-2xl text-fluid-xs sm:text-fluid-sm font-bold border-2 ${difficultyColors[task.difficulty]}`}>
                                {difficultyNames[task.difficulty]}
                              </span>
                              <div className="flex items-center text-gray-700 text-fluid-xs sm:text-fluid-sm font-medium">
                                <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                <span className="whitespace-nowrap">{task.estimatedTime} นาที</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-green-700 flex-shrink-0">
                              <PlayCircle className="w-5 h-5 mr-1" />
                              <span className="text-fluid-xs sm:text-fluid-sm font-bold">เริ่มทำ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {availableTasks.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="secondary" size="lg" className="text-fluid-base sm:text-fluid-lg font-bold">
                โหลดเพิ่มเติม
              </Button>
            </div>
          )}
        </div>

        {/* Task Recommendations - High Contrast */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl font-bold text-gray-900 mb-4">แนะนำสำหรับคุณ ⭐</h3>
          
          <Card variant="gradient" padding="lg" className="border-4 border-yellow-500 shadow-xl">
            <CardContent>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-14 sm:w-16 md:w-18 h-14 sm:h-16 md:h-18 bg-white rounded-3xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Target className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-fluid-base sm:text-fluid-lg mb-2">
                    งานวิเคราะห์ความรู้สึกภาษาไทย
                  </h4>
                  <p className="text-gray-800 text-fluid-sm sm:text-fluid-base mb-3 font-medium">
                    เหมาะกับคุณที่มีความแม่นยำสูง
                  </p>
                  <div className="flex items-center space-x-3 flex-wrap gap-2">
                    <span className="bg-yellow-200 text-yellow-900 px-3 py-2 rounded-2xl text-fluid-sm sm:text-fluid-base font-bold border-2 border-yellow-400">
                      โบนัส +20%
                    </span>
                    <span className="text-gray-900 font-bold text-fluid-base sm:text-fluid-lg">
                      ฿15 → ฿18
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="tasks" />
    </ResponsivePage>
  );
}