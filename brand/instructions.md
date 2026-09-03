# Project Brief — Interactive Marketing Pay-as-You-Go Website

## 1. Ý tưởng

Tôi muốn xây dựng một website đơn giản để cung cấp dịch vụ freelance/tự do trong lĩnh vực:

* Marketing
* Brand development
* Social media management
* Content
* Design
* Video
* Marketing consulting

Website hoạt động theo mô hình **Interactive Pay-as-You-Go / Build Your Own Marketing Package**.

Khách hàng không cần chọn một package cố định. Họ có thể:

1. Chọn ngân sách muốn chi.
2. Hệ thống tự đề xuất số lượng dịch vụ tương ứng.
3. Hoặc tự thay đổi số lượng từng hạng mục.
4. Giá được cập nhật realtime.
5. Ngược lại, khi khách thay đổi số lượng dịch vụ thì tổng ngân sách cũng tự cập nhật.

Mục tiêu là tạo UX giống một **marketing calculator**, càng đơn giản càng tốt.

---

# 2. Triết lý kỹ thuật

V1 KHÔNG cần backend/database/API.

Chỉ cần:

```text
pricing.csv
     ↓
build.py
     ↓
index.html
     ↓
JavaScript calculator
```

Website cuối cùng chỉ là static HTML/CSS/JS và có thể deploy lên Cloudflare Pages hoặc hosting static tương tự.

Tôi muốn `pricing.csv` là **single source of truth**.

Khi tôi thay đổi giá hoặc thông tin trong CSV:

```bash
python build.py
```

script sẽ đọc CSV và generate lại `index.html`.

Không cần sửa trực tiếp HTML để thay đổi giá.

---

# 3. Dịch vụ trên giao diện chính

Không muốn hiển thị quá nhiều dịch vụ vì sẽ làm khách mất tập trung.

Chỉ nên có khoảng 4–5 nhóm chính:

| Category   | Unit  |
| ---------- | ----- |
| Content    | post  |
| Design     | image |
| Video      | video |
| Management | hour  |
| Consulting | hour  |

Chi tiết các dịch vụ nhỏ hơn có thể được gộp bên trong category.

Ví dụ:

### Content

Có thể bao gồm social posts, captions, blog, scripts...

### Design

Có thể bao gồm social images, carousel, thumbnail, banner...

### Video

Có thể bao gồm TikTok/Reels/Shorts/video editing...

### Management

Social media management, scheduling, community management...

### Consulting

Marketing consulting, brand consulting, strategy...

---

# 4. Landing Page Design

Tôi cũng có thể nhận **Landing Page Design**.

Tuy nhiên không muốn đưa nó thành một category chính trong calculator vì đây là một project/deliverable đặc biệt.

Có thể đặt ở:

```text
Add-ons
```

hoặc:

```text
Need something else?
```

Ví dụ:

```text
Landing Page Design — from $XXX
```

---

# 5. CSV structure

CSV ban đầu có thể đơn giản như:

```csv
id,name,unit,price,min,max,weight,priority
content,Content,post,15,4,100,30,2
design,Design,image,10,4,100,15,1
video,Video,video,50,1,50,30,3
management,Management,hour,30,2,100,15,2
consulting,Consulting,hour,60,1,50,10,1
```

Các giá trên chỉ là giá mẫu, cần dễ dàng thay đổi.

Ý nghĩa:

* `id`: unique identifier
* `name`: tên hiển thị
* `unit`: đơn vị
* `price`: đơn giá
* `min`: số lượng tối thiểu
* `max`: số lượng tối đa
* `weight`: tỷ trọng khi hệ thống tự phân bổ ngân sách
* `priority`: mức ưu tiên khi tối ưu package

Có thể bổ sung:

```text
description
monthly_discount
```

nếu cần sau này.

---

# 6. Pricing model

V1 có thể sử dụng công thức đơn giản:

```text
total_price =
    content_quantity × content_price
  + design_quantity × design_price
  + video_quantity × video_price
  + management_hours × management_price
  + consulting_hours × consulting_price
```

Ví dụ:

```text
12 Content × $15 = $180
8 Design × $10   = $80
4 Video × $50    = $200
2 Management × $30 = $60
1 Consulting × $60 = $60

TOTAL = $580
```

Tất cả phải update realtime bằng JavaScript.

---

# 7. Interactive Mode A — Amount → Price

Khách có thể thay đổi số lượng từng hạng mục.

Ví dụ UI:

```text
CONTENT

0 ─────────●──────────── 30
           12 posts
                         $180


DESIGN

0 ───────●─────────────── 30
         8 images
                         $80


VIDEO

0 ─────●───────────────── 20
       4 videos
                         $200


MANAGEMENT

0 ───●─────────────────── 40
     5 months
                         $150


CONSULTING

0 ──●──────────────────── 20
    2 hours
                         $120


TOTAL
$730
```

Khi khách kéo slider:

```text
Video: 4 → 6
```

thì total price ngay lập tức thay đổi.

---

# 8. Interactive Mode B — Budget → Amount

Đây là feature quan trọng.

Cho khách nhập hoặc kéo:

```text
YOUR BUDGET

$100 ─────────●────────────── $2,000

              $500
```

Nếu khách chọn `$500`, hệ thống tự tạo một configuration hợp lý.

Ví dụ:

