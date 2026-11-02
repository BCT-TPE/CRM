# BCT CRM — AI-first concept (on the Gina UI base)

BCT in-house CRM 的 B 情境原型：BCT 自己的網頁，固定 UI 加內建 AI 對話。以 Gina UI（`gina-ui 2`）的 Minimalism 商業版為底，換成 BCT 品牌，內容改為 CRM 的三個情境。

## 檔案

| 路徑 | 說明 |
|---|---|
| `index.html` | 單頁原型：側欄、首頁、對話、輸入框、右側紀錄面板 |
| `bct-crm.css` | BCT 品牌 token 覆寫，以及 CRM 專用元件（來源 chip、確認卡、圖表、任務、紀錄面板） |
| `crm.js` | 三個情境的腳本回覆與互動；全部是虛構資料，沒有後端 |
| `chat-export.js` | 匯出對話，改自 Gina 的同名檔：英文介面、來源 chip 文字保留、每則回答附上來源，CRM 區塊（案子列、任務、數字卡、寫入確認、草稿、圖表）轉成可讀的行 |
| 首頁動態（`home-motion.js`） | 第一次打開：泡泡像水滴落下並泛起漣漪，問候語和卡片依序浮現（約 0.8 秒）；之後回首頁只淡入。滑鼠移到卡片上：卡片浮起、圖示做一個小動作，泡泡朝那張卡傾斜、波浪跟著晃。點卡片或從首頁送出問題：泡泡換思考表情，畫面淡出，泡泡縮小飛到對話裡 AI 小頭像的位置 |
| Workspace 精簡（2026-10-28，方案 B） | 側欄 Workspace 只留 Pipeline、Accounts、Reports。Leads 併進 Pipeline，變成看板上方的「Leads」那一排（New company／Matches ACC-0214／Replied 標記，點了助理會講這筆 lead）。Tasks 頁拿掉：今天的待辦放在首頁卡片下方「Today」（可勾選、Show my week 開對話看本週），其他待辦出現在案子或 lead 的簡報「To do」和紀錄面板裡，各處勾選會同步。Leadership dashboards 從側欄拿掉，Reports 底部有一行說明 Phase 2。Accounts 拿掉混在裡面的 lead 那一列 |
| Accounts 頁（2026-10-28，提案 B 精修表格） | 頁首和 Reports 同一套：細字大標題、篩選（All／Oman／UAE／India／Needs attention，可用）、右側三個大數字。上方一條 AI 洞察，「Show them」篩出需要處理的客戶。表格放進 20px 圓角白卡，欄位是公司色塊、主要聯絡人頭像、細字大數字金額、60 天活動條碼、狀態標籤和下一步；負責人不是自己才顯示。整列可點（也可用 Enter），右側紀錄面板多了 Deals 和 To do。紀錄面板開著時活動條碼欄會收起 |
| 首頁（2026-10-28，提案 A 今天優先） | 問候語下面是 AI 的一句今日簡報；接著是 Today 清單（逾期報價、11:00 通話、回覆 Faisal 的新 lead、16:00 demo，可勾選，「Draft reply」直接開對話起草）；四張情境卡改成一排建議問題（Log a meeting、How's my quarter?、Qamar Energy pipeline、Draft a follow-up），點了一樣有泡泡飛進對話；釘選的 Q4 數字縮成一條細列，點了進 Reports。內容變高後改用上下 auto margin 置中，矮螢幕和手機不會切到頂部 |
| 輸入框 | 下方只剩麥克風和送出。附加檔案用拖曳：拖到輸入框出現「Drop to attach」，放開後檔案顯示在輸入框上方，可移除，送出後出現在使用者訊息上 |
| Pipeline 頁（2026-10-28，提案 B） | 頁首是簡化的等角插圖，右側是常駐的 deal assistant：點看板卡片，助理換成這筆案子的摘要、60 天活動條碼和下一步，不再滑出紀錄面板。助理自己的輸入框、「Ask me anything」、Quick actions 和上方那排小標都已拿掉；AI 入口只有標題列的「Ask about this page」 |
| 在頁面上問 AI（`page-ask.js`，2026-10-28） | Workspace 頁沒有底部輸入框。標題列右側「Ask about this page」是頁面上唯一的 AI 入口，會開一則新對話，輸入框上方有藍色 chip「From Reports · Q4 2026 · Mine」（可移除），標題列左邊「‹ Reports」回到原本的頁面。會改到頁面的回答附「Apply to Leads／Add to Tasks／Add to Reports」按鈕，按了才回到頁面套用，變動處閃一圈藍框，toast 可 Undo。示範：在 Pipeline 問「Which new leads need a reply?」→「Add a task: call Faisal on Thursday」→「Add to Faisal's lead」，回到 Pipeline 打開 Al Dhafra 的簡報、新待辦亮框；Reports 加「Open pipeline by region」卡（卡片右上 × 可移除）。對話列在側欄、用該頁圖示，標題是「頁名 · 第一個問題」；開了沒問就離開的對話會自動丟掉 |
| 側欄寬度 | 拖曳側欄右緣調整（200–420px），雙擊或 Home 鍵還原 252px，方向鍵每次 16px；寬度存在這個瀏覽器（localStorage `bct-crm-sidebar-w`）。手機版不顯示。做法來自 Gina |
| Reports 頁（2026-10-28，提案 C 版面、B 配色） | 頂部四個大數字和 Q4 snapshot 完全一樣（Open pipeline、Q4 forecast、Won last 90 days、New leads this week），「Pin these numbers to home」釘的就是這四格。下面的卡片只補細節不重複數字：To target 儀表（中間是還差 $400K，下方 Committed／Best case／Weeks left）、案型分段、洞察、60 天活動（下方加「Where your time went」：各客戶佔活動 % 對照佔 pipeline %，時間給得比金額少的標紅，點列開客戶紀錄；標題右邊有圖例）、Won and lost 清單、本週關鍵聯絡人、本月要結的案子、各階段天數。「Ask for a report」拿掉了；標題從問候語改成「Reports」，問候只留在首頁 |
| Tooltip（2026-10-28，`tooltip.js`） | 全站共用一個黑底 tooltip（`.bct-tip`，Gina 已經有 `.tip`）。兩種：數值型掛在圖上（Activity 每一天、案型分段、To target 儀表、各階段天數、Accounts 每列的 60 天條碼、首頁釘選的四個數字）；說明型掛在標題和欄位名（虛線底線，可用 Tab 聚焦）。停 300ms 才出現，滑到下一個直接換、不重淡入；滑走、捲動、Esc 立刻收；手機點一下顯示。Activity 每天的數字加總剛好是 142 emails、31 meetings |
| 回到首頁的轉場（2026-10-28） | 從 Workspace 或對話按 New chat 回首頁：頭像、問候、Today、建議依序淡入上升（約 0.5 秒），沒有第一次進來的水滴落下和漣漪。不論第一次或回來，全部落定後頭像都會做一次點擊時的動態（笑臉、水波、水滴）當作打招呼 |
| 設計系統與離線版（2026-10-28） | `docs/design-system.html`：顏色、字體、數字列、按鈕、狀態標籤、AI 助理、Tooltip、卡片、動態、文字規則；直接載入 prototype 的樣式表，範例都是實際元件。Inter 改用本機檔 `vendor/fonts/`（@fontsource/inter 5.3.0，400–700，OFL），不再連 Google Fonts，雙擊 index.html 離線也能看。給外部的 zip 只放 prototype 和設計系統，不含提案頁、原始素材和沒用到的圖。首頁問候改成墨色（黑） |
| AI 形象與頭像 | AI 是「波浪泡泡」（提案 5，2026-10-28）：`assets/ai/ai-face.webp`（一般）、`ai-face-think.webp`（思考中）、`ai-face-happy.webp`（完成）。首頁（96px）和 Pipeline 助理卡是可以點的按鈕（`ai-face-motion.js`）：閒置時波浪非常慢地起伏、每 2.5 到 5.5 秒眨一次眼；點一下（或鍵盤 Enter）濺水花，波浪晃動約一秒後平息，同時笑臉、漣漪、水滴。只有波浪那一層會扭動，臉不會變形。開啟「減少動態效果」時只換笑臉。對話中開場那句和打字中、「Saved」「Linked」確認都帶小頭像。側欄使用者、看板卡片、聯絡人紀錄用插畫頭像 |
| `views.js` | Classic views：Leads 清單、Pipeline 看板、Accounts 清單、Tasks 清單、Reports 四張報表。用同一批資料，點列或卡片開右側紀錄面板 |
| `vendor/gina/` | 從 `gina-ui 2` 原封不動複製的 `tokens.css`、`app.css`、`app-business-v2.css`。**不要改這裡**，要改就在 `bct-crm.css` 覆寫 |
| `assets/gen/` | 為 BCT 生成的素材（2026-10-27）：等角白模插圖、AI 玻璃球、四張插畫頭像，網頁用 webp；`src/` 是原始高解析 PNG。只借 Gina 的做法和 token，沒有用 Gina 的素材 |
| `docs/ai-avatar-proposals.html` | AI 頭像提案（波浪泡泡）：上半部表情、下半部 logo 波浪，上淡下重。靜態 3D 三款（`assets/ai/bubble-0/1/2.webp`，Higgsfield 生成）＋程式繪製的動態版（閒置／思考中／完成） |
| `assets/ai/` | `bct-wave.svg` 是從 logo 抽出的波浪圖形；`ai-wave-3d.webp` 是 C 的 3D 版本，原始檔在 `src/` |
| `docs/home-proposals.html` | 首頁提案（2026-10-28）：A 今天優先（AI 今日簡報、Today 清單、建議問題、釘選數字縮成一條）、B 數字優先、C 極簡（輸入框置中）。可切換、可勾選待辦、可重播動態 |
| `docs/accounts-proposals.html` | Accounts 頁提案（2026-10-28）：A 客戶卡片牆、B 精修表格、C 清單加 AI 簡報，同一組四個客戶，頁首改成和 Reports 一樣的大數字。可切換、可點、可重播動態 |
| `docs/classic-views-proposals.html` | Classic views 提案示意頁：A 洞察頁首、B 頁內助理、C Bento 報表，可切換「平實／精緻」 |
| `assets/fav.svg` | 分頁圖示，BCT 的波浪標誌 |
| `assets/bct-logo.svg` | 從 `BCT logo - Colour-1.svg` 裁切出的 logo（原檔是一整頁的 viewBox） |

