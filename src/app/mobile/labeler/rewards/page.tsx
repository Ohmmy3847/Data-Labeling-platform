'use client';

import Link from 'next/link';
import { ArrowLeft, Gift, Star, Sparkles, TrendingUp, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LABELER_REWARDS, AVAILABLE_REWARDS } from '@/config/rewardsConfig';

export default function RewardsPage() {
  const currentPoints = LABELER_REWARDS.points.current;
  const nextTier = LABELER_REWARDS.points.nextTier;
  const tierProgress = (currentPoints / nextTier) * 100;

  const availableRewards = AVAILABLE_REWARDS;

  const redeemedRewards = [
    { name: 'ส่วนลด 7-Eleven ฿20', date: '5 วันที่แล้ว', code: 'XXXXX123', status: 'used' },
    { name: 'เงินโบนัส ฿100', date: '2 สัปดาห์ที่แล้ว', code: '-', status: 'redeemed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-orange-600 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Link href="/mobile/labeler/profile">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">ของรางวัล</h1>
          <div className="w-12"></div>
        </div>

        {/* Points Card */}
        <Card className="bg-white/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-500 mr-2" />
                <span className="text-gray-600 font-medium">คะแนนของคุณ</span>
              </div>
              <div className="text-5xl font-bold text-yellow-600 mb-2">
                {currentPoints.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">แต้มสะสม</div>
            </div>

            {/* Tier Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">ระดับถัดไป</span>
                <span className="text-sm font-bold text-yellow-600">
                  {currentPoints}/{nextTier}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${tierProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                อีก {nextTier - currentPoints} แต้ม จะได้โบนัสพิเศษ!
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* How to Earn Points */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <CardContent className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              วิธีรับแต้ม
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">ทำงาน 1 งาน</span>
                <span className="font-bold text-blue-600">+{LABELER_REWARDS.points.perTask} แต้ม</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">เข้าใช้งานทุกวัน</span>
                <span className="font-bold text-green-600">+{LABELER_REWARDS.points.perDailyLogin} แต้ม</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">แนะนำเพื่อน 1 คน</span>
                <span className="font-bold text-purple-600">+{LABELER_REWARDS.points.perReferral} แต้ม</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">แลกของรางวัล</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {availableRewards.map((reward) => {
              const IconComponent = reward.type === 'cash' ? TrendingUp : reward.points >= 5000 ? Crown : Gift;
              const canRedeem = currentPoints >= reward.points;
              const colorMap: Record<string, { bg: string; text: string; border: string; button: string }> = {
                green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-300', button: 'bg-green-600' },
                blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-300', button: 'bg-blue-600' },
                purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-300', button: 'bg-purple-600' },
                orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-300', button: 'bg-orange-600' },
                pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-300', button: 'bg-pink-600' },
                yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-300', button: 'bg-yellow-600' },
              };
              const colors = colorMap[reward.color];

              return (
                <Card 
                  key={reward.id}
                  className={`border-2 ${canRedeem ? colors.border : 'border-gray-200'} ${canRedeem ? colors.bg : 'bg-gray-50 opacity-60'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 ${canRedeem ? colors.bg : 'bg-gray-100'} rounded-2xl flex items-center justify-center border-2 ${canRedeem ? colors.border : 'border-gray-300'}`}>
                          <IconComponent className={`w-8 h-8 ${canRedeem ? colors.text : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{reward.name}</h3>
                          <div className="flex items-center">
                            <Star className={`w-4 h-4 ${canRedeem ? 'text-yellow-500' : 'text-gray-400'} mr-1`} />
                            <span className={`font-bold ${canRedeem ? colors.text : 'text-gray-500'}`}>
                              {reward.points} แต้ม
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        disabled={!canRedeem}
                        className={`px-4 py-2 rounded-xl font-bold text-white ${
                          canRedeem 
                            ? `${colors.button} hover:opacity-90` 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {canRedeem ? 'แลก' : 'ไม่พอ'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Redeemed Rewards */}
        {redeemedRewards.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ของรางวัลที่แลกแล้ว</h3>
              
              <div className="space-y-3">
                {redeemedRewards.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-bold text-gray-900">{reward.name}</div>
                      <div className="text-sm text-gray-600">{reward.date}</div>
                      {reward.code !== '-' && (
                        <div className="text-xs text-gray-500 mt-1">โค้ด: {reward.code}</div>
                      )}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      reward.status === 'used' 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {reward.status === 'used' ? 'ใช้แล้ว' : 'แลกแล้ว'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Special Offer */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600">
          <CardContent className="p-6 text-center">
            <Crown className="w-12 h-12 text-white mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">โปรโมชั่นพิเศษ!</h3>
            <p className="text-white/90 mb-4">วันนี้ - วันอาทิตย์หน้า</p>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="text-white font-medium mb-2">แลกของรางวัลทุกชิ้น</p>
              <p className="text-2xl font-bold text-yellow-300">ลด 20%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
