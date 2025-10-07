'use client';

import Link from 'next/link';
import { ArrowLeft, Trophy, Star, Award, Crown, Target, Zap, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { LABELER_REWARDS, SPECIAL_BONUSES } from '@/config/rewardsConfig';

export default function AchievementsPage() {
  const achievements = [
    { 
      id: 1, 
      name: 'ผู้เริ่มต้น', 
      description: 'ทำงานครบ 10 งาน', 
      icon: Star, 
      color: 'blue', 
      progress: 100, 
      unlocked: true,
      reward: `฿${SPECIAL_BONUSES.firstTaskBonus}`
    },
    { 
      id: 2, 
      name: 'มือโปร', 
      description: 'ทำงานครบ 100 งาน', 
      icon: Trophy, 
      color: 'purple', 
      progress: 100, 
      unlocked: true,
      reward: `฿${SPECIAL_BONUSES.hundredTasksBonus}`
    },
    { 
      id: 3, 
      name: 'ยอดนักป้าย', 
      description: 'ทำงานครบ 500 งาน', 
      icon: Crown, 
      color: 'yellow', 
      progress: 49, 
      unlocked: false,
      reward: '฿500'
    },
    { 
      id: 4, 
      name: 'เซียนเสียง', 
      description: 'บันทึกเสียงครบ 50 งาน', 
      icon: Zap, 
      color: 'orange', 
      progress: 100, 
      unlocked: true,
      reward: '฿100'
    },
    { 
      id: 5, 
      name: 'นักแปล', 
      description: 'แปลข้อความครบ 200 งาน', 
      icon: Target, 
      color: 'green', 
      progress: 76, 
      unlocked: false,
      reward: '฿300'
    },
    { 
      id: 6, 
      name: 'ปู่ย่าทองคำ', 
      description: 'รายได้สะสมครบ ฿10,000', 
      icon: Award, 
      color: 'pink', 
      progress: 24, 
      unlocked: false,
      reward: '฿1,000'
    },
  ];

  const dailyStreak = LABELER_REWARDS.stats.currentStreak;
  const totalPoints = LABELER_REWARDS.points.current;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Link href="/mobile/labeler/profile">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">ความสำเร็จ</h1>
          <div className="w-12"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/95">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </div>
              <div className="text-xs text-gray-600">ปลดล็อก</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dailyStreak}</div>
              <div className="text-xs text-gray-600">วันติดต่อกัน</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
              <div className="text-xs text-gray-600">คะแนน</div>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">ความสำเร็จทั้งหมด</h2>

        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const colorMap: Record<string, { bg: string; icon: string; progress: string; badge: string }> = {
            blue: { bg: 'bg-blue-50', icon: 'text-blue-600', progress: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-600', progress: 'bg-purple-600', badge: 'bg-purple-100 text-purple-700' },
            yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', progress: 'bg-yellow-600', badge: 'bg-yellow-100 text-yellow-700' },
            orange: { bg: 'bg-orange-50', icon: 'text-orange-600', progress: 'bg-orange-600', badge: 'bg-orange-100 text-orange-700' },
            green: { bg: 'bg-green-50', icon: 'text-green-600', progress: 'bg-green-600', badge: 'bg-green-100 text-green-700' },
            pink: { bg: 'bg-pink-50', icon: 'text-pink-600', progress: 'bg-pink-600', badge: 'bg-pink-100 text-pink-700' },
          };
          const colors = colorMap[achievement.color];

          return (
            <Card 
              key={achievement.id} 
              className={`border-2 ${achievement.unlocked ? `border-${achievement.color}-300 ${colors.bg}` : 'border-gray-200 opacity-60'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${achievement.unlocked ? colors.bg : 'bg-gray-100'} rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${achievement.unlocked ? `border-${achievement.color}-300` : 'border-gray-300'}`}>
                    <IconComponent className={`w-8 h-8 ${achievement.unlocked ? colors.icon : 'text-gray-400'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className={`px-3 py-1 rounded-full ${colors.badge} text-xs font-bold flex items-center`}>
                          <Gift className="w-3 h-3 mr-1" />
                          {achievement.reward}
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">ความคืบหน้า</span>
                        <span className={`text-xs font-bold ${achievement.unlocked ? colors.icon : 'text-gray-600'}`}>
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`${achievement.unlocked ? colors.progress : 'bg-gray-400'} h-2.5 rounded-full transition-all duration-300`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {achievement.unlocked && (
                      <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
                        <Trophy className="w-3 h-3 mr-1" />
                        ปลดล็อกแล้ว!
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Coming Soon */}
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-600 mb-1">เร็วๆ นี้</h3>
            <p className="text-sm text-gray-500">ความสำเร็จใหม่กำลังจะมาเร็วๆ นี้!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