## 和 Gina 的對應

| Gina | BCT CRM |
|---|---|
| 側欄 Agents 列（26px icon tile） | Classic views（側欄顯示為「Workspace」，2026-10-28 改名；文件和程式註解仍叫 Classic views）：Leads、Pipeline、Accounts、Tasks、Reports，都是真的畫面（`views.js`）。2026-10-28 精簡成 Pipeline、Accounts、Reports；AI 入口只有標題列「Ask about this page」；篩選 chip 是擺設 |
| 首頁今日卡 | 四個情境入口（2×2）：問這一季、查 pipeline、記錄會議、今天要做什麼 |
| — | 回覆節奏（參考 Claude Duet 影片 0:16–0:21）：先一句說要去哪裡拿資料，打字中，答案分段淡入，數字 count-up。程式在 `crm.js`「Answer rhythm」、樣式在 `bct-crm.css` 第 10 節，整段拿掉即可還原 |
| — | Q4 snapshot（2026-10-28 改成 Reports 樣式：細字數字加上標單位、青色膠囊、白卡細框、圓角 20px；聊天、首頁釘選、Reports 頂部是同一套）：問「How's my quarter looking?」得到四格數字卡，可釘選。釘了之後出現在首頁和 Reports 頁頂端，標示每天 06:00 更新；狀態存在 localStorage |
| — | 「今天要做什麼」裡多了「New website leads」區塊（Sundar 10/22 要求的網站 lead 進 CRM）：查重結果用 flag 標示，撞到既有 Account 時出確認卡「Link to OPP-1066 / Keep as a new lead」，可 Undo |
| 輸入框工具開關（網路搜尋、個人知識、Skills） | AI 可讀的資料來源：Email、Calendar、Files |
| 回覆上方的「執行步驟」 | 「Based on …」來源清單：每個答案交代用了哪些紀錄、信件、會議 |
| 回覆下方的互動選項 | 圖表選項、追問建議 |
| 對話標題列右側「匯出」 | 對話標題右側「Export」，選 .txt 或 .md 下載。Classic views 也用這條標題列，但沒有對話可匯出，所以隱藏 |
| 帳號選單（側欄最下方） | 頭像、姓名、OneLogin 登入狀態；「The assistant can read」三個開關（Outlook、Teams 行事曆、SharePoint），關掉後輸入框對應的來源按鈕會變灰；每日簡報開關；說明與快捷鍵；登出。樣式沿用 Gina 的 #pop-user |
| 對話列 ⋯ 選單 | Rename、Pin / Unpin、Export conversation、Delete（可 Undo）。側欄只留四筆能打開的對話，沒有內容的佔位對話已拿掉。改動只在這次瀏覽有效，重新整理回到示範清單 |
| — | 從側欄點過去的對話直接顯示，不重播打字動畫；首頁卡片和輸入框發問才會有動畫 |
| 長篇內容檢閱面板（右側） | 紀錄面板：點來源 chip 滑出 opportunity / 聯絡人 / lead 詳情，也就是傳統 UI 那一層。Lead 面板列出表單欄位（聯絡人、職稱、email、電話、需求、來源頁、送出時間、查重結果），可拿去和 Christina / Nagarajan 對欄位 |

