# BCT CRM 改版：RWD 調整說明

範圍：Dashboards + Sales 五頁（Pipeline & forecast、Sales performance、Sales initiatives、Activities、Tasks）
版本：已推上 BCT-TPE/CRM `main`，commit `5205e78` 和 `ee7007b`（皆為 2026-11-20）
檔案：`bct-crm-redesign/` 底下的 `assets/responsive.css`、`assets/crm.js`、`assets/crm.css`，以及各頁 HTML 內的頁面樣式（含 Sales initiatives 紀錄頁 `initiative.html`）

---

## 1. 斷點

| 寬度 | 版面 |
|---|---|
| 1440 | 桌面版，維持原設計 |
| ≤ 1360 | 頁首 KPI 換到問候語下方；篩選列可換行 |
| ≤ 1180 | 卡片重新排列：小卡兩兩一排，寬卡佔滿一行 |
| ≤ 1100 | 側邊欄收成圖示列；頁面內距 24px；表格第一欄固定、其餘左右滑動 |
| ≤ 768 | 手機版：側邊欄變成抽屜選單；本文件大部分調整都在這個範圍 |
| ≤ 480 | 頁面與卡片內距縮為 16px |
| ≤ 400 | KPI 大數字再縮一級 |

基礎斷點是 Candace 的 `responsive.css`。下面列的是這一輪補上的部分。

---

## 2. 原本會超出畫面的問題

| 問題 | 出現寬度 | 修正方式 |
|---|---|---|
| Pipeline、Performance 頁首 4 個 KPI 被擠出畫面 | 481–1100px | 桌面版為了避免數字跳動，每個 KPI 都有固定最小寬度。現在 ≤1100 改成 4 欄平均分配，≤768 改成 2×2；KPI 名稱和說明可換行 |
| Sales initiatives 列表工具列的 List / Kanban / Funnel 被推出畫面 | 820px 左右 | ≤1100 時工具列可換行 |
| KPI 大數字超出 4px | 360px | ≤400 時數字縮小一級 |

**驗證**：五頁 × 13 種寬度（360–1440px）掃描，都沒有內容超出畫面。

---

## 3. 手機版篩選列（≤768）

**目標**：置頂，且最多兩行。

| 頁面 | 第一行 | 第二行（可左右滑動） |
|---|---|---|
| Sales initiatives | 搜尋框、More filters | Everyone / My initiatives、Team、Expected close |
| Activities | 搜尋框、More filters | Mine / My teams / Everyone、Purpose、Period（自訂期間時加上 From / To） |
| Tasks | 搜尋框 | Assignee、Show completed and cancelled |
| Pipeline、Performance | 只有一行：Fiscal year、季度切換、Team、Owner 可滑動；More filters、Export 固定在右側 | — |

- **置頂**：固定在頂端選單列（56px）下方，捲動後加上毛玻璃背景。
- **圖示化**：More filters 和 Export 在手機上縮成 40×40px 的圖示按鈕，篩選數量的徽章保留在角落。
- **滑動提示**：可滑動的那一行右側有淡出效果。
- **平面樣式**：篩選列的按鈕拿掉陰影，改用細框線。原因是可滑動的容器會把陰影裁成一條水平直線。
- **彈出選單**：下拉選單和日期選擇器若從可滑動的那一行打開，會暫時移到頁面最外層顯示，關閉後放回原位，避免被遮罩或毛玻璃效果裁掉。
- **置頂偵測**：`watchSticky` 改用捲動事件判斷，可辨識任何置頂位置。原本只認得貼在畫面最頂端的情況。
- **程式**：`crm.js` 的 `compactFilters()`。做法是移動既有節點而不是複製，所以各頁的 id 和事件都不受影響；視窗變寬時會還原原本的順序。

---

## 4. 手機版表格 → 卡片列表（≤768）

適用 5 張表格：Pipeline、Performance（2 張）、Sales initiatives、Tasks。

- **排法**：每一列變成一張小卡。
  - 第一欄（名稱、編號）佔整行。
  - 其他欄位兩兩一排，欄位名稱用小字標在數值上方。
- **佔整行的欄位**：Stage、Stage · forecast、Next step、Owner / team、Assigned to。
- **編輯鈕**：固定在卡片右上角，只有含編輯鈕的卡片才保留右側 44px 空間。
- **第一欄的第二行**（編號 · 所屬 initiative）可換行，完整顯示。
- **排序**：表頭隱藏，改用表格上方的「Sort」下拉；選了等同點那個欄位標題。Sales initiatives 已有自己的 Sort，不重複加。
- **間距**：最後一張卡片和分頁區之間留 16px。
- **程式**：
  - `crm.js` 的 `prepTables()`：每次表格重新渲染時，自動把表頭文字寫進每一格的 `data-label`，並建立 Sort 下拉。
  - `responsive.css`：卡片樣式。

**附帶修正**
- **769–1100px**：表格第一欄固定時，表頭背景原本是透明的，橫向捲動時第二欄的表頭會透出來，疊在一起。現在固定的那格表頭有白底。
- **桌面版 Tasks 表頭上方的間距**：原本靠「表格是卡片裡的第一個元素」時往上收 10px 來對齊。手機用的 Sort 下拉插在表格前面後，桌面版雖然隱藏它，表格卻不再是第一個元素，這條規則就失效了。現在 Sort 下拉在桌面版不列入判斷，手機版（看得到 Sort）則不往上收。程式在 `crm.css`。

---

## 5. 一致性與對齊

