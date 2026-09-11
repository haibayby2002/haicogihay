Được. Vì bạn **đã có sẵn metadata chuẩn cho từng bài**, tôi sẽ không làm citation thủ công cho 21 bài. Cách tốt nhất là thiết kế thành **một citation/share component dùng chung**, lấy dữ liệu từ front matter/JSON của bài rồi tự generate.

Bạn có thể đưa nguyên phần dưới đây cho Claude.

## Đề xuất UI phía dưới bài viết

Tôi khuyên **Share và Cite nằm cùng một khu vực**, nhưng tách thành 2 nhóm rõ ràng:

```text
────────────────────────────────────────

            Share this article

 [ Facebook ] [ X ] [ Zalo ] [ LinkedIn ] [ Copy link ]


            Cite this article

 [ APA ] [ MLA ] [ Chicago ] [ IEEE ] [ BibTeX ] [ Plain ]

 ┌──────────────────────────────────────┐
 │ Nguyễn, Quý Hải. (2026). Tên bài... │
 │ Hải có gì hay.                       │
 │ https://haicogihay.com/blogs/...     │
 └──────────────────────────────────────┘

                         [ Copy citation ]

────────────────────────────────────────
```

### Tôi sẽ ưu tiên thứ tự

**Share**

1. Facebook
2. X
3. Zalo
4. LinkedIn
5. Copy link

Không cần quá nhiều mạng xã hội. Nếu sau này có nhu cầu thì thêm Reddit/Messenger/Email.

**Cite**

1. APA 7
2. MLA 9
3. Chicago
4. IEEE
5. BibTeX
6. Plain text

Có thể thêm `RIS` sau này nếu muốn tương thích với Zotero/Mendeley/EndNote.

---

# Phần quan trọng: không hard-code citation

Claude nên xây một function kiểu:

```text
generateCitation(article, style)
```

Trong đó `article` lấy từ metadata hiện tại của bạn:

```json
{
  "title": "...",
  "author": "Quý Hải Ng",
  "category": "...",
  "url": "...",
  "published": "2026-08-12",
  "updated": "2026-08-20"
}
```

Sau đó:

```text
generateCitation(article, "apa")
generateCitation(article, "mla")
generateCitation(article, "chicago")
generateCitation(article, "ieee")
generateCitation(article, "bibtex")
generateCitation(article, "plain")
```

Như vậy **21 bài hiện tại và tất cả bài tương lai đều tự động có citation**.

---

# Một điểm tôi khuyên Claude làm kỹ: tên tác giả

Nếu metadata của bạn đang là:

```text
author: Quý Hải Ng
```

thì nên có một **citation-specific author field** hoặc parser.

Ví dụ:

```json
{
  "author": {
    "display": "Quý Hải Ng",
    "family": "Ng",
    "given": "Quý Hải"
  }
}
```

Bởi citation style có thể yêu cầu đảo tên:

```text
Ng, Quý Hải.
```

thay vì:

```text
Quý Hải Ng.
```

Đừng để từng formatter tự đoán tên từ chuỗi `"Quý Hải Ng"` nếu bạn có thể lưu metadata có cấu trúc ngay từ đầu.

---

# BibTeX nên tự tạo citation key

Ví dụ bài:

> Tâm lý học nhà thầu

có thể tạo:

```bibtex
@online{ng2026tamlyhocnhathau,
  author  = {Ng, Quý Hải},
  title   = {Tâm lý học nhà thầu},
  year    = {2026},
  url     = {https://haicogihay.com/blogs/tam-ly-hoc-nha-thau},
  publisher = {Hải có gì hay}
}
```

Citation key nên được generate tự động từ:

```text
author + year + slug/title
```

và phải **ổn định**.

Ví dụ nếu bài được chỉnh sửa vào 2027 thì citation key không nên tự nhiên thay đổi chỉ vì `updated` thay đổi.

---

# Date: dùng Published, không dùng Updated làm ngày chính

Đây cũng là điểm tôi sẽ đưa vào yêu cầu cho Claude.

Nếu:

```text
Published: 2026-08-12
Updated: 2026-08-20
```

thì citation thông thường nên dựa vào:

```text
2026
```

từ ngày xuất bản.

`updated` có thể được dùng để hiển thị trên website:

> Published Aug 12, 2026 · Updated Aug 20, 2026

nhưng **không nên mặc định biến ngày chỉnh sửa thành ngày publication trong citation**.

---

