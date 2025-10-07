'use client';

import Link from 'next/link';
import { 
  User, Bell, Target, Coins, Trophy, Star,
  Play, MessageCircle, Settings, Users,
  FileText, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BottomNavigation from '@/components/shared/BottomNavigation';
import { mockLabelers, mockTasks } from '@/data/mockData';
import { LABELER_REWARDS, SPECIAL_BONUSES } from '@/config/rewardsConfig';
import { TASK_CONFIGS } from '@/config/taskConfig';

export default function MobileLabelerDashboard() {
  const currentUser = mockLabelers[0];
  const availableTasks = mockTasks.filter(task => !task.completedBy.includes(currentUser.id)).slice(0, 3);
  const todayEarnings = LABELER_REWARDS.earnings.today;
  const todayTasks = LABELER_REWARDS.tasks.today;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - High Contrast */}
      <header className="bg-white shadow-lg px-4 py-5 sticky top-0 z-50 border-b-4 border-green-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-green-700 to-emerald-800 rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">น</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-xl">สวัสดี คุณ{currentUser.name}! 👋</h1>
              <p className="text-base text-gray-700 font-semibold">วันนี้พร้อมทำงานหรือยัง?</p>
            </div>
          </div>
          
          <button className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Today Summary - Key Point #1 - High Contrast */}
        <Card variant="elevated" padding="xl" className="mb-6 border-4 border-green-600 shadow-xl">
          <CardContent>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">สรุปงานวันนี้ 📊</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-yellow-100 rounded-3xl p-6 border-3 border-yellow-400">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">฿{todayEarnings.toFixed(2)}</div>
                  <div className="text-lg text-gray-800 font-semibold">รายได้วันนี้</div>
                </div>
                
                <div className="bg-blue-100 rounded-3xl p-6 border-3 border-blue-400">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{todayTasks}</div>
                  <div className="text-lg text-gray-800 font-semibold">งานที่ทำ</div>
                </div>
              </div>
              
              <div className="mt-6 bg-green-100 rounded-3xl p-4 border-3 border-green-400">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6 text-green-700" />
                  <span className="text-lg font-bold text-gray-900">เลเวล {currentUser.level} • {currentUser.points.toLocaleString()} คะแนน</span>
                </div>
              </div>
              
              {/* Summary Button */}
              <div className="mt-4">
                <Link href="/mobile/labeler/summary">
                  <Button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>ดูสรุปผลงานทั้งหมด</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Tasks - Key Point #2 - High Contrast */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">งานที่มีให้ทำ 🎯</h2>
            <Link href="/mobile/labeler/tasks" className="text-blue-700 text-lg font-bold underline">
              ดูทั้งหมด
            </Link>
          </div>
          
          <div className="space-y-4">
            {availableTasks.map((task) => (
              <Link key={task.id} href={`/mobile/labeler/tasks/${task.id}`}>
                <Card variant="elevated" padding="lg" className="group active:scale-95 transition-transform border-3 border-gray-300 shadow-lg">
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center border-3 border-orange-400">
                        <MessageCircle className="w-8 h-8 text-orange-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          งานวิเคราะห์ความรู้สึก
                        </h3>
                        <p className="text-gray-700 text-base mb-2 font-medium">
                          {typeof task.content === 'string' 
                            ? task.content.slice(0, 50) 
                            : task.content?.text?.slice(0, 50) || 'เนื้อหางาน'
                          }...
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="bg-green-200 text-green-900 px-3 py-1 rounded-xl text-base font-bold border-2 border-green-400">
                            ง่าย
                          </span>
                          <span className="text-blue-700 font-bold text-xl">
                            ฿{task.reward.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Data Scraping Task - New */}
          <Link href="/mobile/labeler/tasks/t12">
            <Card variant="elevated" padding="lg" className="group active:scale-95 transition-transform border-3 border-purple-300 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center border-3 border-purple-400">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      🔍 Data Scraping
                    </h3>
                    <p className="text-gray-700 text-base mb-2 font-medium">
                      เก็บข้อมูลตาม requirement ที่กำหนด...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-200 text-purple-900 px-3 py-1 rounded-xl text-base font-bold border-2 border-purple-400">
                        ใหม่!
                      </span>
                      <span className="text-purple-700 font-bold text-xl">
                        {TASK_CONFIGS.t12.reward}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <div className="mt-6">
            <Link href="/mobile/labeler/tasks">
              <Button variant="primary" size="lg" fullWidth className="h-16 text-xl font-bold shadow-lg">
                ดูงานทั้งหมด 🚀
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card variant="elevated" padding="lg" className="border-3 border-purple-300 shadow-lg">
            <CardContent>
              <div className="text-center">
                <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{currentUser.friends.length}</div>
                <div className="text-base text-gray-800 font-semibold">เพื่อน</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated" padding="lg" className="border-3 border-pink-300 shadow-lg">
            <CardContent>
              <div className="text-center">
                <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{Math.round(currentUser.accuracy)}%</div>
                <div className="text-base text-gray-800 font-semibold">ความแม่นยำ</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Challenge */}
        <Card variant="gradient" padding="xl" className="mb-6 border-4 border-yellow-500 shadow-xl">
          <CardContent>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🏆 ความท้าทายวันนี้</h3>
              <p className="text-lg text-gray-800 font-semibold mb-4">
                ทำงาน {SPECIAL_BONUSES.dailyChallengeTarget} งาน รับโบนัส ฿{SPECIAL_BONUSES.dailyChallengeBonus}
              </p>
              
              <div className="bg-white rounded-2xl p-4 mb-4 border-3 border-gray-300">
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-2">
                  <span>ความคืบหน้า</span>
                  <span>{todayTasks}/{SPECIAL_BONUSES.dailyChallengeTarget}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-4 border-2 border-gray-400">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-300"
                    style={{width: `${Math.min((todayTasks / 10) * 100, 100)}%`}}
                  ></div>
                </div>
              </div>
              
              <p className="text-base text-gray-800 font-semibold">
                เหลืออีก {Math.max(10 - todayTasks, 0)} งาน!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="home" />
    </div>
  );
}