# BCT CRM 改版：設計規則（DESIGN.md）

這份記錄這次改版已經定案的規則，給之後改頁面的人（含 AI）照著做。修過的問題也寫在這裡，避免同樣的問題再出現。
RWD 細節另見 [RWD.md](RWD.md)；每次推送的變更見 [CHANGELOG.md](CHANGELOG.md)。

範圍：Dashboards + Sales 五頁（Pipeline & forecast、Sales performance、Sales initiatives、Activities、Tasks），加上 Sales initiatives 的紀錄頁 `initiative.html` 和新增頁 `initiative-new.html`。

---

## 1. 依據與優先順序

1. 使用者（設計師）當下的指示
2. 這份 DESIGN.md
3. **資訊架構、欄位、資料邏輯**：舊版 CRMpulse（原始碼 `gharibct/crm`，唯讀參考）
4. **視覺**：主管的 v2 藍色玻璃 prototype，以及 `design-system/tokens.css`

- 舊版有的資料和功能不能少；舊版沒有的東西（摘要句、說明文字、篩選、設定）不能自己加，要先問。
- 同一筆示範資料在每一頁的數字都要一致（例如 Tasks 的「My open tasks 3」= 側邊欄 Tasks 旁的 3）。
- repo 是公開的：只用虛構資料，Email 用 `@example.com`。

## 2. 版面與尺寸

| 項目 | 規則 |
|---|---|
| 可點擊元件高度 | 統一 40px（按鈕、下拉、搜尋框、頁碼、圖示按鈕 40×40）。切換鈕（seg、紀錄頁分頁）外框 40px、裡面每個選項 32px |
| 表格列高 | 64px，一行顯示；放不下的名稱、客戶、負責人用省略號（已確認維持現狀，不換行、不左右捲） |
| 數字卡 | 同一排等高，數字對齊；說明文字可換行，用 subgrid 讓各列對齊 |
| 文字 | 下拉選單的值、篩選列標籤（Assignee、Team、Fiscal year…）、More filters 裡每個選單的標題，一律 14px |

## 3. 表格與列表

- **點整列開啟**，不另外放鉛筆／編輯圖示欄（Tasks、Sales initiatives 都已移除）。
- 列裡的連結、勾選框各自運作，點它們不會開啟整列。
- 整列可用鍵盤 Tab 到、按 Enter 開啟。
- 只有在列本身不能點時才保留編輯按鈕（目前只有 Activities 的活動卡）。

## 4. 按鈕位置

- 側邊面板、彈出框、確認視窗的按鈕**一律靠右**，**主要按鈕放最右邊**。
  - 例：`Cancel` `Save`、`Close` `Open N in Sales initiatives`、`Clear` `Done`
  - 確認視窗的刪除類選項（紅字 Discard）也在右側，排在最前面：`Discard` `Keep editing` `Save`
- 頁首的新增／匯出按鈕在桌機和手機都靠右。

## 5. 篩選列

- 一列排完。寬度不夠時依序處理：
  1. 搜尋框先從 260px 縮到 180px；
  2. ≤1480px：More filters、Export 變成 40×40 圖示按鈕（文字保留給螢幕報讀器）；
  3. 還放不下才換行，不能超出畫面。
- 已知例外：Pipeline、Sales performance 套用篩選、出現 Reset 時，1280px 寬會換成兩行（差約 20px）。

## 6. 側邊欄與帳號

- 分組和項目照舊版 `menu-config.ts`；項目帶角色時只給該角色看（Administration、Users 只給 Administrator）。
- 這輪沒做的頁面顯示灰色停用，滑上去顯示「Not part of this redesign round」。
- 示範帳號：Gaurav Shrotriya，**Administrator**（設定在 `assets/crm.js` 的 `USER`）。角色會影響預設畫面，照舊版規則：
  - Activities：Administrator、Sales Head 預設 Everyone；Sales Manager 預設 My teams；其他人預設 Mine
  - Tasks：Administrator、Sales Head、Sales Manager 有團隊逾期時預設 Team overdue；業務預設 My open tasks
- Tasks 旁顯示自己未完成的任務數：藍色正圓、白字；收合側邊欄時放在圖示右上角；完成任務後即時更新。
- 帳號選單只有：姓名、Email、Sign out（照舊版 ProfileMenu）。
- 通知選單照舊版：標題 + Mark all read、只列未讀（沒有時顯示 You're all caught up.）、See all →。

## 7. 顏色

- 用 `tokens.css` 的色票，不自創顏色。
- 活動類型各自一色：`--act-visit / call / online / email / message / internal / event / other`（含 `-bg`），不重複。
- 紅色只用在逾期、超過期限等需要注意的狀態。
- 文字對比至少 4.5:1（WCAG AA），在頁面藍色底和淺藍卡片上都要達標。2026-11-23 對比檢查後調整：
  - `--t3`（灰色說明文字）`#6b6e70` → `#65686a`
  - `--danger` `#c2412d` → `#bf3e2a`
  - 輸入框提示字一律用 `--t3`；`--t4`（3.2:1）只用在這輪沒做的灰色停用項目
- 表頭沒有在排序的欄位上的淡色 ↑ 是裝飾提示，不算文字對比。

## 8. 不要做的事

- 不加 `title` tooltip，也不加多餘的 alt／說明文字。
- 不在列表的連結上加 hover 底線（列本身已有 hover 底色）。
- 不加舊版沒有的摘要句、說明、篩選、設定項目。
- 不改主管的原始 prototype 檔案。

## 9. 已確認維持現狀（不用再提）

- 這是展示用 prototype：完成任務、新增任務、記錄活動、編輯計畫都只存在當下頁面，重新整理或換頁後回到原本的示範資料，也不會同步到其他頁（2026-11-23 確認）。
- New task 視窗打開時，游標自動放進「What needs doing?」，方便鍵盤操作（2026-11-23 確認）。
- 表格的省略號、1280px 寬篩選後換行（見第 2、5 節）。

## 10. 改完要做的事

- 改了共用的 CSS／JS（`assets/`、`design-system/tokens.css`），所有引用它的頁面都更新 `?v=` 版本號。
- 在 1440、1280、1024、768、390px 檢查：沒有橫向捲動、內容沒被裁切、可點擊元件都是 40px。
- 推送前在 CHANGELOG.md 最上方加一筆英文開發紀錄（pre-push hook 會檢查）。