# Share URL nên generate bằng JavaScript

Không cần backend.

Ví dụ concept:

```text
Facebook
→ share URL + article URL

X
→ intent/post + article URL + title

LinkedIn
→ share URL + article URL

Zalo
→ Zalo share mechanism / official supported URL

Copy link
→ navigator.clipboard.writeText(canonicalURL)
```

Quan trọng là dùng **canonical URL**, không lấy URL hiện tại một cách tùy tiện.

Ví dụ:

```text
https://haicogihay.com/blogs/abc
```

chứ không phải:

```text
https://haicogihay.com/blogs/abc?utm_source=...
```

---

# Tôi cũng khuyên có Open Graph metadata

Đây không phải phần UI nhưng rất quan trọng cho Share.

Mỗi bài nên generate:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="...">
<meta property="og:type" content="article">
<meta property="og:image" content="...">

<meta property="article:published_time" content="...">
<meta property="article:modified_time" content="...">
<meta property="article:author" content="...">
```

Như vậy khi người đọc bấm Facebook/X/Zalo/LinkedIn, nền tảng có metadata để tạo preview đẹp.

---

# UX tôi đề xuất

Đừng để citation textbox quá cao hoặc chiếm nhiều diện tích.

Ban đầu:

```text
Cite this article

[ APA ] [ MLA ] [ Chicago ] [ IEEE ] [ BibTeX ] [ Plain ]

┌──────────────────────────────────────────┐
│ Ng, Quý Hải. (2026). Tâm lý học nhà thầu... │
└──────────────────────────────────────────┘

