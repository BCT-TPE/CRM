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
| 可點擊元件高度 | 桌機統一 40px（按鈕、下拉、搜尋框、頁碼、圖示按鈕 40×40）；切換鈕外框 40px、選項 32px。**手機（≤768）**：清單列至少 44px（側邊選單、下拉選項、勾選列），獨立按鈕至少 40px、彼此間隔 8px，文字連結可點高度至少 40px（design review） |
| 表格列高 | 64px，一行顯示；放不下的名稱、客戶、負責人用省略號（已確認維持現狀，不換行、不左右捲） |
| 數字卡 | 同一排等高，數字對齊；說明文字可換行，用 subgrid 讓各列對齊 |
| 季度長條圖 | 每欄的圖、底線、標籤共用同一組列（subgrid，`.qchart` 在 `dashboard.css`）；某一季標籤換行時，四欄底線仍在同一高度 |
| 文字 | 下拉選單的值、篩選列標籤（Assignee、Team、Fiscal year…）、More filters 裡每個選單的標題，一律 14px |

## 3. 表格與列表

- **點整列開啟**，不另外放鉛筆／編輯圖示欄（Tasks、Sales initiatives 都已移除）。
- 列裡的連結、勾選框各自運作，點它們不會開啟整列。
- 整列可用鍵盤 Tab 到、按 Enter 開啟。
- 只有在列本身不能點時才保留編輯按鈕（目前只有 Activities 的活動卡）。
- 可點的列不放「>」箭頭（hover 底色已表示可點），也不要替它保留空欄：內容的右緣要切齊卡片內距，跟左緣對稱。

## 4. 按鈕位置

- 側邊面板、彈出框、確認視窗的按鈕**一律靠右**，**主要按鈕放最右邊**。
  - 例：`Cancel` `Save`、`Close` `Open N in Sales initiatives`、`Clear` `Done`
  - 確認視窗的刪除類選項（紅字 Discard）也在右側，排在最前面：`Discard` `Keep editing` `Save`
- 頁首的新增／匯出按鈕在桌機和手機都靠右；一組按鈕裡的主要按鈕放最右邊（Home 的 Log activity 也是）。
- **Export 是次要按鈕**（白底），三頁一致；主要按鈕留給新增、記錄這類主動作。

## 5. 篩選列

- 一列排完。寬度不夠時依序處理：
  1. 搜尋框先從 260px 縮到 180px；
  2. Export／More filters 放不下文字時變成 40×40 圖示按鈕並加 tooltip：1420px 以下一律圖示；1420–1499px 出現 Reset 時圖示；Export 三頁都在篩選列最右邊；
  3. 還放不下才換行，不能超出畫面。
- **精簡篩選列**（`compactFilters`）：手機（≤768）全部頁面、Pipeline／Sales performance 在 1279px 以下。第一行／第二行只放年度、季度（Full year／Q1–Q4 變下拉）、2–3 個選項的切換鈕、Fiscal year；其他篩選移到 More filters 最上方，徽章一起計數；沒有 More filters 的頁面（Tasks）在手機上自動加一個「Filters」面板。不左右滑。
- 已知例外：Pipeline、Sales performance 套用篩選、出現 Reset 時，1280px 寬會換成兩行（差約 20px）。
- More filters 彈出框：高度最多到視窗底部（留 12px），內容在框內捲動，Clear／Done 固定在框底；打開或在框內捲動都不會帶動整頁。框內的下拉選單會浮在最上層，下方空間不夠時往上展開；選完彈出框不會關閉。篩選列固定／取消固定時，已打開的彈出框會重新定位。手機（≤480px）上每頁的 More filters 都是滿版、左右各 16px 置中；更寬時對齊按鈕展開。

## 6. 側邊欄與帳號

- 分組和項目照舊版 `menu-config.ts`，Dashboards 最上面加 **Home**（Logo 也連到 Home）。項目帶角色時只給該角色看：
  - Administration、Users：只給 Administrator（舊版規則）
  - Customer orders、Sales targets：Sales Manager 以上；Sales structure：Sales Head 以上（照需求端的 Home 設計稿）
  - 某個分組的項目全被隱藏時，連分組標題一起不顯示