## 預覽

靜態檔案，不需要建置：

```bash
cd /Users/candace/code/CRM && python3 -m http.server 5394
```

打開 http://localhost:5394/bct-crm-ui/

## 更新 Gina 底層

Gina 的 CSS 改版後，重新複製三個檔案到 `vendor/gina/` 即可；BCT 的覆寫都在 `bct-crm.css`，選擇器都掛在 `body.business-theme.bct` 之下。

## 和 connector 對齊的內容（2026-10-28）

網頁原型的對話回覆和 `bct-crm-mcp` connector 的卡片，資訊和內容一致；外觀可以不同（connector 的外框由 Claude 決定，按鈕是黑色膠囊）。

- **Q4 snapshot**：四個數字相同，說明改成「1 closing this week」。
- **Which deals need my attention this week?**：新的回覆，和 connector 同樣 4 個案子、同樣原因標籤（1 day late、Closes Monday、Due today、Quiet 32 days）和按鈕（Draft pricing email、Prep checklist、Prep for the call、Draft follow-up to Hana）。輸入含 attention、at risk 的問題會走這一則。
- **記錄會議**：4 筆變更（Activity、Next step、Budget、New task），按鈕「Confirm all 4」；Undo 之後顯示回到什麼狀態，「Review again」回到確認。
- **Data Lake 安靜天數**：改成 32 天（20 Sep 到示範日 Thu 22 Oct）。
- **新 lead 查重**：兩邊都寫「Matches existing account」。
- **還沒對齊**：網頁原型的日期固定在 10/22 的故事；connector 的日期跟著今天走。

