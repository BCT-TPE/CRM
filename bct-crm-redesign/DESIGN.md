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
- 示範帳號一律是 Gaurav Shrotriya，預設 **Sales Head**（2026-11-24 由 Administrator 改）。帳號選單的「VIEW AS」是下拉選單，**每一頁都能切換角色**（Salesperson／Sales Manager／Sales Head；Administrator 停用，因為需求端三份範例只有這三種），選擇存在 localStorage `crm-home-role`，全站一致、其他分頁同步（2026-11-25）。側邊欄跟三份範例一樣依角色顯示。
  - **角色規則（2026-11-26）**：沒有 Administrator，**Sales Head 是最高角色**，畫面和功能完全照舊版 Sales Head 看到的（舊版只給 Administrator 的功能一律不做，例如 Sales structure 的新增、編輯，刪除帳戶，改超過 7 天的活動）。**Salesperson、Sales Manager 只差在側邊欄少幾頁**；除了 Home 以外，每一頁的資料範圍和功能都跟 Sales Head 一樣（`CRM.user.assigning`、`oversight` 一律為 true）。
  - Activities 預設 Everyone；Sales owner 可以改（舊版 Sales Head 的 canAssign）
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

- **手機上**側邊選單每列、下拉選項、More filters 勾選列 44px；Clear、通知的 Mark all read／See all 40px。
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
  - 手機篩選列不左右滑：第二行只放 2–3 個選項的切換鈕、Fiscal year，以及季度改成下拉；其他篩選移到 More filters 最上方，徽章一起計數；沒有 More filters 的頁面（Tasks、Contacts）自動加一個 Filters 面板。
  - 手機頁首和篩選列之間共 24px（12px＋分隔線＋12px），固定在頂端時分隔線隱藏。
  - 手機往下捲、標題捲出頂端列後，Logo 淡出、改顯示頁名。

## 7.5 動態

- 進場動畫全站一致：每頁第一次畫完後呼叫 `CRM.riseIn()`，卡片、區塊和頁首 KPI 由下往上淡入（`.rise`，0.32 秒），依序錯開 40ms，最多錯開 8 張。系統設定「減少動態」時不播放。之後的重畫（篩選、切換分頁）不再播放。

## 7.6 新頁面的 UX 一致

- 之後新增的頁面，同樣的操作要用同樣的元件和行為，先找現有頁面怎麼做再動手（2026-11-25，Janet）：顯示／隱藏類篩選用 `.ftog` 放在篩選列；點列打開；小尺寸用右側滑出面板；停用按鈕點了用 toast 說明；進場動畫 `CRM.riseIn()`；Reset、空狀態、手機 Filters 面板與徽章同一套。共用樣式放 assets，不寫在單頁。

## 7.7 頁面標題與搜尋框（2026-11-26）

- **頁面大標跟側邊欄的名稱一致**（例如 Sales targets，不用舊版的「Sales Targets & Allocation」）。Home 的大標是招呼語（§11），報表頁是報表名稱。
- **有搜尋框的篩選列，搜尋框一律排第一個**，在最左邊；其他篩選接在後面。沒有搜尋框的頁面（Pipeline、Sales performance）從年度開始。

## 7.8 人名欄（2026-11-26）

- **表格裡的人名欄一律「頭像＋名字」**（`.own` + `CRM.avatar()`）：Owner、Assigned to、Salesperson、報表的 Owner／Name（是人時）、Sales targets 的 Salesperson 分頁、Home 的 By salesperson。名字太長就截斷，不拿掉頭像。句子裡提到的人（例如「by John Mathew」）維持文字。

## 7.10 文案只用舊版有的（2026-11-26）

- **舊版畫面沒有的說明和提示不加**：卡片或區塊標題下的說明副標、表格下方的註記（包括顏色門檻）、欄位下的使用說明、名詞上的定義提示，舊版沒有就不放。舊版有同一句的，用舊版原文（例如「Optional for now.」「Needed for the quarterly forecast.」「No target is defined for this selection or anything under it.」）。
- 保留：標題、資料標籤、全站共用的對話框和空白狀態、驗證訊息、商機的下一步建議，以及舊版放在頁尾註腳、新版改放在提示框裡的定義（Weighted、Forecast、Needs attention、Win rate、Expected by today）。Pipeline、Sales performance 的卡片副標跟舊版同類（「select … to filter」），保留。
- Home 是依需求端範例做的，不在這次比對範圍。

## 7.9 表格列的 hover 與游標（2026-11-26）