[ Copy citation ]
```

Khi click tab:

```text
APA
```

→ thay nội dung textbox.

Khi click:

```text
Copy citation
```

→ copy đúng citation hiện tại.

Sau đó hiện:

> ✓ Citation copied

trong khoảng 1–2 giây.

**Không cần popup/modal.**

---

# Một thay đổi tôi rất khuyến nghị

Thay vì viết:

> **Citation**

tôi sẽ dùng:

> **Cite this article**

và:

> **Share this article**

Nó thân thiện hơn và người đọc hiểu ngay mục đích.

Cuối cùng có thể thêm:

> **Source:** Hải có gì hay · Quý Hải Ng

nhưng không cần làm nó quá nổi bật.

---

# Prompt đưa thẳng cho Claude

Bạn có thể copy nguyên đoạn này:

Implement a reusable **Share & Citation component** for my blog **Hải có gì hay (haicogihay.com)**.

## Context

The blog already has structured metadata for every article, including:

* title
* author
* category
* URL / slug
* published date
* updated date
* excerpt
* other existing front matter / generated metadata

There are currently 21 published articles, but the implementation must be generic so that new articles automatically receive the same functionality.

Do NOT hard-code citation data for individual articles.

---

## 1. Article Share section

Place this component at the bottom of every article, after the article content and before the footer / related articles section.

Display:

**Share this article**

Buttons:

1. Facebook
2. X
3. Zalo
4. LinkedIn
5. Copy link

Use the article's canonical URL.

The buttons should share the current article, not the homepage.

For Copy link:

* use the canonical article URL
* use `navigator.clipboard.writeText()`
* show a small temporary success state such as `✓ Link copied`
* do not use a modal

Keep the design lightweight and consistent with the existing blog UI.

Do not add unnecessary social networks.

---

## 2. Citation section

Below the Share section, display:

**Cite this article**

Citation format tabs:

* APA 7
* MLA 9
* Chicago
* IEEE
* BibTeX
* Plain text

The user can switch between formats without reloading the page.

Below the tabs, display the generated citation inside a readonly textbox / code-like text area.

Below it:

**Copy citation**

When clicked:

* copy the currently selected citation to clipboard
* show a temporary `✓ Citation copied` state
* do not reload the page
* do not open a modal

---

## 3. Citation generation architecture

Create a reusable function similar to:

`generateCitation(article, style)`

where:

`style = apa | mla | chicago | ieee | bibtex | plain`

The function must receive article metadata and generate the citation dynamically.

Do NOT hard-code citations for the existing 21 articles.

All future articles should work automatically.

---

## 4. Author metadata

If possible, avoid storing the author only as an unstructured display string.

Use structured author information such as:

```json
{
  "display": "Quý Hải Ng",
  "family": "Ng",
  "given": "Quý Hải"
}
```

The display name is used on the website.

The structured `family` and `given` values are used for citation formatting.

Do not make every citation formatter guess how to split the author's name.

If changing the existing metadata schema is undesirable, implement a backward-compatible fallback.

---

## 5. Dates

Use the article's original `published` date/year as the primary publication date for citations.

Do NOT replace the publication year with the `updated` date.

The updated date can still be displayed separately on the article page.

Example:

Published: August 12, 2026
Updated: August 20, 2026

The citation should normally use:

2026

---

## 6. Canonical URL

Always use the article's canonical URL for:

* Facebook sharing
* X sharing
* Zalo sharing
* LinkedIn sharing
* Copy link
* citations
* BibTeX

Do not accidentally include tracking parameters or temporary query parameters.

---

## 7. BibTeX

Generate a stable citation key automatically from author + publication year + article slug/title.

Example:

```bibtex
@online{ng2026tamlyhocnhathau,
  author    = {Ng, Quý Hải},
  title     = {Tâm lý học nhà thầu},
  year      = {2026},
  publisher = {Hải có gì hay},
  url       = {https://haicogihay.com/blogs/tam-ly-hoc-nha-thau}
}
```

The exact BibTeX syntax should be valid and suitable for common reference managers.

The citation key should remain stable when only the article's `updated` date changes.

Sanitize special characters appropriately.

---

## 8. Citation examples

For an article such as:

Title: Tâm lý học nhà thầu
Author: Quý Hải Ng
Published: 2026-08-12
Updated: 2026-08-20
Publisher/site: Hải có gì hay
URL: [https://haicogihay.com/blogs/tam-ly-hoc-nha-thau](https://haicogihay.com/blogs/tam-ly-hoc-nha-thau)

Generate appropriate versions for:

### APA 7

Use an appropriate web/blog citation format.

### MLA 9

Use an appropriate web article/blog format.

### Chicago

Use an appropriate website/blog format.

### IEEE

Use an appropriate online source format.

### BibTeX

Use `@online` where appropriate.

### Plain text

Generate a simple human-readable reference.

Do not claim that the blog is a journal, peer-reviewed publication, or academic institution.

---

## 9. Open Graph / sharing metadata

If not already implemented, ensure every article has appropriate Open Graph metadata:

```html
<meta property="og:title" ...>
<meta property="og:description" ...>
<meta property="og:url" ...>
<meta property="og:type" content="article">
<meta property="og:image" ...>

<meta property="article:published_time" ...>
<meta property="article:modified_time" ...>
<meta property="article:author" ...>
```

Use the existing article metadata to generate these automatically.

---

## 10. Design

The component should visually fit the existing Hải có gì hay blog.

Suggested structure:

```text
────────────────────────────────

Share this article

[ Facebook ] [ X ] [ Zalo ] [ LinkedIn ] [ Copy link ]


Cite this article

[ APA ] [ MLA ] [ Chicago ] [ IEEE ] [ BibTeX ] [ Plain ]

┌──────────────────────────────────────────────┐
│ Generated citation                           │
└──────────────────────────────────────────────┘

[ Copy citation ]

────────────────────────────────
```

Requirements:

* responsive on mobile
* desktop-friendly
* lightweight
* accessible
* keyboard accessible
* visible focus states
* buttons should have appropriate aria-labels
* citation text should be selectable
* no modal
* no backend required
* no database required
* no unnecessary dependencies

Prefer vanilla JavaScript / the existing blog technology instead of introducing a new framework or dependency.

---

## 11. Important architecture requirement

The implementation should have a single source of truth:

Article metadata
↓
Share URL generator
↓
Citation generator
↓
UI

Do not duplicate article metadata in the HTML, JavaScript, and citation configuration unnecessarily.

If the current content-engine already generates JSON metadata, reuse it.

The goal is:

**Add one new article → Share + Cite automatically work.**

---

## 12. Please inspect my existing blog/content-engine structure first

Before implementing, inspect the current:

* article front matter
* article generation script
* generated article HTML
* blog overview JSON
* CSS structure
* JavaScript structure
* canonical URL handling

Then integrate the feature into the existing architecture instead of creating an unrelated component.

Do not rewrite unrelated parts of the blog.

First explain which files you intend to modify and why, then implement the feature.

Tôi đặc biệt thích kiến trúc **metadata → citation/share generator → UI** cho hệ thống hiện tại của bạn. Nó giữ đúng tinh thần *content engine*: sau này bài thứ **22, 50 hay 500** chỉ cần thêm metadata, không phải ngồi tạo citation thủ công.
