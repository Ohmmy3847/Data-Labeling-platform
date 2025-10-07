/**
 * Rewards and Earnings Configuration
 * แก้ไขที่นี่ที่เดียว จะเปลี่ยนทั้งระบบ
 */

// ข้อมูลปู่ย่า (Labeler)
export const LABELER_REWARDS = {
  // ยอดเงินปัจจุบัน
  currentBalance: 2450.50,
  
  // รายได้
  earnings: {
    today: 45.60,
    thisMonth: 850.00,
    withdrawn: 1600.50,
    totalEarned: 2450.50, // รายได้สะสมทั้งหมด
    avgPerTask: 9.94,
    avgPerDay: 350, // เฉลี่ย/วัน
    avgPerDayMin: 200, // ต่ำสุด/วัน
    avgPerDayMax: 500, // สูงสุด/วัน
    avgPerMonthMin: 5000, // ต่ำสุด/เดือน
    avgPerMonthMax: 15000, // สูงสุด/เดือน
  },
  
  // งาน
  tasks: {
    today: 8,
    completed: 247,
    thisWeek: 15,
    thisMonth: 62,
    workingDays: 32,
  },
  
  // สถิติ
  stats: {
    accuracy: 96.5,
    currentStreak: 7,
    longestStreak: 15,
    bestDayTasks: 8,
  },
  
  // แต้มสะสม
  points: {
    current: 2450,
    nextTier: 3000,
    perTask: 10,
    perDailyLogin: 5,
    perReferral: 100,
  },
  
  // การแนะนำเพื่อน
  referrals: {
    total: 12,
    active: 8,
    totalEarned: 480,
    pending: 120,
    bonusPerReferral: 50,
    tasksRequired: 10, // เพื่อนต้องทำ 10 งานจึงจะได้โบนัส
    specialBonus20Friends: 500, // โบนัสพิเศษแนะนำครบ 20 คน
  },
} as const;

// รางวัลที่แลกได้ (Rewards)
export const AVAILABLE_REWARDS = [
  { id: 1, name: 'ส่วนลด 7-Eleven ฿20', points: 200, type: 'voucher' as const, color: 'green' as const },
  { id: 2, name: 'ส่วนลด Lotus ฿50', points: 500, type: 'voucher' as const, color: 'blue' as const },
  { id: 3, name: 'เงินโบนัส ฿100', points: 1000, type: 'cash' as const, color: 'purple' as const },
  { id: 4, name: 'ส่วนลด Big C ฿100', points: 1000, type: 'voucher' as const, color: 'orange' as const },
  { id: 5, name: 'เงินโบนัส ฿200', points: 2000, type: 'cash' as const, color: 'pink' as const },
  { id: 6, name: 'ส่วนลด Central ฿500', points: 5000, type: 'voucher' as const, color: 'yellow' as const },
] as const;

// ข้อมูลบริษัท (Client)
export const CLIENT_STATS = {
  projects: {
    total: 12,
    active: 3,
    completed: 9,
  },
  
  labelers: {
    total: 145,
  },
  
  budget: {
    totalSpent: 1250000,
  },
  
  quality: {
    average: 96.5,
  },
} as const;

// การถอนเงิน
export const WITHDRAWAL_CONFIG = {
  minimum: 100, // ฿100 ขั้นต่ำ
  processingDays: '1-3', // วันทำการ
  fee: 0, // ไม่มีค่าธรรมเนียม
} as const;

// โบนัสพิเศษ
export const SPECIAL_BONUSES = {
  firstTaskBonus: 50,
  hundredTasksBonus: 200,
  referral20Bonus: 500,
  dailyLoginBonus: 10,
  weeklyStreakBonus: 50,
  referralSignupBonus: 100,
  dailyChallengeBonus: 50, // โบนัสทำครบ 10 งาน/วัน
  dailyChallengeTarget: 10, // จำนวนงานเป้าหมาย/วัน
} as const;
