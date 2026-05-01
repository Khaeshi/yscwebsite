## **Phase 1 implemented (Roles + Teacher management + Onboarding)**

### **What’s done**

- **Lucia user attributes expanded** in `src/lib/auth.ts`
  - Exposes `email`, `role`, `name`, `phone`, `isApproved`
  - Updates internal mapping from DB `users` collection
- **Route protection updated** in `src/middleware.ts`
  - `/admin/login` public
  - **Teachers** only allowed into `/admin/teacher/`* (+ `/admin/onboarding`, `/admin/logout`)
  - **Unapproved teachers** get redirected to `/admin/onboarding`
  - **Admins/Superadmins** can access all `/admin/`*
- **Teacher management APIs added**
  - `src/pages/api/teachers/index.ts`:
    - `GET` list teachers (admin/superadmin only)
    - `POST` create teacher (argon2id hash via `oslo/password`)
  - `src/pages/api/teachers/[id].ts`:
    - `PUT` update teacher fields
    - `PATCH` approve/suspend (`isApproved`, `approvedAt`, `approvedBy`)
    - `DELETE` remove teacher
- **Pages added**
  - `src/pages/admin/teachers.astro` (admin/superadmin): list + invite + approve/suspend/delete
  - `src/pages/admin/onboarding.astro` (teacher): first-login profile completion (name/phone)
  - `src/pages/admin/teacher/dashboard.astro` (teacher): placeholder page so teacher logins don’t dead-end (Phase 3 will replace with attendance dashboard)

### **Small consistency fixes**

- `src/layouts/AdminLayout.astro` now displays `user.name` (fallback to email).
- `src/env.d.ts` and `src/types/api.ts` updated to match the new user shape.
- `src/lib/db/client.ts` now uses `import.meta.env.MONGODB_URI` (so it works in Vite SSR).

### **Verification**

- **Build passes** with `npm run build` after installing deps.

**Phase 2 completed (Schedules: model + API + UI)**

### **What changed**

- **New Schedule schema (Phase 2)** in `src/lib/db/models/Schedule.ts`
  - Adds `teacherId`, `subject`, `dayOfWeek: number[]`, `durationMinutes`, `repeatWeekly`, `startDate`, `endDate`, `isActive`, `chatbotTemplate`
- **Role-scoped schedule API**
  - `src/pages/api/schedules/index.ts`
    - `GET`: teacher → only own (`teacherId = locals.user.id`), admin → all (optional `?teacherId=...`)
    - `POST`: teacher can only create under themselves; admin can create for any `teacherId`
  - `src/pages/api/schedules/[id].ts`
    - `GET/PUT/DELETE`: teacher restricted to own schedules
    - `DELETE` is **soft delete** (`isActive=false`)
- **Middleware updated** (`src/middleware.ts`)
  - Teachers can now access `/admin/schedules` (and still `/admin/teacher/`*)
- **UI updated to new schema**
  - Refactored `src/components/admin/ScheduleManager.tsx` to the new fields (multi-day picker, template textarea, teacher dropdown for admins)
  - Added `src/pages/admin/teacher/schedules.astro` (teacher-friendly route that reuses the same manager)

### **Verified**

- `npm run build` passes with the Phase 2 changes.  
  
  
Phase 4 is done and verified.
  ### **Implemented**
  - **Payroll rate model**
    - Added `src/lib/db/models/PayrollRate.ts`
    - Fields: `teacherId`, `amountPerSession`, `currency`, `effectiveFrom`, `setBy`, timestamps
    - Index on `{ teacherId, effectiveFrom }`
    - Exported in `src/lib/db/models/index.ts`
  - **Payroll APIs**
    - Added `src/pages/api/payroll/rates.ts`
      - `GET`:
        - `?teacherId=` returns current rate for one teacher
        - no query returns all teachers with their current rate
      - `POST` (admin only): creates a **new** rate record (history preserved)
    - Added `src/pages/api/payroll/summary.ts`
      - `GET ?period=weekly|bimonthly|monthly&date=YYYY-MM-DD&teacherId=optional`
      - Computes `periodStart/periodEnd`
      - Pulls `AttendanceLog` with `status='attended'`
      - Resolves current rate per teacher
      - Returns per-teacher summaries + session breakdown
  - **Payroll admin page**
    - Added `src/pages/admin/payroll.astro`
    - Features:
      - Period tabs (Weekly / Bi-monthly / Monthly)
      - Prev/next period navigation + anchor date input
      - Summary cards (teachers, sessions, total due)
      - Table (teacher, sessions, rate, total)
      - Expandable per-teacher breakdown rows
      - Set Rate modal (posts to `/api/payroll/rates`)
      - CSV export for current period
  - **Admin nav updates**
    - Updated `src/layouts/AdminLayout.astro` with links for:
      - `Teachers`
      - `Attendance`
      - `Payroll`
  ### **Validation**
  - Lint diagnostics: clean on edited files
  - Build: `npm run build` passed

