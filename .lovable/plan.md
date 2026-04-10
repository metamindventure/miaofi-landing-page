

## Plan: Improve Upload Section Layout with "Required" / "Recommended" Badges

### Problem
The current two-column upload layout has misaligned headers — the left column has a simple title while the right has title + badge + description, causing vertical misalignment of the drop zones. The reference screenshot shows "必填" (required) and "推荐" (recommended) badges, plus a description under the PDF title explaining its value.

### Design Improvement
Instead of the reference's misaligned layout, I'll use a **top-aligned grid** where both columns share the same vertical rhythm:

1. **Both columns**: Title row with inline badge → Description text (left: brief format note; right: value proposition) → Drop zone of equal height
2. **Left column**: "上传交易文件" + orange "必填" badge + brief description
3. **Right column**: "账户报表 (PDF)" + purple "推荐" badge + description explaining analysis benefits
4. Drop zones are the same `min-h` so they align perfectly

### Changes

**`src/pages/CexUpload.tsx`** (lines 182-276):
- Left column: Add "必填" badge next to title (orange/warning style), add a short description below title
- Right column: Change "可选" badge to "推荐" (recommended, purple/primary style), add value-proposition description below title
- Both drop zones use identical `min-h-[200px]` for vertical alignment
- Wrap each column header in a consistent structure: `flex items-center gap-2` for title+badge, then `<p>` description, then drop zone

**`src/i18n/zh.json`**, **`en.json`**, **`ko.json`**:
- Add `cexUpload.uploadRequired`: "必填" / "Required" / "필수"
- Add `cexUpload.pdfUploadRecommended`: "推荐" / "Recommended" / "추천"
- Add `cexUpload.uploadTitleDesc`: brief description for trade file section
- Add `cexUpload.pdfUploadBenefit`: description explaining PDF analysis benefits
- Change existing `pdfUploadOptional` usage to `pdfUploadRecommended`

