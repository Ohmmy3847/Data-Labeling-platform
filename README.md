# 🏷️ LabelLink - แพลตฟอร์มจ้างงาน Data Labeling สำหรับปู่ย่าและผู้สูงอายุ

แพลตฟอร์ม Mobile-First สำหรับเชื่อมโยงปู่ย่า ผู้สูงอายุ และผู้พิการ กับงาน Data Labeling ที่เหมาะสม ออกแบบให้ใช้งานง่าย ตัวอักษรใหญ่ ปุ่มชัดเจน

## 🚀 3 ทางเข้าใช้งานระบบ

### 1. 👴👵 สำหรับปู่ย่า (Labeler) - ทำงานรับเงิน
```
เข้าผ่าน: /mobile/labeler
```
- ✅ รับงาน Label ข้อมูล (รูปภาพ, ข้อความ, เสียง)
- ✅ ดูรายได้และถอนเงิน
- ✅ ติดตามสถิติการทำงาน
- ✅ รับรางวัลและโบนัส
- ✅ แนะนำเพื่อนรับค่าคอมมิชชั่น

### 2. 🏢 สำหรับบริษัท (Client) - สร้างโปรเจค
```
เข้าผ่าน: /mobile/client
```
- ✅ สร้างโปรเจค Data Labeling
- ✅ เลือกประเภทงาน (Image, Text, Audio, Video)
- ✅ ติดตามความคืบหน้าโปรเจค
- ✅ ดูสถิติคุณภาพงาน
- ✅ จัดการงบประมาณ

### 3. 🏠 หน้าแรก - เลือกบทบาท
```
เข้าผ่าน: /mobile
```
- เลือกเข้าใช้งานในบทบาท Labeler หรือ Client

## 📋 ประเภทงานที่รองรับ

| ไอคอน | ประเภทงาน | รายละเอียด | ค่าจ้าง |
|------|-----------|-----------|---------|
| 🎉 | วิเคราะห์ความรู้สึก | อ่านข้อความแล้วบอกว่าเป็นความรู้สึกแบบไหน | ฿0.12/ข้อ |
| 🖼️ | ติดป้ายรูปภาพ | ดูรูปภาพแล้วบอกว่ามีอะไรอยู่ในรูป | ฿0.15/รูป |
| 💬 | ประเมินการสนทนา AI | ช่วยประเมินว่าคำตอบของ AI มีคุณภาพดีไหม | ฿0.25/คำถาม |
| 🎯 | วาดกรอบวัตถุ | วาดกรอบสี่เหลี่ยมรอบวัตถุในรูป | ฿0.50/วัตถุ |
| 🎤 | บันทึกเสียง | อ่านประโยคที่กำหนดให้แล้วกดบันทึกเสียง | ฿0.25/ประโยค |
| 📊 | รวบรวมข้อมูล | รวบรวมข้อมูลตามที่กำหนด เช่น ค้นหาราคาสินค้า | ฿1/5k คำ |

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (Card, Button, Input)
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>

# เข้าโฟลเดอร์โปรเจค
cd labellink

# ติดตั้ง dependencies
npm install

# รันโปรเจค
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจค

```
labellink/
├── src/
│   ├── app/
│   │   ├── mobile/
│   │   │   ├── labeler/          # 👴 ระบบปู่ย่า
│   │   │   │   ├── page.tsx      # Dashboard
│   │   │   │   ├── tasks/        # งานต่างๆ (t1-t12)
│   │   │   │   ├── wallet/       # กระเป๋าเงิน
│   │   │   │   ├── rewards/      # รางวัล
│   │   │   │   ├── achievements/ # ความสำเร็จ
│   │   │   │   ├── referrals/    # แนะนำเพื่อน
│   │   │   │   └── ...
│   │   │   ├── client/           # 🏢 ระบบบริษัท
│   │   │   │   ├── page.tsx      # Dashboard
│   │   │   │   ├── projects/     # โปรเจค
│   │   │   │   ├── create-project/ # สร้างโปรเจค
│   │   │   │   └── ...
│   │   │   └── page.tsx          # เลือกบทบาท
│   ├── components/
│   │   ├── ui/                   # UI Components
│   │   └── shared/               # Shared Components
│   ├── config/
│   │   ├── rewardsConfig.ts      # 💰 Config เงินรางวัล
│   │   └── taskConfig.ts         # 📋 Config ประเภทงาน
│   └── data/
│       └── mockData.ts           # Mock data
└── public/
```

