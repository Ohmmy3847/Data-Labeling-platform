# Shared Components

Shared components สำหรับ LabelLink Mobile App เพื่อให้ UI ทุกหน้าเป็นไปในทิศทางเดียวกัน

## Components

### 1. TaskSummary
หน้าสรุปผลงานหลังจากทำงานเสร็จ

**Usage:**
```tsx
import TaskSummary from '@/components/shared/TaskSummary';

<TaskSummary
  taskResult={{
    completed: 10,
    total: 10,
    earnings: 1.20,
    completedAt: '2025-10-07 14:30'
  }}
  taskInfo={{
    name: 'การวิเคราะห์ความรู้สึก',
    description: 'การวิเคราะห์ความรู้สึก',
    emoji: '🎉',
    color: 'blue',
    unit: 'ข้อ',
    rate: 0.12
  }}
  onReset={() => {}}
/>
```

### 2. TaskHeader
Header สำหรับหน้า task แต่ละหน้า

**Usage:**
```tsx
import TaskHeader from '@/components/shared/TaskHeader';

<TaskHeader
  title="วิเคราะห์ความรู้สึก"
  reward="฿0.12 / ข้อ"
  color="blue"
  completedCount={5}
  totalCount={10}
/>
```

### 3. BottomNavigation
Navigation ด้านล่างสำหรับ**ทุกหน้า** - ใช้แทน bottom nav เก่าทั้งหมด

**Usage:**
```tsx
import BottomNavigation from '@/components/shared/BottomNavigation';

// ใช้ใน component ใดก็ได้
<BottomNavigation currentPage="home" />
<BottomNavigation currentPage="tasks" />
<BottomNavigation currentPage="summary" />
<BottomNavigation currentPage="community" />
<BottomNavigation currentPage="profile" />
```

**Pages:**
- `home` - หน้าหลัก `/mobile/labeler`
- `tasks` - หน้างาน `/mobile/labeler/tasks`
- `summary` - หน้าสรุป `/mobile/labeler/summary`
- `community` - หน้าชุมชน `/mobile/labeler/community`
- `profile` - หน้าฉัน `/mobile/labeler/profile`

## Theme Colors

- **🔵 blue**: T1 (วิเคราะห์ความรู้สึก)
- **🟣 purple**: T2 (ติดป้ายรูปภาพ)
- **🟠 orange**: T3 (ประเมินการสนทนา)
- **🌊 teal**: T10 (วาดกรอบวัตถุ)
- **🟡 yellow**: T11 (จัดกลุ่มเสียง)
- **🟢 green**: T12 (รวบรวมข้อมูล)

## Task Config

ใช้ `/src/config/taskConfig.ts` สำหรับจัดเก็บข้อมูล configuration ของแต่ละ task

```tsx
import { TASK_CONFIGS } from '@/config/taskConfig';

const config = TASK_CONFIGS.t1;
```

## การใช้งาน

1. **ทุกหน้าต้องมี BottomNavigation** - แทนที่ bottom nav เก่าทั้งหมด
2. Import shared components แทนการเขียน UI ซ้ำ
3. ใช้ TaskConfig สำหรับข้อมูล configuration
4. ใช้สีตาม theme ที่กำหนด

## ข้อดี

- ✅ **UI สอดคล้องกันทุกหน้า** - BottomNavigation เหมือนกันทุกที่
- ✅ **แก้ไขที่เดียว แก้ทุกที่** - เปลี่ยน component แก้ทุกหน้า
- ✅ **ลดโค้ดซ้ำ** - ไม่ต้องเขียน bottom nav ใหม่ทุกหน้า
- ✅ **Maintainable** - จัดการง่าย
- ✅ **Scalable** - เพิ่มหน้าใหม่ใช้ component เดียวกัน

## หน้าที่อัปเดตแล้ว

- ✅ `/mobile/labeler` - Home
- ✅ `/mobile/labeler/tasks` - Tasks  
- ✅ `/mobile/labeler/summary` - Summary
- ✅ `/mobile/labeler/community` - Community
- ✅ `/mobile/labeler/profile` - Profile
- ✅ Task pages: T1, T2, T10 - Individual task pages