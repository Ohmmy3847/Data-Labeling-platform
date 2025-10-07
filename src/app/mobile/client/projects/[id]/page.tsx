'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Users, TrendingUp, DollarSign, Calendar,
  CheckCircle, Clock, AlertCircle, BarChart3, Target,
  Award, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data - ในระบบจริงจะดึงจาก API
const mockProjects = [
  {
    id: 'p1',
    title: 'แปลความรู้สึกจากความคิดเห็น',
    description: 'ระบุความรู้สึกจากข้อความภาษาไทย',
    taskType: 'sentiment',
    status: 'active' as const,
    totalItems: 5000,
    completedItems: 3456,
    rewardPerLabel: 0.15,
    currentAccuracy: 94,
    targetAccuracy: 90,
    activelabelers: 234,
    createdAt: '2025-09-15',
    deadline: '2025-10-20',
  },
  {
    id: 'p2',
    title: 'ตรวจจับวัตถุในรูปภาพ',
    description: 'ตีกรอบวัตถุในภาพอาหารไทย',
    taskType: 'bbox',
    status: 'active' as const,
    totalItems: 3000,
    completedItems: 2780,
    rewardPerLabel: 0.50,
    currentAccuracy: 96,
    targetAccuracy: 95,
    activelabelers: 156,
    createdAt: '2025-09-01',
    deadline: '2025-10-15',
  },
  {
    id: 'p3',
    title: 'จับคู่คำถาม-คำตอบ',
    description: 'ตรวจสอบความถูกต้องของคำตอบ',
    taskType: 'qa',
    status: 'pending' as const,
    totalItems: 2000,
    completedItems: 0,
    rewardPerLabel: 0.25,
    currentAccuracy: 0,
    targetAccuracy: 92,
    activelabelers: 0,
    createdAt: '2025-10-01',
    deadline: '2025-11-15',
  },
  {
    id: 'p4',
    title: 'จำแนกประเภทข้อความ',
    description: 'แบ่งหมวดหมู่ข้อความข่าว',
    taskType: 'classification',
    status: 'completed' as const,
    totalItems: 4000,
    completedItems: 4000,
    rewardPerLabel: 0.12,
    currentAccuracy: 97,
    targetAccuracy: 90,
    activelabelers: 0,
    createdAt: '2025-08-01',
    deadline: '2025-09-30',
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="max-w-2xl mx-auto pt-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-800 mb-2">ไม่พบโปรเจกต์</h1>
          <p className="text-green-600 mb-6">โปรเจกต์ที่คุณค้นหาไม่มีในระบบ</p>
          <Button variant="primary" onClick={() => router.push('/mobile/client')}>
            กลับหน้าหลัก
          </Button>
        </div>
      </div>
    );
  }

  const progress = Math.round((project.completedItems / project.totalItems) * 100);
  const totalCost = project.completedItems * project.rewardPerLabel;
  const estimatedTotalCost = project.totalItems * project.rewardPerLabel;
  const remainingCost = estimatedTotalCost - totalCost;
  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-green-100 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-green-100 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-green-800" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-green-800 truncate">{project.title}</h1>
              <p className="text-sm text-green-600">{project.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-sm font-medium flex-shrink-0 ${
              project.status === 'active' ? 'bg-green-100 text-green-700' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 
              'bg-yellow-100 text-yellow-700'
            }`}>
              {project.status === 'active' ? 'กำลังรัน' : 
               project.status === 'completed' ? 'สำเร็จ' : 'รอเริ่ม'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Section */}
        <Card variant="gradient" padding="lg">
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">ความคืบหน้า</span>
                <span className="text-2xl font-bold text-green-800">{progress}%</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all ${
                    progress === 100 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700">
                  {project.completedItems.toLocaleString()} / {project.totalItems.toLocaleString()} งาน
                </span>
                <span className="text-green-700 font-medium">
                  เหลืออีก {(project.totalItems - project.completedItems).toLocaleString()} งาน
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">฿{totalCost.toFixed(0)}</div>
                <div className="text-xs text-green-600 mb-1">ค่าใช้จ่ายแล้ว</div>
                <div className="text-xs text-green-500">เหลือ ฿{remainingCost.toFixed(0)}</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">{project.activelabelers}</div>
                <div className="text-xs text-green-600 mb-1">ปู่ย่ากำลังทำ</div>
                <div className="text-xs text-green-500">Active Now</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">{project.currentAccuracy}%</div>
                <div className="text-xs text-green-600 mb-1">ความแม่นยำ</div>
                <div className="text-xs text-green-500">เป้า {project.targetAccuracy}%</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">{daysLeft > 0 ? daysLeft : 0}</div>
                <div className="text-xs text-green-600 mb-1">วันที่เหลือ</div>
                <div className="text-xs text-green-500">ถึง {new Date(project.deadline).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <Card variant="soft" padding="lg">
          <CardHeader>
            <CardTitle>รายละเอียดโปรเจกต์</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <span className="text-sm text-green-600">ประเภทงาน</span>
                <span className="text-sm font-medium text-green-800">
                  {project.taskType === 'sentiment' ? 'วิเคราะห์ความรู้สึก' :
                   project.taskType === 'bbox' ? 'ตีกรอบวัตถุ' :
                   project.taskType === 'qa' ? 'ถาม-ตอบ' : 'จำแนกประเภท'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <span className="text-sm text-green-600">รางวัลต่องาน</span>
                <span className="text-sm font-medium text-green-800">฿{project.rewardPerLabel.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <span className="text-sm text-green-600">งบประมาณรวม</span>
                <span className="text-sm font-medium text-green-800">฿{estimatedTotalCost.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <span className="text-sm text-green-600">เริ่มโปรเจกต์</span>
                <span className="text-sm font-medium text-green-800">
                  {new Date(project.createdAt).toLocaleDateString('th-TH', { 
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-green-600">กำหนดเสร็จ</span>
                <span className="text-sm font-medium text-green-800">
                  {new Date(project.deadline).toLocaleDateString('th-TH', { 
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card variant="soft" padding="lg">
          <CardHeader>
            <CardTitle>ภาพรวมประสิทธิภาพ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-1">ความแม่นยำสูง</h4>
                  <p className="text-sm text-green-600">
                    ความแม่นยำปัจจุบัน {project.currentAccuracy}% 
                    {project.currentAccuracy >= project.targetAccuracy ? ' เกินเป้าหมาย' : ' ใกล้เป้าหมาย'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-1">อัตราความสำเร็จ</h4>
                  <p className="text-sm text-green-600">
                    ทำงานไปแล้ว {progress}% อยู่ในกำหนดการที่ดี
                  </p>
                </div>
              </div>

              {project.status === 'active' && daysLeft < 7 && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800 mb-1">ใกล้ครบกำหนด</h4>
                    <p className="text-sm text-green-600">
                      เหลือเวลาอีก {daysLeft} วัน ควรเร่งทำให้เสร็จ
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" fullWidth>
            <BarChart3 className="w-5 h-5 mr-2" />
            ดูสถิติ
          </Button>
          <Button variant="outline" size="lg" fullWidth>
            <Award className="w-5 h-5 mr-2" />
            ผู้ทำงาน
          </Button>
        </div>
      </div>
    </div>
  );
}