## ⚙️ Configuration Files

### 💰 Rewards Config (`src/config/rewardsConfig.ts`)
**แก้ที่เดียว เปลี่ยนทั้งระบบ!**

```typescript
export const LABELER_REWARDS = {
  currentBalance: 2450.50,      // ยอดเงินปัจจุบัน
  earnings: { ... },            // รายได้
  tasks: { ... },               // งาน
  stats: { ... },               // สถิติ
  points: { ... },              // แต้ม
  referrals: { ... }            // การแนะนำเพื่อน
}

export const SPECIAL_BONUSES = {
  firstTaskBonus: 50,           // โบนัสงานแรก
  hundredTasksBonus: 200,       // โบนัส 100 งาน
  dailyChallengeBonus: 50,      // โบนัสท้าทายประจำวัน
  // ...
}
```

### 📋 Task Config (`src/config/taskConfig.ts`)
```typescript
export const TASK_CONFIGS = {
  t1: { name, description, rate, emoji, color, ... },
  t2: { ... },
  // ...
}
```

## 🎨 Design System

- **ตัวอักษร**: ขนาดใหญ่ชัดเจน (text-lg, text-xl)
- **สี**: Contrast สูง เห็นง่าย
- **ปุ่ม**: ขนาดใหญ่ กดง่าย (h-12, h-16)
- **ไอคอน**: ขนาดใหญ่ ชัดเจน (w-6 h-6 ขึ้นไป)
- **Card**: มีเงา กรอบชัดเจน border-3
- **Navigation**: Bottom Navigation แบบ Mobile-First

## 🔑 Key Features

### สำหรับปู่ย่า (Labeler)
- ✅ ระบบจัดการงาน (Task Management)
- ✅ กระเป่าเงินและถอนเงิน (Wallet & Withdrawal)
- ✅ ระบบรางวัลและแต้มสะสม (Rewards & Points)
- ✅ การแนะนำเพื่อน (Referral System)
- ✅ สถิติและความสำเร็จ (Statistics & Achievements)
- ✅ ประวัติการทำงาน (Work History)
- ✅ ศูนย์ช่วยเหลือ (Help Center)

### สำหรับบริษัท (Client)
- ✅ สร้างและจัดการโปรเจค
- ✅ เลือกประเภทงาน Label
- ✅ ติดตามความคืบหน้า
- ✅ ดูสถิติคุณภาพ
- ✅ จัดการงบประมาณ

## 🚦 Getting Started - Quick Guide

### 1️⃣ เริ่มต้นใช้งาน
```bash
npm run dev
```

### 2️⃣ เข้าใช้งานตามบทบาท
- **ปู่ย่า**: http://localhost:3000/mobile/labeler
- **บริษัท**: http://localhost:3000/mobile/client
- **หน้าแรก**: http://localhost:3000/mobile

### 3️⃣ ทดสอบ Features
- ลองรับงาน Label ต่างๆ
- ทดสอบระบบกระเป๋าเงิน
- ดูระบบรางวัลและแต้ม
- สร้างโปรเจค (สำหรับ Client)

## 📝 Development Notes

### Single Source of Truth
ทุกค่าเงิน รางวัล สถิติ อยู่ใน `src/config/`:
- แก้ `rewardsConfig.ts` → เปลี่ยนทั้งระบบ
- แก้ `taskConfig.ts` → เปลี่ยนข้อมูลงานทั้งหมด

### Code Organization
- ✅ ไม่มี hardcoded values
- ✅ Components แยกเป็นสัดส่วน
- ✅ Shared components นำกลับมาใช้ได้
- ✅ Type safety ด้วย TypeScript

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

## 👥 Authors

LabelLink Team - แพลตฟอร์มจ้างงานสำหรับปู่ย่าและผู้สูงอายุ

---

**Made with ❤️ for Thai Seniors and Elderly**