- **只有能打開東西的列才有 hover 底色和手指游標**：列加 `class="click"`（`crm.css`、`theme-v2.css`、`responsive.css` 都只對 `tr.click:hover` 上色）。其他列一律一般游標（`cursor: default`）、滑過不變色，例如 Home 的 By salesperson、報表的彙總列、商機頁的明細、Sales structure。
- 新表格：列能點就加 `click`，不能點就什麼都不加；不要在頁面裡另外寫覆寫來關掉 hover。

## 8. 不要做的事

- 不加 `title` tooltip，也不加多餘的 alt／說明文字。
- 不在列表的連結上加 hover 底線（列本身已有 hover 底色）。
- 不加舊版沒有的摘要句、說明、篩選、設定項目。
- 不改主管的原始 prototype 檔案。

## 9. 已確認維持現狀（不用再提）

- 這是展示用 prototype：完成任務、新增任務、記錄活動、編輯計畫都只存在當下頁面，重新整理或換頁後回到原本的示範資料，也不會同步到其他頁（2026-11-23 確認）。
- New task 視窗打開時，游標自動放進「What needs doing?」，方便鍵盤操作（2026-11-23 確認）。
- 表格的省略號、1280px 寬篩選後換行（見第 2、5 節）。
- 側邊欄名稱用「Sales initiatives」這種寫法（只有第一個字大寫），每一項都有圖示；不照舊版和需求端範例的「Sales Initiatives」、只有 Dashboards 有圖示（2026-11-25 確認）。各角色看得到的項目則跟三份範例一致。

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
- 照舊版：活動只有記錄的人在 7 天內能改，Administrator 隨時可改。其他角色看到別人的活動顯示「Read only」，自己超過 7 天的顯示「Locked after 7 days」。
- 觸控裝置上所有 hover 底色、底線、箭頭位移都不殘留（`responsive.css` 的 `@media (hover: none)`）。
- ≤1360px 時，Q3 forecast／FY26-27 attainment 卡的長條接在文字下方，不再為了對齊旁邊的季度圖留空。

## 13. Home 版面（2026-11-24 調整）

- 清單卡最多 4 筆，Home 目前不放「View all」等換頁連結（加回連結時，Largest deals 的「15 across the company」要一起補 View all）。卡片高度跟著內容，不再等高（見 §15）。
- **Salesperson**：配額卡全寬 → 左欄 My tasks＋Quiet accounts、右欄 Deals＋Orders，各自往下排 → Activity on your accounts 整排。手機順序：My tasks → Deals → 配額 → Orders → Quiet → Activity。
- **Sales Manager**（照需求稿）：頁首是跟業務相同的 Record 按鈕；配額卡（8 欄）｜Waiting on you（4 欄，APAC 待審核客戶，每筆有 Review）→ By salesperson 全寬 → 左欄 Team overdue tasks＋Team activity、右欄 Deals＋Quiet accounts，各自往下排。
- **Sales Head／Administrator**：配額卡全寬 → By sales team → Largest deals（8 欄）｜Strategic accounts gone quiet（4 欄）。

## 14. Customers：Accounts（2026-11-24 起）

- Accounts、Contacts、Customer orders 都在側邊欄（`crm.js` 的 `BUILT`），2026-11-25 開放；Customer orders 只有 Sales Manager 以上看得到。Tasks 的客戶名稱連到 `accounts.html?q=`。
- Accounts 照舊版 CRMpulse 補齊，並套 design review 規則：
  - 五張分組卡間距 8px；每張卡管 Lifecycle／Strategic／Need attention，卡上的數字套用其他篩選、不套卡片自己的條件。More filters 選了 Lead、Opportunity 時沒有卡片亮起。
  - More filters：Account status、Lifecycle、Engagement、Region（依 Geography 縮小）。
  - Lifecycle 照舊版：有成交 = Customer，有進行中的 Opportunity／Lead = Opportunity／Lead，其餘 = Prospect。下方小字：Fresh · not approved／Inactive／Active／Dormant（超過 60 天沒互動 = Dormant）。
  - 待審核客戶（Home 的「Waiting on you」，`FRESH_ACCOUNTS`）也列出：標「Waiting for approval」，Log activity 與 New initiative 停用並用 tooltip 說明原因；只在 Accounts 出現，其他頁不計入。
  - 標籤顏色：久未聯絡（超過 60 天）紅色，草稿訂單與待審核黃色。Last interaction 有 Today／Yesterday／Never。
  - 整列可點（目前沒有客戶詳情頁，用 toast 表示）；Quick actions 是 Log activity（鉛筆，開 `activities.html?log=<客戶>` 並帶入客戶打開記錄面板）和 New initiative（+），按鈕間距 8px。
  - 表格底部總計列（筆數、Open pipeline、Customer value，依目前篩選），下方說明「Customer value 只算已確認訂單」。手機上總計列跟上方卡片同兩欄、每個數字帶標籤。