- 這輪沒做的頁面顯示灰色停用，滑上去顯示「Not part of this redesign round」。
- 示範帳號一律是 Gaurav Shrotriya。帳號選單的「VIEW AS」是下拉選單：**只有 Home 能切換角色**（Salesperson／Sales Manager／Sales Head，Administrator 停用，預設 Salesperson，存在 localStorage `crm-home-role`）；**其他頁固定是 Administrator**，選單顯示 Administrator 並停用（2026-11-24）。角色會影響預設畫面：
  - Activities：Administrator、Sales Head 預設 Everyone；Sales Manager 預設 My teams；其他人預設 Mine
  - Tasks：所有角色都預設 My open tasks（自己沒有未完成任務時，改顯示已完成的）。舊版經理類角色預設 Team overdue，這裡依設計決定不照做（2026-11-23）
- Tasks 旁顯示自己未完成的任務數：藍色正圓、白字；收合側邊欄時放在圖示右上角；完成任務後即時更新。
- 帳號選單：姓名、角色、Email、View as、Sign out。手機上帳號入口是頂端頭像，抽屜選單只留 Notifications（固定在底部，選單可捲動）。
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

## 7.4 主管 design review（2026-11-24）採用的規則

- **手機上**側邊選單每列、下拉選項、More filters 勾選列、Clear、通知的 Mark all read／See all 都是 40px（維持全站 40px，不用 review 提議的 44px）。
- **hover 樣式**只在有滑鼠的裝置生效（`@media (hover: hover)`，或在 `responsive.css` 的 `@media (hover: none)` 裡取消），觸控點過的卡片不會一直停在 hover 狀態。
- **下拉選單**放不下時往視窗內縮，離邊 16px；量視窗寬度用 `document.documentElement.clientWidth`（手機上打開的選單會撐大 innerWidth）。
- **頁面漸層背景**放在 `body.v2::before` 的 fixed 圖層，不用 `background-attachment: fixed`（iOS Safari 不支援）。
- **Activities 的 Log** 只是起頭：打開完整的 Log activity 面板（跟舊版 ActivityFormDrawer 同欄位），帶入已選的類型、對象和文字，存檔前驗證。
- **手機頂端頭像**可點，打開帳號選單（在頭像下方、靠右）。
- **既有連結要帶到那一筆**：Tasks 的「from ACT-…」開 `activities.html?q=ACT-…`。不新增舊版沒有的連結。
- **示範資料要有長短變化**：活動筆記依目的有不同內容，並有一筆長筆記測試換行（ACT-2026-0032）。
- **說明虛線**只畫在文字下方（`.def` 寬度跟文字一樣）。
- **季度圖**的標籤四欄一致換行：「vs last year」固定第二行；手機上「Target」／金額、百分比／attained 都拆兩行。
- **原本不採用、後來依指示也做了的**（2026-11-24）：
  - 完成任務後的提示有「Undo」（5 秒內可復原），Tasks 與 Home 都適用（`CRM.toast(msg, kind, { label, fn })`）。
  - Tasks 面板、Log activity 面板有填內容時，Cancel／×／Esc 先問「Discard…?」。
  - 三頁的 Export 都在篩選列最右邊（Sales initiatives 從頁首移過來）。
  - 頁首小標籤（pill）全站都拿掉，Home 也是（2026-11-24，Janet）；「Updated」放在副標結尾。手機捲動後頂端列顯示頁名（Home 顯示「Home」）。
  - 手機篩選列不左右滑：第二行只放 2–3 個選項的切換鈕、Fiscal year，以及季度改成下拉；其他篩選移到 More filters 最上方，徽章一起計數；沒有 More filters 的頁面（Tasks）改成換行。
  - 手機篩選列上方 12px + 分隔線 + 12px，固定在頂端時分隔線隱藏。
  - 手機往下捲、標題捲出頂端列後，Logo 淡出、改顯示頁名。

## 7.5 動態

- 進場動畫全站一致：每頁第一次畫完後呼叫 `CRM.riseIn()`，卡片、區塊和頁首 KPI 由下往上淡入（`.rise`，0.32 秒），依序錯開 40ms，最多錯開 8 張。系統設定「減少動態」時不播放。之後的重畫（篩選、切換分頁）不再播放。

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

## 11. Home（2026-11-24，需求端「CRMpulse Home page – by role」）