## BCT 同事（真人照片）

照片在 `assets/people/`（原檔在 `src/`），由 Candace 提供，只裁切沒有修圖。

- **Sundara Balaji**：Muscat Municipality 的負責人（取代原本的 Priya Nair）。Accounts 表格的負責人標籤和紀錄面板的 Owner 會顯示照片。
- **Gaurav Shrotriya**：登入的示範使用者（2026-10-28 起，原本是插畫頭像的 Sheldon Cooper）。左下角、帳號選單、首頁問候、Owner、My deals 都是他。
- 客戶頭像換成免費圖庫的真人照片（不要卡通）。候選頁在 `docs/customer-photo-candidates.html`，用編號挑選，選中才下載。
- **客戶照片（2026-10-28 全部換完）**：都在 `assets/people/`（256px），原檔在 `src/`。全部來自 Unsplash，採 Unsplash License（可免費使用，不需標註作者）。用臉部自動裁切取得頭肩構圖，並確認沒有同一個人重複出現。

| 客戶 | 候選編號 | Unsplash 攝影師 |
|---|---|---|
| Hana Al-Rashdi | W7 | @fzeo |
| Maryam Al-Lawati | W14 | @ivanbe |
| Noura Al-Shamsi | W16 | @gemasaputera |
| Omar Haddad | G7 | @silverkblack |
| Khalid Al-Riyami | G5 | @silverkblack |
| Faisal Al-Mazrouei | G15 | @aljannatrakin |
| Salim Al-Busaidi | G3 | @babak22ir |
| Said Al-Hinai | G16 | @levimeirclancy |
| Rajesh Kulkarni | I11 | @silverkblack |

- 原本建議的 Faisal（G14）戴墨鏡、Salim（G9）和 Rajesh 疑似同一位模特兒，所以改用 G15 和 G3。
- Data Lake 的 Deal team 改成 Sundara Balaji（pre-sales，一起帶 9/20 的 workshop），因為 Gaurav 現在就是負責人。connector 卡片裡的客戶目前還是姓名縮寫；connector（bct-crm-mcp）的示範使用者還是 Sheldon。

## Pipeline 篩選（2026-10-28）

- **My deals / All deals**：二選一。My deals 只顯示 Gaurav 的案子；All deals 會多出 Sundara Balaji 負責的 Muscat 案子，卡片上有負責人照片。
- **Services / Resell / IP / KPO / BPO**：點一下篩選，再點一次取消。案型包含那個字就算，所以「Resell + Services」兩邊都會出現。
- 每個按鈕顯示筆數，欄位標題的筆數和金額會重算；空的欄位顯示「No deals」。Leads 那一排不受篩選影響。
- 離開 Pipeline 再回來，篩選會保留。「Ask about this page」帶過去的頁面資訊也跟著篩選。
- 已知落差：頁首寫「6 open deals worth $2.55M」，包含 Sundara 的案子；My deals 篩選只顯示 5 筆進行中的案子。
