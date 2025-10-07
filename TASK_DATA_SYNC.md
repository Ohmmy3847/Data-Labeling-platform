# 🔄 Task Data Synchronization

## ปัญหาเดิม
- `mockData.ts` มีข้อมูลงานที่ไม่ตรงกับงานจริงในแอป
- มีข้อมูล task types ที่ไม่มีหน้างานจริง (multi-turn-dialogue, rlhf-tuning, etc.)
- ค่า reward และ configuration ไม่ sync กันระหว่าง mockData กับ taskConfig

## วิธีแก้ไขใหม่ ✅

### 1. Import taskConfig เข้า mockData
```typescript
import { TASK_CONFIGS } from '@/config/taskConfig';
```

### 2. ใช้ค่าจาก taskConfig ใน mockTasks
```typescript
reward: TASK_CONFIGS.t1.rate,  // แทนการ hardcode
```

### 3. ปรับปรุงข้อมูลให้สอดคล้องกับแอปจริง
- ลบ task types ที่ไม่มีหน้างาน
- ใช้เฉพาะ: `text-sentiment`, `image-tagging`, `chat-qa`, `audio-classification`, `bounding-box`
- ปรับเนื้อหาให้เป็นภาษาไทยและเหมาะสมกับบริบท

### 4. เพิ่มฟังก์ชัน generateAvailableTasks()
```typescript
export const generateAvailableTasks = () => {
  return Object.keys(TASK_CONFIGS).map(taskId => {
    // สร้าง task data จาก config อัตโนมัติ
  });
};
```

## ผลลัพธ์ 🎯

### ข้อดี:
- **Single Source of Truth**: ค่า rate และ config มาจาก taskConfig เท่านั้น
- **ไม่ซ้ำซ้อน**: แก้ที่เดียว ใช้ได้ทุกที่
- **สอดคล้องกัน**: mockData ตรงกับแอปจริง
- **ง่ายต่อการบำรุงรักษา**: เพิ่ม task ใหม่ที่ taskConfig ก็พอ

### การใช้งาน:
```typescript
// ใช้ mock data แบบเดิม
const tasks = mockTasks;

// หรือใช้ dynamic generation
const availableTasks = generateAvailableTasks();
```

## สรุป
ตอนนี้ไม่ต้องแก้ซ้ำซ้อนแล้ว! เพียงแก้ `taskConfig.ts` ไฟล์เดียว `mockData.ts` จะ sync ตามอัตโนมัติ ✨