## 15. 主管 review 第三輪（2026-11-25，Home＋全站）

- **卡片高度**：清單卡跟著內容，兩欄用卡片的組合讓總高度接近；剩下的差距由較短那欄的**最後一張卡**長高補齊，兩欄底部對齊（2026-11-25，Candace：Orders awaiting confirmation、Team activity this week、Strategic accounts gone quiet）。經理的配額卡｜Waiting on you、Sales Head 的 Largest deals｜Strategic accounts 也底部對齊。單欄（≤1180px）時不長高。
- **清單列（Deals、Largest deals）**：右邊只放金額；標籤放在說明文字下面，靠左一行。人名不斷行（`.nb`）。
- **顏色門檻**：Won vs target 低於今天的季度進度才紅（跟 Sales performance 的 Behind pace 一樣），Coverage 低於 1.8× 紅，Need attention 5 以上標示；合計列套同一套；門檻寫在表格下方。
- **不能點的列**：Home 的 By salesperson／By sales team 不用手指游標、不加 hover 底色，列高 64px。
- **數字要有單位**：Team activity 寫「1 activity」，副標寫 Low = 1 or fewer。
- **Gap to target** 超前時標題改「Ahead of target」。My tasks 的旗子圖示有說明「Next step on an initiative」（提示框＋報讀文字；副標仍寫「Next step · 商機」）。
- **精簡篩選列**從左邊開始，Export 在最右邊。
- **提示框**只給滑鼠移入和鍵盤聚焦；觸控點按鈕、連結不顯示。有虛線的說明文字（`.def`）沒有別的動作，手機點了仍會顯示，點別處就關。停用的按鈕在手機點了用 toast 說明原因（Accounts）。
- **勾選框**（Home、Tasks）點擊範圍 40×40px（`.ck40`），框維持 16px。
- **表格變卡片（By salesperson／By sales team）**：手機上合計放最上面，每人一列：名字、百分比、進度條、兩行小字。
- **篩選面板**：從篩選列移進來的也是標籤在上、方框只放值。
- **副標**用 `CRM.dots()`：每段不換行，「·」跟在前一段後面。
- 手機：通知選單在抽屜寬度內往上展開；滿版側邊面板沒有圓角。

## 16. Customers：Contacts（2026-11-25）

- 1100px 以下點一個人，詳細資料從右邊滑出（`.drill.cp-panel`，跟 Tasks 一樣；Esc、×、點外面都能關，名單位置不動、焦點回到那一列）；以上維持右欄。
- 手機的人員列：名字＋狀態，下面是角色和 Email。商機的標籤放在名稱下面。
- Log call／Log meeting 開 `activities.html?log=<客戶>&who=<人>&type=<類型>`，記錄面板帶入客戶、聯絡人、類型。停用的按鈕點了用 toast 說明原因。
- 客戶名稱（分組標題、面板）連到 `accounts.html?q=`；Edit 是有文字的按鈕。
- 「沒有決策者」的篩選用篩選列的勾選鈕「Show only no active decision maker」，跟 Tasks 的「Show completed and cancelled」同一個元件（`.ftog`，在 crm.css），取代舊版的黃色提示條和按鈕（2026-11-25，Janet）。
- 照舊版：Role 篩選六種（加 Primary contact、Other）、部門提醒依 Finance／Procurement／IT 職稱、停用聯絡人且客戶沒有主要角色時提醒。沒有「Open full profile」（還沒有聯絡人頁）。
- 維持新版：List 用表格、分組標題寫「3 contacts」。分組標題只標缺的：沒有決策者顯示驚嘆號「Needs a decision maker」，有的不顯示標籤（2026-11-25）。

## 17. Customers：Customer orders（2026-11-25）