- 一頁三種內容，依角色決定：Salesperson 看自己、Sales Manager 看自己的團隊（APAC Sales）、Sales Head 和 Administrator 看全公司。
- Home 是登入後的第一頁，所以招呼語「Good morning／afternoon／evening, Gaurav」放在 Home 的標題；Pipeline & forecast 的標題改回頁名，跟其他頁一樣。
- 版面跟 Pipeline & forecast 一致：頁首右側放業務與經理的「Record something now」按鈕，或 Sales Head 的「Waiting on you」KPI（同 Pipeline 頁首 KPI 樣式）；配額／預測卡全寬。經理與 Sales Head 再加「By salesperson／By sales team」表格，下面是各角色的清單卡。Home 目前不放換頁連結（見下）。
- **數字一律用本站示範資料計算**，不照抄需求稿：公司 Q3 預測 = Pipeline & forecast 的 Q3 forecast；需注意的商機 = Sales initiatives 的 attention 規則；久未聯絡 = Activities 的 30 天規則（需求稿是 60 天）。
- **每張卡都要有資料**（照需求稿，2026-11-24）：Gaurav 有自己的商機（Al Dhafra – Smart Buildings、Qamar – Pipeline Monitoring、Coral Ports – Data Platform）、兩筆未確認 PO 的成交、兩個久未聯絡的客戶（Pearl Transit 72 天、Mekong Freight 64 天，`QUIET_FIX`），以及三筆同事在他客戶上的活動（Presales、Legal、Finance）。這些資料也出現在 Pipeline、Sales performance、Sales initiatives、Activities，數字全站一致。
- 為了業務視角，Gaurav 有個人配額 $0.55M（APAC Sales 團隊目標因此是 $1.65M）。待審核客戶 `APPROVALS`、未確認 PO 的訂單 `DRAFT_ORDERS` 在 `crm-data.js`。
- **Home 先不放任何會換頁的連結**（2026-11-24，Janet）：卡片底部的「View in …›」、配額卡的「Open Pipeline & forecast ›」、表格列點擊、任務和商機名稱的連結都拿掉。頁首按鈕（New initiative、New contact、New task、Log activity）和清單裡的按鈕（Log activity、Confirm PO、Review）保留，點了用 toast 說明會打開什麼，不換頁。

## 12. 主管 review 第二輪補齊（2026-11-24）

- 手機 44px 清單列、Clear 改成跟 Done 同高的按鈕；分頁標籤、範圍卡間距 8px；卡片標頭的文字連結 40px 高。
- 季度圖金額固定在同一排；手機上「Target」改成圖例的虛線符號，百分比／attained、金額／vs last year 拆兩行，四欄一致。
- Activities 拿掉頁面上的快速記錄區（review D1，Janet 決定）：記錄活動只從頁首「Log activity」按鈕打開完整面板；篩選列回到標題正下方（跟 Tasks 同高），摘要卡在篩選列下面。
- 下拉收起時可顯示短名稱：`<option data-short="…">`（Tasks「Who should do it?」收起時只顯示名字，選單裡仍是「名字 · 部門」）。
- 連結都帶到那一筆：「1 follow-up task」→ `tasks.html?q=ACT-…`（Tasks 搜尋也比對來源活動）；Tasks 的客戶名 → `accounts.html?q=`。
- 非 Administrator 的角色，活動超過 7 天顯示「Locked after 7 days」，不能編輯；Administrator 隨時可編輯。
- 觸控裝置上所有 hover 底色、底線、箭頭位移都不殘留（`responsive.css` 的 `@media (hover: none)`）。
- ≤1360px 時，Q3 forecast／FY26-27 attainment 卡的長條接在文字下方，不再為了對齊旁邊的季度圖留空。

## 13. Home 版面（2026-11-24 調整）

- 清單卡最多 4 筆，其餘用卡片底部的「View all／All my …」；同一排卡片維持等高。
- **Salesperson**：配額卡全寬 → 左欄 My tasks、右欄 Deals needing attention 疊在 Orders awaiting confirmation 上（兩張合起來跟左欄等高）→ Quiet accounts｜Activity on your accounts。手機順序：My tasks → Deals → 配額 → Orders → Quiet → Activity。
- **Sales Manager**（照需求稿）：頁首是跟業務相同的 Record 按鈕；配額卡（8 欄）｜Waiting on you（4 欄，APAC 待審核客戶，每筆有 Review）→ By salesperson 全寬 → 2×2：Team overdue tasks｜Deals needing attention、Team activity｜Quiet accounts。
- **Sales Head／Administrator**：配額卡全寬 → By sales team → Largest deals（8 欄）｜Strategic accounts gone quiet（4 欄）。