```text
Content       12 posts
Design         8 images
Video          4 videos
Management     2 months
Consulting     1 hour

TOTAL ≈ $500
```

Mục tiêu không phải chia đều tiền cho mọi category mà phải tạo một package hợp lý dựa trên:

* `weight`
* `priority`
* `min`
* `max`
* đơn giá

---

# 9. Budget allocation algorithm

Không nên làm đơn giản kiểu:

```text
Budget tăng 10%
→ mọi quantity tăng 10%
```

Thay vào đó sử dụng `weight`.

Ví dụ:

```text
Content       weight = 30
Design        weight = 15
Video         weight = 30
Management    weight = 15
Consulting    weight = 10
```

Tổng = 100.

Nếu budget = $500:

```text
Content       ≈ $150
Design        ≈ $75
Video         ≈ $150
Management    ≈ $75
Consulting    ≈ $50
```

Sau đó convert allocated budget thành quantity dựa trên unit price.

Ví dụ:

```text
Content:
$150 / $15 = 10 posts

Video:
$150 / $50 = 3 videos
```

Quantity phải là integer.

Phải đảm bảo:

```text
min <= quantity <= max
```

---

# 10. Better algorithm — nearest valid package

Tôi thích cách tiếp cận này hơn việc chỉ phân bổ budget theo percentage.

Với budget `B`, tìm:

```text
x1 = content quantity
x2 = design quantity
x3 = video quantity
x4 = management hours
x5 = consulting hours
```

sao cho:

```text
content_price × x1
+ design_price × x2
+ video_price × x3
+ management_price × x4
+ consulting_price × x5
```

gần với `B` nhất.

Đồng thời:

```text
min_i <= x_i <= max_i
```

và ưu tiên theo `weight` / `priority`.

Ví dụ:

```text
Budget = $500

Content       12 × $15 = $180
Design         8 × $10 = $80
Video          4 × $50 = $200
Management     1 × $30 = $30
Consulting     0 × $60 = $0

TOTAL = $490
```

Sau đó algorithm có thể thử thêm/bớt một unit để tìm configuration gần `$500` nhất.

Nếu tìm được đúng:

```text
TOTAL = $500
```

thì càng tốt.

---

# 11. Hai chiều phải đồng bộ

Đây là concept quan trọng nhất.

```text
             BUDGET
                ↕
        Budget Allocation
                ↕
        Service Quantities
                ↕
          Price Calculator
```

### Nếu user thay budget:

```text
$500 → $700
```

→ quantities tự thay đổi.

### Nếu user thay quantity:

```text
Video
4 → 6
```

→ budget tự thay đổi:

```text
$500 → $600
```

Tức là:

```text
Budget ↔ Configuration
```

luôn đồng bộ.

---

# 12. Smart adjustment

Khi khách đang có:

```text
Budget = $500

Content       12
Design         8
Video          4
Management     2h
Consulting     1h
```

Nếu khách tăng:

```text
Video
4 → 6
```

và tổng thành `$600`, có thể cho khách lựa chọn:

### Option A

```text
Increase budget to $600
```

### Option B

```text
Keep budget at $500
```

và hệ thống tự tối ưu lại các category khác:

```text
Video          6   +2
Content       10   -2
Design         7   -1
Management     2
Consulting     1
```

Mục tiêu là giữ budget gần `$500` nhưng ưu tiên thay đổi do user vừa thực hiện.

---

# 13. UI philosophy

Website không nên giống một bảng báo giá phức tạp.

Nó nên có cảm giác:

> "Tell me your budget and I'll show you what I can do."

Ví dụ:

```text
--------------------------------------------

        BUILD YOUR MARKETING PACKAGE

        How much do you want to invest?

$100 ─────────●──────────────── $2,000
              $500

        Here's what we can do:

        12 Content
         8 Designs
         4 Videos
         2h Management
         1h Consulting

              $500/month

        [ Get Started ]

--------------------------------------------
```

Sau đó khách có thể fine-tune từng category.

---

# 14. V1 cần ưu tiên

Không cần:

* Login
* Database
* Django
* React
* API
* Payment gateway
* User dashboard
* Marketplace
* Authentication

Chỉ cần:

```text
CSV
↓
Python build script
↓
Static HTML
↓
CSS
↓
JavaScript
↓
Interactive calculator
```

---

# 15. Future possibilities

Sau khi V1 hoạt động tốt, có thể mở rộng:

* Tier pricing
* Bulk discount
* Monthly packages
* One-time projects
* Add-ons
* Landing page design
* Custom requests
* Checkout
* Stripe/payment
* Order submission
* Customer database
* Freelancer marketplace

Nhưng chưa cần làm ở V1.

---

# 16. Core objective

Hãy tập trung xây dựng một website **rất đơn giản nhưng có UX tốt**.

Điểm khác biệt không phải là:

> "Tôi là một freelance marketer."

Mà là:

> **"Bạn có ngân sách bao nhiêu? Tôi sẽ biến ngân sách đó thành một marketing package cụ thể."**

Và khách có thể tương tác trực tiếp:

```text
Budget
   ↕
Content
   ↕
Design
   ↕
Video
   ↕
Management
   ↕
Consulting
   ↕
Total Price
```

Tất cả thay đổi realtime.

Hãy ưu tiên **pricing/configuration algorithm + UX của calculator** trước, sau đó mới đến visual design.