- 內容照舊版 CRMpulse `/orders`，排法用比較後選定的 Option A（2026-11-25）：狀態卡、搜尋（訂單／PO／客戶）、Order date（年度和季度）、一張訂單表、總計列（未取消）、訂單面板、Register historical order。
- **上方卡片**同 Sales initiatives：藍底「Current」放 All current、Draft、Open、Completed、Cancelled（Draft 寫「$ not yet counted in customer value」），白底「Historical」獨立一張、不算進 All current；點卡片篩選表格，取代舊版的等 PO 卡片、頁籤和底部收合區。表格預設等 PO 的排最前、等最久的在最上面，PO 欄寫「Waiting N days」「Confirm PO ›」，超過 30 天紅色。登記歷史訂單後自動切到 Historical。
- 其他照列表頁規則：64px 列、點整列開側邊面板；總計列、頁碼、手機卡片用共用樣式（`.tbl.totals`、`.drill.tf-panel`、`.tf`）。表頭可排序（Order、Order date、Order value）。
- **訂單面板**：進度 Draft → Open → Completed、Won／Order value／Difference、PO 欄位；缺 PO、日期、日期在未來、或金額不同但沒選原因時，Confirm order／Mark completed 不能按，並寫出還缺什麼。改過內容關閉前先問。取消 Open 訂單要填原因（`CRM.confirm` 的 `field`），取消後不能恢復。
- **權限**：照 Sales Head：看全部訂單、可登記歷史訂單（舊版 HISTORICAL_ORDER_ROLES 含 Sales Head）。其他角色也一樣（§3 角色規則）。
- **資料**：每筆成交一張訂單（`ORDERS`），草稿就是 Home 的 `DRAFT_ORDERS`（4 筆 $525.0K，同一編號；`PO_RECEIVED` 的兩筆已有 PO，算 Open）。幣別用 `accCurrency`、匯率用 `FX`。**Accounts 的 Customer value 改為只算已確認的訂單**（Open／Completed，含歷史訂單，以 PO 金額計），草稿不算。
- `?open=ORD-…` 直接打開那張訂單。

## 18. Customers 的新增表單（2026-11-25）

- 三頁的表單共用 `CRM.openPanel(v, draw, 標題)` 和 `CRM.form`（`fld`、`pick`、`inp`、`head`、`put`），都在 crm.js：右側面板、改過內容關閉前先問、手機滿版。**輸入時要更新面板的一部分就用 `put()`**（內容沒變就不重畫）；直接改 `innerHTML` 會讓「打完字直接按按鈕」失效。
- **New account**（欄位照舊版）：只有名稱必填；打字時列出相似的客戶，第一次按會擋下、再按一次「Create anyway」才建立。建立後是 Fresh、待審核，Log activity 和 New initiative 停用，並跳到那筆所在的頁。Owner、Strategic、Customer since 只有 Sales Manager 以上能改。
- **New contact／Edit**：客戶、名、姓必填；選客戶後列出已有的聯絡人，角色卡寫出目前是誰；職稱和部門不合、Email 網域不同會提醒，Email 重複不能存；同客戶同名要按「Create anyway」。新增可以「Save & add another」，編輯可以取消 Active，客戶不能改。
- 舊版的選項膠囊：Account Type 用全站的切換鈕（再點一次取消），Department 有六個選項改用下拉。

## 19. Customers 對照 design review（2026-11-25）

- 手機總計放列表最上面；列表下方不寫顏色門檻說明（舊版沒有，2026-11-26 拿掉，§7.10）；只有一個篩選時不做面板（`data-keep`）；歷史訂單列只放狀態標籤，列高 64px。
- 手機列表卡（Sales initiatives、Tasks、Accounts、Customer orders）還是一筆一張大卡；要改成精簡列就全站一起改，目前先不動。

## 20. Plan & report：Sales targets、Reports（2026-11-26）

- 兩頁放進側邊欄（`BUILT`）；Sales targets 只有 Sales Manager 以上看得到，Reports 所有角色都有。
- **Sales targets**（舊版 `/targets` 的資料架構；大標跟側邊欄一樣叫 Sales targets）：搜尋、FY25-26／26-27／27-28、九個維度一個分頁（各自規劃、不加總）、Q1–Q4 目標和每季成交與 %、年度目標、達成、%。
  - 照列表頁規則：拿掉鉛筆欄，**點整列**打開側邊面板：四季的目標、備註、編號和修改紀錄，下面有 Edit。編輯四季金額、備註、新目標的幣別；清空一季要先確認刪除；改過內容關閉前先問。
  - 誰能改：照舊版 Sales Head，全部都能改；其他角色也一樣（角色規則）。
  - 顏色跟 Sales performance、Home 同一個標準（design review 第三輪，2026-11-26 改，不再照舊版）：達成 100% 綠色；**低於今天的進度紅色**；跟上進度但還沒達成黃色。進度＝期間已過的比例：已結束的季度 100%、進行中的季度用今天的進度、還沒開始 0%；全年是四季平均。表格下方不放說明（舊版沒有，2026-11-26 拿掉）。Revision history 照舊版格式「create／update by 誰 · 日期」。
