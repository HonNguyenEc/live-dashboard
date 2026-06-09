# Real-Time Sales Dashboard

Dashboard bán hàng real-time mô phỏng Power BI, xây bằng **Next.js 14 (App Router) + TypeScript + Tailwind + Recharts**. Dữ liệu đọc trực tiếp từ file Excel ở server bằng SheetJS. Có đăng nhập/đăng xuất, 3 KPI card, 2 slicer (Platform, Brand) kiểu Power BI và 1 combo chart (cột cụm theo platform + đường Gross Orders, 2 trục Y).

## Yêu cầu

- Node.js 18.17+ (khuyến nghị 20+)

## Cài đặt

```bash
npm install
```

## Dữ liệu

File Excel nguồn đặt tại `data/real_time_sales_with_platform.xlsx`, đọc sheet **"Real-Time Data"** với các cột:
`platform | brand | created_date | hour | gmv | gross_order`.

> Đổi tên/sheet file trong `src/config/app.config.ts` (`data.fileName`, `data.sheetName`) nếu cần.

## Chạy

```bash
npm run dev
```

Mở http://localhost:3000 → tự chuyển tới `/dashboard` (nếu chưa đăng nhập sẽ về `/login`).

Build production:

```bash
npm run build && npm start
```

## Tài khoản đăng nhập

Mật khẩu tất cả là `123456`:

- `admin@ecentric.vn`
- `subaccount@ecentric.vn`
- `usertest@ecentric.vn`

## Cách dùng slicer (giống Power BI)

- **Click** vào 1 giá trị: chọn **duy nhất** giá trị đó (bỏ chọn nếu nó đang là lựa chọn duy nhất).
- **Shift + click**: thêm/bớt giá trị vào multi-selection.
- Không chọn gì = hiển thị **tất cả**.
- KPI và chart cập nhật **tức thì** khi đổi slicer (lọc/aggregate ở client).

## Cấu trúc chính

```
data/                         # file Excel nguồn
src/
  app/                        # routes (App Router) + API routes
    api/sales|auth/...        # đọc Excel, login, logout
    dashboard/ login/         # trang
  components/                 # common, layout, auth, dashboard (KPI/Slicers/Chart)
  config/app.config.ts        # appName, theme, định nghĩa KPI, tên file data
  constants/                  # USERS, cookie, platform/brand, màu
  lib/common/                 # format, cn, token (HMAC)
  modules/dashboard/          # types, utils (filter/measures/aggregate), hooks
  middleware.ts               # bảo vệ /dashboard, chặn /login khi đã đăng nhập
```