| 項目 | 範圍 | 調整 |
|---|---|---|
| 可點擊元件高度 | 全尺寸 | 統一 40px（原本手機 30 / 32 / 34 / 36 / 40px、桌面 28 / 30 / 32 / 36 / 40px）。按鈕、下拉、搜尋框、切換鈕、分頁標籤、類型標籤、頁碼、圖示按鈕都套用，範圍包含頁面、手機頂端選單列、More filters 彈出框、Tasks 側邊欄；只有圖示的按鈕為 40×40px；切換鈕內每個選項 32px。More filters 的「Done」原本寫死 32px，已移除。範圍卡、圖表欄位、表格列、卡片跟著內容高度，不列入 |
| 表格列高 | 全尺寸 | 全站 64px（原本 Pipeline 60、Performance 65、Initiatives 75）。Initiatives 的 Stage 欄把進度條和天數併成一行 |
| 頁首間距 | ≤768 | 頁首到篩選列 12px（原本 30px）；Sales 頁的副標題 → 按鈕也是 12px（原本 24px） |
| Activities 摘要卡 | 全尺寸 | 同一排卡片的標題、數字、說明共用列高（subgrid），標題換行時數字仍對齊；說明文字在手機上可換行 |
| Tasks 範圍卡 | 全尺寸 | 說明文字精簡成一行（Given to others、Oldest N days、N done in 30 days、None assigned），並用 subgrid 對齊 |
| Performance 季度圖 | 全尺寸 | 圖表區、底線、說明文字共用列高；說明文字換行數不同時，四欄底線仍在同一條線上 |
| Pipeline「Days in stage」點陣 | ≤768 | 點徑與點距和下方地圖完全相同（`syncAgeDots()` 直接量地圖算出）；4 欄放不下時自動改兩欄 |
| 分頁標籤列 | ≤768 | 改成單行、可左右滑動，右側淡出 |
| Initiatives 列表工具列 | ≤768 | 摘要獨佔一行；need attention 和 Sort 並排，Sort 補滿剩餘寬度；List / Kanban / Funnel 在下一行 |
| Tasks 表格（手機改卡片前） | ≤768 | 第一欄固定約 216px，和其他表格一致 |
| Activities Log 按鈕 | ≤768 | 佔滿整行時文字置中 |
| 卡片內下拉選單 | 全尺寸 | 補上細框線（原本是白框配白底，看不出是控制項） |
| Activities 卡片的編輯鈕 | ≤768 | 固定在卡片右上角；標題右側留 44px 不被蓋住（統一 40px 後，按鈕原本會被擠到第二行） |

---

## 6. Sales initiatives 紀錄頁（`initiative.html`）

| 項目 | 範圍 | 調整 |
|---|---|---|
| 分頁列（Overview、Line items…） | ≤768 | 點擊分頁時整頁會重畫，分頁列原本會跳回最左邊。現在保留原本的捲動位置，只捲動分頁列本身讓選中的分頁出現在畫面內，頁面不會跳動 |
| 分頁列間距 | 全尺寸 | `.rec-tabs` gap 改為 0；`.rtab` 左右內距改為 14px |
| 上方步驟條 | ≤768 | 原本步驟那一排被固定成 720px 寬、進度條卻只有螢幕寬，兩者對不上，後面的步驟也被切掉。現在每個步驟只顯示圓點、平均排滿一行，進度條剛好填到目前那一步；下方一行說明（Step 2 of 4 · Initial contact／Closed won／Closed lost · after 某階段）。8 個階段也放得下 |
| Stage history 路線圖 | ≤768 | 步驟和進度條使用同一個寬度（每步 100px，至少滿版），一起左右滑動、保持對齊；3 個階段以內不用滑動 |
| Activities 時間軸 | ≤768 | 日期改放在內容上方，內容拿到完整寬度；類型和目的標籤不再拆成兩行，放不下時整顆換行 |
| Contacts（Buying committee） | ≤768 | 通話鈕和 Log activity 移到姓名資料下方，「Decision maker」標籤不再被擠成兩行 |
| Line items 合計 | ≤768 | 表格改成卡片列表後，Total 那一列改為卡片下方的一列合計（原本左側多出一塊白底） |

---

## 7. 驗證方式

- **自動掃描**：五頁在 360、390、600、768、769、820、1024、1100、1280、1440 等寬度下檢查：
  - 有沒有內容超出畫面、需要左右捲整頁。
  - 數字有沒有對齊。
  - 可點擊元件的高度。
  - 表格是否轉成卡片。
- **截圖檢查**：手機（375 / 390px）、平板（820px）、桌面（1280 / 1440px）。
- **互動測試**：
  - 手機版 Sort 下拉逐一切換，排序結果正確。
  - 可滑動那一行裡的下拉和日期選擇器可正常選取。
  - 側邊欄收合狀態會在多個分頁之間同步。
- **可點擊元件高度**：五頁桌面版（1440px）與手機版（390px），以及 Tasks 側邊欄、More filters 彈出框，實測全部 40px。
- **紀錄頁**：4 筆不同狀態的紀錄（prospect、進行中的 opportunity、已成交、已失敗）× 7 個分頁，加上編輯模式，在 390px 下掃描都沒有超出畫面或文字被擠壓；桌面版確認步驟名稱、表格和合計列維持原樣。

## 8. 未處理 / 備註

- 桌面版的「Days in stage」點陣比地圖的點大（1440px 時 7px 對 4px），目前只在手機上統一。
- Sales initiatives 列表卡片裡的 Sort 下拉沒有置頂；置頂的是頁面上方的篩選列。
- 375px 以下的手機，Initiatives 的 Sort 選項文字可能以「…」截斷。
- 紀錄頁的分頁（Overview、Line items…）是另一種分頁樣式，高度仍是 36px，沒有併入 40px 的統一規則。
