'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Search, Trophy, Users, Heart,
  MessageSquare, Star, Gift, Target,
  FileText, CheckCircle, Calendar, TrendingUp, Crown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BottomNavigation from '@/components/shared/BottomNavigation';
import { mockLabelers } from '@/data/mockData';

export default function MobileCommunityPage() {
  const topLabelers = mockLabelers
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  const currentUser = mockLabelers[0];
  const currentUserRank = topLabelers.findIndex(l => l.id === currentUser.id) + 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - High Contrast */}
      <header className="bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b-4 border-blue-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/mobile/labeler">
              <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900 text-xl">ชุมชนปู่ย่า</h1>
              <p className="text-base text-gray-700 font-medium">เพื่อนร่วมงาน</p>
            </div>
          </div>
          
          <button className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Community Stats - High Contrast */}
        <Card variant="elevated" padding="lg" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3">สถิติชุมชน</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2.1K</div>
                  <div className="text-base text-gray-700 font-semibold">สมาชิก</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">850</div>
                  <div className="text-base text-gray-700 font-semibold">ออนไลน์</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">12.5K</div>
                  <div className="text-base text-gray-700 font-semibold">งานสำเร็จ</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-base font-semibold">ปู่ย่าช่วยเหลือกัน</span>
            </div>
          </CardContent>
        </Card>

        {/* Your Rank - High Contrast */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">อันดับของคุณ</h3>
          
          <Card variant="elevated" padding="lg" className="border-3 border-gray-300">
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center relative shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {currentUser.name.charAt(0)}
                  </span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <Crown className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900">คุณ{currentUser.name}</h4>
                    <span className="text-2xl font-bold text-yellow-600">#{currentUserRank}</span>
                  </div>
                  <div className="text-base text-gray-700 font-semibold mb-2">
                    {currentUser.points.toLocaleString()} คะแนน • เลเวล {currentUser.level}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(currentUser.points % 1000) / 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard - High Contrast */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">กระดานคะแนน</h3>
            <Button variant="ghost" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              ดูทั้งหมด
            </Button>
          </div>
          
          <div className="space-y-3">
            {topLabelers.slice(0, 5).map((labeler, index) => (
              <Card key={labeler.id} variant="elevated" padding="lg" className={`border-3 ${
                index < 3 ? 'border-yellow-400' : 'border-gray-300'
              }`}>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-400' :
                        'bg-gray-300'
                      }`}>
                        {labeler.name.charAt(0)}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-900' :
                        index === 2 ? 'bg-orange-400 text-orange-900' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900">{labeler.name}</h4>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{labeler.points.toLocaleString()}</div>
                          <div className="text-sm text-gray-700 font-semibold">คะแนน</div>
                        </div>
                      </div>
                      <div className="text-base text-gray-700 font-semibold">
                        {labeler.location} • เลเวล {labeler.level}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Actions - High Contrast */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">กิจกรรมชุมชน</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">แชท</h4>
                  <p className="text-sm text-gray-700 font-semibold">พูดคุยกับเพื่อน</p>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">โบนัส</h4>
                  <p className="text-sm text-gray-700 font-semibold">รับของรางวัล</p>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">กลุ่ม</h4>
                  <p className="text-sm text-gray-700 font-semibold">เข้าร่วมกลุ่ม</p>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="elevated" padding="lg" className="border-3 border-gray-300">
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">อีเวนต์</h4>
                  <p className="text-sm text-gray-700 font-semibold">กิจกรรมพิเศษ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Challenge - High Contrast */}
        <Card variant="elevated" padding="xl" className="mb-6 border-3 border-gray-300">
          <CardContent>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">ชาเลนจ์ประจำสัปดาห์</h3>
              <div className="mb-4">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-700 mb-3 font-semibold">ทำงานให้ครบ 50 งานในสัปดาห์นี้</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-base text-gray-700 font-semibold">34/50 งาน (68%)</p>
              </div>
              <Button className="w-full h-14 text-lg font-bold" size="lg">
                <Trophy className="w-5 h-5 mr-2" />
                ดูรางวัล
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="community" />
    </div>
  );
}