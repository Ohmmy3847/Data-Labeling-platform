'use client';

import Link from 'next/link';
import { ArrowLeft, Wallet, TrendingUp, Clock, AlertCircle, Download, CreditCard, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LABELER_REWARDS, WITHDRAWAL_CONFIG } from '@/config/rewardsConfig';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Link href="/mobile/labeler/profile">
              <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-white">กระเป๋าเงิน</h1>
            <div className="w-12"></div>
          </div>

          {/* Balance Card */}
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="p-5">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Wallet className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-medium text-sm">ยอดคงเหลือ</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-3 break-words">
                  ฿{LABELER_REWARDS.currentBalance.toFixed(2)}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-left">
                    <div className="text-xs text-gray-600">รายได้เดือนนี้</div>
                    <div className="text-lg font-bold text-green-600 break-words">+฿{LABELER_REWARDS.earnings.thisMonth.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">ถอนแล้ว</div>
                    <div className="text-lg font-bold text-gray-900 break-words">฿{LABELER_REWARDS.earnings.withdrawn.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-lg">
            <Download className="w-5 h-5 mr-2" />
            ถอนเงิน
          </Button>
          <Button variant="outline" className="py-4 border-2 border-blue-500 text-blue-600 rounded-2xl font-bold">
            <TrendingUp className="w-5 h-5 mr-2" />
            ประวัติ
          </Button>
        </div>

        {/* Withdraw Info */}
        <Card className="border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-gray-900 mb-1">การถอนเงิน</div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  • ถอนขั้นต่ำ ฿{WITHDRAWAL_CONFIG.minimum}<br />
                  • ได้รับเงินภายใน {WITHDRAWAL_CONFIG.processingDays} วันทำการ<br />
                  • ไม่มีค่าธรรมเนียม
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">บัญชีธนาคาร</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">ธนาคารกรุงเทพ</div>
                    <div className="text-sm text-gray-600">xxx-x-xxxxx-0</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 rounded-full">
                  <span className="text-xs font-bold text-green-700">หลัก</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-600">เพิ่มบัญชีธนาคาร</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">ธุรกรรมล่าสุด</h2>
              <Link href="/mobile/labeler/history" className="text-blue-600 text-sm font-medium">
                ดูทั้งหมด
              </Link>
            </div>
            
            <div className="space-y-3">
              {[
                { type: 'รายได้', task: 'งานแปลข้อความ (t1)', amount: '+฿12.50', date: 'วันนี้', time: '14:30', color: 'green' },
                { type: 'รายได้', task: 'งานอ่านออกเสียง (t2)', amount: '+฿25.00', date: 'วันนี้', time: '12:15', color: 'green' },
                { type: 'ถอนเงิน', task: 'ธนาคารกรุงเทพ', amount: '-฿500.00', date: 'เมื่อวาน', time: '09:00', color: 'blue' },
                { type: 'รายได้', task: 'งานแท็กรูปภาพ (t3)', amount: '+฿8.00', date: '2 วันที่แล้ว', time: '16:45', color: 'green' },
                { type: 'รายได้', task: 'งานบันทึกเสียง (t11)', amount: '+฿0.25', date: '3 วันที่แล้ว', time: '11:20', color: 'green' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${transaction.color}-100 rounded-xl flex items-center justify-center`}>
                      {transaction.type === 'ถอนเงิน' ? (
                        <Download className={`w-5 h-5 text-${transaction.color}-600`} />
                      ) : (
                        <TrendingUp className={`w-5 h-5 text-${transaction.color}-600`} />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{transaction.task}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {transaction.date} • {transaction.time}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${transaction.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earning Stats */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">สถิติรายได้</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{LABELER_REWARDS.tasks.completed}</div>
                <div className="text-sm text-white/80">งานสำเร็จ</div>
              </div>
              <div className="text-center border-l border-r border-white/30">
                <div className="text-2xl font-bold text-white">฿{LABELER_REWARDS.earnings.avgPerTask}</div>
                <div className="text-sm text-white/80">เฉลี่ย/งาน</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{LABELER_REWARDS.tasks.workingDays}</div>
                <div className="text-sm text-white/80">วันทำงาน</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
