'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Gift, Copy, Share2, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LABELER_REWARDS } from '@/config/rewardsConfig';

export default function ReferralsPage() {
  const referralCode = 'PANPAN2024';
  const referralLink = `https://labellink.app/ref/${referralCode}`;
  
  const stats = {
    totalReferrals: LABELER_REWARDS.referrals.total,
    activeReferrals: LABELER_REWARDS.referrals.active,
    totalEarned: LABELER_REWARDS.referrals.totalEarned,
    pending: LABELER_REWARDS.referrals.pending
  };

  const referrals = [
    { name: 'คุณสมชาย', joined: '5 วันที่แล้ว', tasks: 45, earned: 60, status: 'active' },
    { name: 'คุณสมหญิง', joined: '1 สัปดาห์ที่แล้ว', tasks: 32, earned: 40, status: 'active' },
    { name: 'คุณวิชัย', joined: '2 สัปดาห์ที่แล้ว', tasks: 28, earned: 35, status: 'active' },
    { name: 'คุณมาลี', joined: '3 สัปดาห์ที่แล้ว', tasks: 15, earned: 20, status: 'pending' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('คัดลอกลิงก์แล้ว!');
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'มาทำงานกับน้องปันปันกันเถอะ!',
        text: `รายได้เสริมสำหรับปู่ย่า ใช้โค้ดของผม/ฉันรับโบนัส ฿${LABELER_REWARDS.referrals.bonusPerReferral} เลย!`,
        url: referralLink
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Link href="/mobile/labeler/profile">
            <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">แนะนำเพื่อน</h1>
          <div className="w-12"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/95">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-pink-600" />
                <span className="text-sm text-gray-600">เพื่อนทั้งหมด</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalReferrals}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">รายได้รวม</span>
              </div>
              <div className="text-3xl font-bold text-green-600">฿{stats.totalEarned}</div>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Referral Code Card */}
        <Card className="border-4 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">โค้ดแนะนำของคุณ</h2>
            
            <div className="bg-white rounded-2xl p-4 mb-4 border-2 border-pink-200">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">โค้ด</div>
                <div className="text-3xl font-bold text-pink-600 tracking-wider mb-3">{referralCode}</div>
                <div className="text-xs text-gray-500 break-all px-4">{referralLink}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={copyToClipboard}
                className="py-3 bg-blue-600 text-white rounded-xl font-bold"
              >
                <Copy className="w-5 h-5 mr-2" />
                คัดลอก
              </Button>
              <Button 
                onClick={shareReferral}
                className="py-3 bg-green-600 text-white rounded-xl font-bold"
              >
                <Share2 className="w-5 h-5 mr-2" />
                แชร์
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <CardContent className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              วิธีรับรางวัล
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">แชร์โค้ด</div>
                  <div className="text-sm text-gray-600">ส่งโค้ดให้เพื่อนของคุณ</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">เพื่อนสมัคร</div>
                  <div className="text-sm text-gray-600">เพื่อนสมัครด้วยโค้ดของคุณ</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">รับรางวัล</div>
                  <div className="text-sm text-gray-600">
                    คุณได้ ฿{LABELER_REWARDS.referrals.bonusPerReferral} เมื่อเพื่อนทำงานครบ {LABELER_REWARDS.referrals.tasksRequired} งาน
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Breakdown */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">รายได้จากการแนะนำ</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">฿{stats.totalEarned}</div>
                <div className="text-sm text-gray-600">รับแล้ว</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">฿{stats.pending}</div>
                <div className="text-sm text-gray-600">รอรับ</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral List */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">เพื่อนที่แนะนำ ({stats.totalReferrals})</h3>
            
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {referral.name.charAt(2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{referral.name}</div>
                      <div className="text-sm text-gray-600">{referral.joined} • {referral.tasks} งาน</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+฿{referral.earned}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      referral.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {referral.status === 'active' ? 'ทำงาน' : `รออีก ${LABELER_REWARDS.referrals.tasksRequired - referral.tasks} งาน`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bonus Info */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 text-white mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">โบนัสพิเศษ!</h3>
            <p className="text-white/90 mb-1">แนะนำครบ 20 คน</p>
            <p className="text-2xl font-bold text-white">รับโบนัสเพิ่ม ฿500</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