- **Reports**：目錄頁跟 Accounts、Customer orders 一樣——七張分組卡篩選下面**一張表格**（Report、Group、Report-specific filters，欄名照舊版用詞），表格不再依組分段加小標題（2026-11-26）；搜尋在篩選列；整列打開那份報表。
- **單份報表 `report.html?id=…`**：返回 Reports 的連結、標題、說明 · 期間 · USD；篩選列放搜尋、年度、季度、業務、團隊，More filters 放地區和報表專屬篩選（Main status、State、Classification），最後是 Details 和 Export（Excel／CSV）。這列比較長，**1499px 以下就用精簡篩選列**（`data-compact`）。摘要數字放在頁首右上（同 Home 的頁首 KPI，數字頂端跟標題對齊；≤1360 排到標題下面），不顯示「N rows」，表格可排序、每頁 20 筆；代表單一紀錄的列整列可點（商機、活動、任務、訂單），彙總列不能點。
- 對照 design review（2026-11-26）：報表列高 64px（原本 56px）；Export 選單在手機上每項 44px，hover 只給滑鼠（`@media (hover: hover)`）。Sales structure 的列也是 64px（名稱＋代碼）。
- 報表數字用本站資料計算，跟各頁一致：Open pipeline 等於 Pipeline & forecast；全公司的紀錄（照 Sales Head；角色只影響 Home 和側邊欄）。

## 21. Setup：Sales structure（2026-11-26）

- 放進側邊欄（`BUILT`）；跟舊版一樣只有 Sales Head 在側邊欄看得到。大標 Sales structure，說明照舊版。
- **完全照舊版 Sales Head 看到的畫面：只能看**。舊版的 New、Edit、History、分類卡片的新增值，都只給 Administrator；本站已經沒有 Administrator，所以這頁沒有任何新增或編輯（2026-11-26 確認）。也沒有搜尋、分頁器、列點擊，因為舊版沒有。
- **舊版的四個分頁**，分頁上有數量：Sales teams、Geographies、Regions 是表格；**第一欄是名稱、代碼在下面**（手機卡片標題就是名稱）。人名欄照 §7.8：Team manager、Geography／Region head 頭像＋名字；Members 用重疊頭像＋全部名字（舊版列出全部成員）。
- **Sales classifications 照舊版卡片**：每個分類一張，名稱、代碼、Mandatory，說明 · Values filtered by；列出全部值（代碼、名稱，Offering 右邊是所屬 Practice），卡片底下有舊版那句「Values used by records cannot be deleted; deactivate them instead.」。1280px 以上兩張一排，**同一排的卡片等高**，底下那句貼齊卡片底部。這頁沒有任何連結，表格列沒有 hover 效果（§7.9）。卡片網格沒有自己的左右 padding，卡片跟分頁左邊對齊。
- **Sales classifications 全站照舊版的值**（2026-11-26，`crm-data.js` 的 `CLASSIFICATIONS`）：SBU 3、Practice / Service Line 5、Offering 10（依 Practice 篩選）、Technology 4、Vertical 5，代碼和順序同舊版。商機的分類（`sellOf`，記錄頁、新增頁、Sales initiatives 篩選、Sales targets、Reports 共用）都對應到這些值；Technology、Vertical 可以未設定。帳戶的 Industry / Vertical 也用 VERTICAL（舊版帳戶表單）：Pharma 歸 Healthcare，物流、港口、設施公司沒有對應值，顯示未設定。商機名稱裡的服務名（例如 Field Service App）不變，Offering 欄位是分類值。
- **團隊、成員、地區全站照舊版**（2026-11-26，`crm-data.js`）：`TEAMS[].members` 是舊版成員（Rajesh Kumar、Omar Haddad 各在兩個團隊，`PERSON_TEAM` 取第一個）；`TEAM_MANAGER` 照舊版，只有 APAC Sales 是 Gaurav（取代 Kevin Lim，示範帳號的 Sales Manager 視角要有團隊；他不是成員，但跟以前一樣自己也賣，所以 `TEAMS[].people` 是成員加上他，儀表板的業務名單用 people）。原本的 Karthik Menon 改名 Rajesh Kumar（商機、目標、照片不變）；Sneha Nair、Fatima Al-Zahra 沒有商機和目標，業績頁顯示 No target。地區 `SALES_REGION` 是舊版 7 個（India North／South；Oman、Saudi Arabia、UAE；Malaysia、Singapore），代碼和 head 照舊版。
- 表格下方不放說明（§7.10）。
