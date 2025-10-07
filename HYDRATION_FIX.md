# 🔧 Fix: Hydration Mismatch Error - Task Names

## ❌ ปัญหาเดิม
```
Hydration failed because the server rendered text didn't match the client.
- อัดเสียง (client)
+ จัดกลุ่มเสียง (server)
```

## 🔍 สาเหตุ
- **taskConfig.ts**: อัพเดท t11 เป็น "การบันทึกเสียง" 
- **tasks/page.tsx**: ยังใช้ hardcode "อัดเสียง" ใน `taskTypeNames`
- **Server vs Client**: ข้อมูลไม่ตรงกันทำให้เกิด hydration error

## ✅ วิธีแก้ไข

### 1. Import TASK_CONFIGS
```typescript
import { TASK_CONFIGS } from '@/config/taskConfig';
```

### 2. ลบ hardcode taskTypeNames
```typescript
// ❌ เก่า: hardcode
const taskTypeNames = {
  'audio-classification': 'อัดเสียง', // ไม่ sync กับ config
};

// ✅ ใหม่: dynamic function
const getTaskDisplayName = (taskId: string, type: string) => {
  const config = TASK_CONFIGS[taskId as keyof typeof TASK_CONFIGS];
  if (config) {
    return config.name; // จาก config: "การบันทึกเสียง"
  }
  return fallbackNames[type] || 'งานใหม่';
};
```

### 3. ใช้ function แทน hardcode
```typescript
// ❌ เก่า
{taskTypeNames[task.type]}

// ✅ ใหม่
{getTaskDisplayName(task.id, task.type)}
```

## 🎯 ผลลัพธ์
- **Single Source of Truth**: ข้อมูลมาจาก `TASK_CONFIGS` เท่านั้น
- **ไม่มี Hydration Error**: Server และ Client ใช้ข้อมูลเดียวกัน
- **Auto Sync**: เปลี่ยน taskConfig แล้ว UI อัพเดทตาม
- **Fallback**: รองรับ task ที่ยังไม่มีใน config

## 📝 Task Names ปัจจุบัน
- **t1**: การวิเคราะห์ความรู้สึก
- **t2**: การติดป้ายรูปภาพ  
- **t3**: การประเมินการสนทนา
- **t10**: การวาดกรอบวัตถุ
- **t11**: การบันทึกเสียง ✨ (เปลี่ยนจาก "จัดกลุ่มเสียง")

## 🚀 การทำงาน
ตอนนี้ระบบจะ:
1. อ่านชื่องานจาก `TASK_CONFIGS[taskId].name`
2. แสดงชื่อที่ถูกต้องทั้ง server และ client
3. ไม่มี hydration mismatch error อีกต่อไป!