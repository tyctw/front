import { ArrowRight, BadgeCheck, BookOpenCheck, CalendarCheck2, CheckCircle2, CircleAlert, ExternalLink, FileSearch, GraduationCap, Lightbulb, MapPin, Newspaper, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { BackButton } from "./BackButton";

const officialLinks = [
  { label: "國中教育會考官方網站", href: "https://cap.rcpet.edu.tw/", note: "成績查詢、簡章與考試公告" },
  { label: "教育部國教署", href: "https://www.k12ea.gov.tw/", note: "會考與適性入學政策公告" },
  { label: "五專招生資訊", href: "https://www.techadmi.edu.tw/edutype.php?type=3", note: "五專各招生管道與簡章" },
  { label: "教育部法規：免試續招", href: "https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001338", note: "續招的辦理原則與資格限制" },
];

const alternativeCards: Array<{ title: string; text: string; icon: LucideIcon; color: string }> = [
  { title: "先向原國中求助", text: "找註冊組、導師或輔導老師確認你的目前資格、已錯過與仍可參加的管道。他們能協助核對校內送件、成績與身分資料。", icon: ShieldCheck, color: "text-sky-600" },
  { title: "查免試續招", text: "部分高中職在主要入學管道後仍有缺額，經核准可辦理免試續招。是否有名額、可否跨區與報名限制，均以當年度簡章為準。", icon: BookOpenCheck, color: "text-emerald-600" },
  { title: "檢視五專機會", text: "五專有完全免試、優先免試與北／中／南區聯合免試等管道，時程彼此不同。已過的管道無法補報，請直接查當年度剩餘招生或續招公告。", icon: GraduationCap, color: "text-amber-600" },
  { title: "了解其他適性管道", text: "依資格與時程，可能還有特色招生、技優、實用技能學程或學校單獨招生等選項；不是每位學生都適用，也不是每年都在同一時間辦理。", icon: Lightbulb, color: "text-violet-600" },
];

type ArticleMeta = { id: string; tag: string; date: string; title: string; subtitle: string; description: string; points?: string[] };
type ArticleSection = { heading: string; lead: string; items: string[] };

const articleLinks: ArticleMeta[] = [
  { id: "after-results", tag: "放榜流程", date: "116 學年度", title: "放榜後流程", subtitle: "查到錄取校科後，第一天先完成這 6 件事", description: "別讓一時興奮或緊張漏掉期限：從核對結果、看公告到完成報到，照著清單就能安心往下一步走。" },
  { id: "how-to-check", tag: "查榜攻略", date: "116 學年度", title: "查榜入口", subtitle: "你被分到哪一間？查到志願選填結果的正確入口", description: "從當初選填的就學區出發，避開錯誤連結；一次看懂怎麼找到自己真正的錄取校科。" },
  { id: "admitted", tag: "錄取後", date: "116 學年度", title: "錄取後待辦", subtitle: "恭喜錄取！報到前最容易漏掉的 5 個關鍵", description: "錄取只是開始。文件、到場規定、校方通知與放棄程序，這篇幫你在期限前逐項確認。" },
  { id: "not-admitted", tag: "升學備案", date: "116 學年度", title: "升學備案", subtitle: "結果不如預期別急：還有哪些升學選擇？", description: "先釐清目前資格，再找續招、五專與其他正式管道；把焦慮化成一張清楚可執行的下一步清單。" },
  { id: "result-day", tag: "查榜攻略", date: "116 學年度", title: "放榜當天", subtitle: "放榜那一刻，先別急著分享：3 件事比轉傳更重要", description: "先核對姓名、校科與報到公告。花十分鐘做好這些確認，能避免後面最常見的遺漏與誤會。", points: ["使用正式系統確認姓名、校科與錄取狀態。", "記錄報到期限、方式與聯絡窗口。", "遇到資料疑義，直接向招生委員會或錄取學校確認。"] },
  { id: "registration-documents", tag: "錄取後", date: "116 學年度", title: "報到準備", subtitle: "報到當天別白跑：文件包與必問問題一次備好", description: "每間學校規定不同；先把公告變成自己的勾選清單，帶對資料、問對問題，報到更從容。", points: ["逐項閱讀錄取學校的新生與報到公告。", "確認本人、家長或代理人到場的規定及證明文件。", "不確定的資料先向承辦單位詢問，不要用去年的清單猜測。"] },
  { id: "continued-enrollment", tag: "升學備案", date: "116 學年度", title: "續招說明", subtitle: "沒錄取還有機會嗎？看懂免試續招前必讀", description: "續招不是保證的第二輪分發。從名額、資格到報到限制，先讀完這篇再決定要不要行動。", points: ["先確認該校是否已公告核准的續招簡章與名額。", "已在其他管道錄取並報到者可能受限制。", "不要錯過簡章上的報名、放榜及報到期限。"] },
  { id: "admission-status", tag: "查榜攻略", date: "116 學年度", title: "錄取狀態", subtitle: "畫面出現「錄取」就夠了嗎？4 個欄位一定要看", description: "校名之外，校區、科別、狀態與報到公告都要核對；把結果看完整，才能放心準備高中生活。" },
  { id: "result-question", tag: "查榜疑義", date: "116 學年度", title: "結果有疑義", subtitle: "查榜結果和預期不同？先做這些確認最有效", description: "別急著猜系統出錯。保存畫面、對照志願表、找對官方窗口，才能在期限內把問題問清楚。" },
  { id: "withdrawal", tag: "錄取後", date: "116 學年度", title: "放棄資格", subtitle: "已錄取卻想換路？放棄資格前先避開這些風險", description: "不去報到不等於完成放棄。先確認新選擇、期限與正式程序，再做對自己最有利的決定。" },
  { id: "new-student", tag: "錄取後", date: "116 學年度", title: "新生銜接", subtitle: "報到完成還沒結束：開學前的新生待辦總整理", description: "從編班、制服到健康檢查與交通安排，把暑假的新生通知整理好，第一天上學更安心。" },
];

const detailedArticleIds = new Set(["after-results", "how-to-check", "admitted", "not-admitted"]);

const articleBodies: Record<string, ArticleSection[]> = {
  "volunteer-checklist": [
    { heading: "選填前：先做好研究而不是先排序", lead: "選填前最值得花時間的是理解學校與科別。確認課程、升學方向、實習安排、交通及校園環境，才不會把志願表變成純粹的分數排列。", items: ["建立一張比較表：校科名稱、距離、課程特色、升學或就業方向、你在意的問題。", "參考招生簡章與學校官方網站，不只看社群貼文或補習班整理。", "安排和家人討論可負擔的通勤與住宿選擇。"] },
    { heading: "選填中：留意系統與紙本程序", lead: "不同就學區的系統操作與國中端交件方式可能不同。即使線上已儲存，也要確認是否需要列印、家長簽名或校內送件。", items: ["第一次登入就確認帳密與驗證資料是否正常。", "截止前至少預留一次完整複查與修正的時間，不要最後一刻才操作。", "完成後保存志願表、確認畫面與學校要求的收件證明。"] },
    { heading: "送出前最後一次自我檢查", lead: "問自己：這個排序真的反映我的意願嗎？若前幾個志願都錄取，我願意去讀嗎？這比「別人怎麼排」更重要。", items: ["核對志願順序、校科代碼與學校名稱。", "確認保守選項也是真正願意就讀的選擇。", "把放榜與報到日期寫進行事曆，選填完成後也不要錯過下一關。"] },
  ],
  "result-day": [
    { heading: "查榜前 10 分鐘：先準備，不要搶快", lead: "放榜時系統可能湧入大量查詢。準備好官方網址與必要資料，在安全網路環境中操作，比轉傳不明連結更可靠。", items: ["從招生委員會、國中公告或官方頁面進入系統。", "準備准考證號或系統要求的驗證資料，避免反覆輸入造成鎖定風險。", "不要把身分驗證資料傳到群組或請他人代查。"] },
    { heading: "查到結果後：先確認三件事", lead: "先確認錄取狀態、學校與科別，再看後續報到公告。截圖可以留存，但正式文件與校方通知才是下一步依據。", items: ["核對姓名、錄取校科及顯示的狀態。", "開啟錄取學校公告，確認報到時間、方式和應備資料。", "有疑義立刻記錄並聯繫招生委員會或錄取學校，不要只詢問社群。"] },
    { heading: "把情緒與決定分開", lead: "結果出來的當下很容易興奮或失落。先完成保存結果與確認期限，再和家人討論，能避免衝動地忽略應做程序。", items: ["錄取後先看報到規定，再討論慶祝或後續規畫。", "未錄取時先確認仍在受理的正式管道與時間，不急著相信付費代辦或保證入學訊息。", "任何改變原選擇的想法，都先確認放棄資格與其他管道限制。"] },
  ],
  "registration-documents": [
    { heading: "先讀公告，再收文件", lead: "每所學校的報到方式與資料要求不同。與其照著網路上的通用清單打包，不如先把錄取學校的公告逐條抄下來。", items: ["確認報到日期、時段、地點，是否分流或可以線上完成。", "確認報到人身分：學生本人、家長或受委託人是否都可辦理。", "把公告上的每一項資料做成勾選清單，準備正本、影本或照片時依校方說明辦理。"] },
    { heading: "當天容易被忽略的事", lead: "文件齊全只是第一步。報到當天還要確認收件結果、後續新生事項與聯絡方式，才算真正把事情收尾。", items: ["保留完成報到的收據、蓋章文件或系統成功畫面。", "詢問新生訓練、服裝、健康檢查、分班或數位資料填寫的後續時間。", "若需要補件，確認補件的期限、方式與窗口姓名。"] },
    { heading: "需要放棄或變更時", lead: "不要因為沒有到場就假設資格已自動處理。每個招生管道對報到、放棄與改走其他管道的規則都可能不同。", items: ["先向原錄取學校確認正式放棄程序與截止時間。", "確認放棄後是否會影響正在申請或預計申請的其他管道。", "涉及重要決定時，讓家長和學校承辦人一起確認，保留書面或系統紀錄。"] },
  ],
  "five-year-college": [
    { heading: "先理解五專的學習樣貌", lead: "五專是國中畢業後可選擇的專科教育進路，重視專業課程與實作。適不適合，關鍵在於你是否對科別內容與五年的學習安排有興趣。", items: ["先研究科別課程、實習、證照與畢業後可銜接的升學方向。", "不要只用校名或他人推薦選擇，科別內容是否適合自己更重要。", "有疑問可直接詢問招生學校的系科或參加官方說明活動。"] },
    { heading: "三種免試管道的閱讀方式", lead: "完全免試、優先免試與北中南區聯合免試的時程、選填方式與規則不同。最安全的做法是逐一閱讀當年度簡章，不把其中一種規則套用到另一種。", items: ["確認自己符合報名資格及是否需經由原國中集體報名。", "留意各管道的報名、志願選填、錄取與報到期限。", "同時參加多個管道時，先確認錄取與報到後的處理規定。"] },
    { heading: "錄取與備案怎麼安排", lead: "如果想把五專當作主要或備用選項，提早規畫最有彈性。等到高中職結果公布後才開始找，部分管道可能已經截止。", items: ["把五專的重要日期和高中職免試入學時程放在同一份行事曆。", "若尚未錄取理想選項，再確認當年度是否有聯合免試或續招資訊。", "以招生委員會和學校公告的名額、資格與程序為準。"] },
  ],
  "continued-enrollment": [
    { heading: "續招不是人人都有的固定第二輪", lead: "免試續招通常建立在學校於主要招生管道後仍有缺額、並經主管機關核准的前提下。因此有沒有續招、哪些校科開放、何時受理，每年都不同。", items: ["先找核准後的正式續招簡章，而不是只看轉傳名單。", "確認校科、名額、比序方式、報名資料和每一個截止時間。", "了解是否可跨區及是否有國中端協助事項，以簡章為準。"] },
    { heading: "資格限制要先確認", lead: "已在其他招生管道錄取並完成報到的學生，參加續招可能受到限制。特殊情況也可能需要提出證明及取得原報到學校同意。", items: ["先誠實確認自己是否已錄取、已報到或正在處理放棄資格。", "有搬遷或其他特殊因素時，先問原學校與續招學校需要哪些證明。", "不要同時送件後再想辦法處理，資格問題應在報名前解決。"] },
    { heading: "安全的行動順序", lead: "最穩妥的順序是：確認資格、讀簡章、準備資料、準時報名、保存紀錄。遇到不確定的地方，直接問承辦單位。", items: ["保存簡章版本、申請紀錄與收件證明。", "注意放榜與報到日，錄取後同樣要完成程序才算確定。", "避免相信「一定有位子」或付費保證入學的非官方說法。"] },
  ],
  "family-discussion": [
    { heading: "先談感受，再談選項", lead: "放榜與選填期間的壓力很真實。家長先讓孩子說出在意與擔心的事情，往往比立刻給答案更能幫助做出適合的選擇。", items: ["可以問：你最在意的是科別、學校、通勤，還是未來方向？", "避免把孩子和親友、同學或手足比較，這通常無助於決策。", "把一次長談拆成幾次短談，讓每個人都有時間查資料與消化。"] },
    { heading: "用資訊取代猜測", lead: "親子意見不同時，把爭論轉成一起蒐集資料會更有效。以官方課程、招生與交通資訊為基礎，討論可行方案。", items: ["每個人提出想選或不選的理由，寫下來比較。", "安排參觀、說明會或向學校詢問，取得第一手資訊。", "列出可接受的備案，避免只把希望押在唯一選項。"] },
    { heading: "需要外部協助不是失敗", lead: "當壓力、衝突或生涯困惑太大時，輔導老師、註冊組與招生承辦人都是可以使用的資源。", items: ["向國中輔導室詢問適性輔導與升學諮詢時間。", "遇到制度或資格問題，直接問招生委員會，不靠二手說法。", "讓孩子參與最終決定與程序，能幫助他更安心地進入下一階段。"] },
  ],
  "admission-status": [
    { heading: "先確認「錄取的是哪一個校科」", lead: "志願選填結果應回到你參加的就學區分發系統查詢。看到錄取後，先完整核對學校、科別或群別，而不是只看熟悉的校名。", items: ["確認姓名、錄取學校、科別／群別與系統顯示的錄取狀態。", "儲存或列印結果頁面，並保留正式通知與登入資料。", "同名學校、不同校區或不同科別的公告可能不同，請開啟對應頁面。"] },
    { heading: "志願表與結果怎麼對照", lead: "結果就是依照你先前送出的志願表與分發規則產生。若結果不是第一志願，不代表系統出錯；它可能是你在該志願的分發條件未達，因而分到後面的志願。", items: ["拿出最後確認的志願表，找到錄取校科位於第幾個志願。", "不要只問同學錄取哪裡；每個人的志願、比序與身分資料都不同。", "需要理解分發邏輯時，查看所屬就學區的超額比序與分發說明。"] },
    { heading: "錄取後立刻打開學校公告", lead: "查到結果的同一天，就應確認報到資訊。實際報到日期、方式和資料要求由錄取學校公告決定。", items: ["把報到日、時間、地點和承辦聯絡方式寫進行事曆。", "查看是否要先線上登錄、列印表單或完成校內指定流程。", "若家長無法陪同或需要代理報到，提前向校方確認規定。"] },
  ],
  "result-question": [
    { heading: "先排除最常見的查詢問題", lead: "查榜結果看起來和預期不同時，先確認你是否進入正確的就學區系統、帳號資料是否正確，以及看的是否為最新公告頁。", items: ["重新從官方或國中公告連結進入，不使用群組轉傳的未知網址。", "核對登入帳號、身分驗證資料與查詢的招生管道。", "不要反覆嘗試猜密碼或把個資交給他人代查。"] },
    { heading: "把問題整理成可回答的內容", lead: "承辦單位最能協助的是明確問題。先備好正式結果畫面、志願表與你的基本資料，再詢問會更有效率。", items: ["清楚說明：你看到的結果、你想確認的項目與查詢時間。", "保存畫面或通知，但不要公開含有個資的截圖。", "先問原國中註冊組或輔導室，再依指示聯絡就學區或招生委員會。"] },
    { heading: "留意複查與申訴的期限", lead: "不同事項的處理方式可能不同，且通常有期限。若公告提到複查、申訴或異議程序，請立刻讀完資格、文件與截止時間。", items: ["只依當年度正式簡章與公告提出申請。", "確認可複查的是哪一類資料，不要把制度疑問當成可改分發結果的保證。", "送件後保存申請證明與回覆紀錄。"] },
  ],
  "withdrawal": [
    { heading: "先分清楚：還沒報到還是已完成報到", lead: "想改變選擇時，第一個關鍵是目前的狀態。未報到、已報到、同時有其他錄取或準備參加其他管道，適用的處理方式可能不同。", items: ["確認你是否已完成任何線上或現場報到程序。", "查閱錄取學校與招生委員會公告的放棄資格規定。", "不要因為不去報到就假設所有資格已自動處理。"] },
    { heading: "做決定前先確認後果", lead: "放棄錄取資格是一項重要程序。若還有其他升學計畫，先確認放棄與新管道之間的資格限制與時程能否銜接。", items: ["確認另一個選擇是否已經確定可報名或已錄取。", "核對放棄截止日，預留校方處理與取得證明的時間。", "和家長、原國中或錄取學校承辦人一起確認，不只依朋友經驗。"] },
    { heading: "完成後保留證明", lead: "依規定完成放棄後，保存書面、收據或系統畫面。這能在後續申請或資料核對時保護自己。", items: ["確認校方是否會提供收件證明、回條或系統完成畫面。", "記下承辦窗口、聯絡日期與案件編號。", "若有任何新管道要辦理，依其公告重新確認資格。"] },
  ],
  "new-student": [
    { heading: "報到完成後，先建立新生待辦表", lead: "報到成功只是入學流程的一部分。很多學校會在後續公告新生訓練、資料填寫、健康檢查、服裝或分班等事項。", items: ["訂閱或定期查看錄取學校的官方網站與新生專區。", "把每一項截止日記到行事曆，並標示是否需要家長協助。", "保存學校寄發的通知、帳密或表單連結。"] },
    { heading: "開學前最值得確認的事", lead: "新環境的適應從資訊準備開始。提早確認交通、到校時間與校方要求，開學時會更從容。", items: ["確認通勤路線、集合時間與校園入口。", "查詢新生訓練、服裝、學用品或健康檢查公告。", "若有特殊需求或資料問題，提前聯絡學校而不是等到報到當天。"] },
    { heading: "別漏掉正式資格確認", lead: "如果校方要求補件或提交畢業相關文件，務必依期限完成。收到不明訊息時，回到學校官方聯絡方式查證。", items: ["逐一完成校方公告的資料與補件要求。", "不透過私人帳號或非官方表單提供個資。", "疑問優先詢問錄取學校的註冊組或招生承辦窗口。"] },
  ],
};

const articleAdditions: Record<string, ArticleSection[]> = {
  "after-results": [
    { heading: "查榜當天的正確順序", lead: "結果頁面出現後，先不要急著在群組分享或立刻做決定。把十分鐘留給核對資料與開啟校方公告，往往比第一時間知道同學去哪裡更重要。這能避免把不同招生管道、不同校區或不同科別的資訊混在一起。", items: ["從正式分發系統重新確認一次姓名、錄取校科、招生管道與結果狀態，再保存畫面。", "開啟錄取學校的官網、新生專區或公告頁，找出報到日期、辦理方式、地點與承辦窗口。", "將報到、複查、放棄資格等所有有期限的事項寫下來；不確定時直接致電校方，不用自行推測。"] },
    { heading: "和家人討論時，可以先整理這些資訊", lead: "查到錄取結果後，家人的期待、通勤距離與對科別的想像都可能影響心情。先把可確認的資料放到同一張清單，再討論下一步，會比只圍繞校名或排名更容易得到支持。", items: ["整理校科課程、通勤時間、報到要求與開學前待辦，讓討論有具體依據。", "若結果不是最初期待的選項，先確認志願表順序與分發規則，再決定是否需要詢問承辦單位。", "在期限前做出是否報到或放棄的決定，重要程序請與家長共同確認並保存證明。"] },
  ],
  "how-to-check": [
    { heading: "查榜前先備好三樣資料", lead: "每個就學區的查詢欄位不盡相同，提前準備能減少開放時手忙腳亂。登入資料只應在自己確認過的官方頁面輸入；若系統忙碌，耐心重試比點開群組陌生連結更安全。", items: ["準備當初選填時使用的身分驗證資訊、准考證號或系統要求的資料，並確認輸入格式。", "從國中公告、就學區招生委員會或本網站整理的入口前往，不依賴社群截圖中的短網址。", "查到結果後記錄查詢時間並保存正式畫面，但不要公開含有姓名、證號或其他個資的截圖。"] },
    { heading: "結果頁面要看哪些欄位", lead: "錄取結果不只是『有沒有上』。校名、校區、科別或群別、身分別與狀態都會影響下一步要看的公告。尤其同一學校不同科別，報到地點、時間或後續表件可能各不相同。", items: ["逐字核對姓名與錄取校科，必要時和自己最後確認的志願表對照。", "確認系統是否顯示需要列印、下載通知，或另有複查與報到說明連結。", "若顯示內容與預期不同，先保留畫面與志願表，再依公告向國中端、招生委員會或錄取學校詢問。"] },
  ],
  admitted: [
    { heading: "報到前一晚的檢查清單", lead: "把報到視為一場有明確規則的行政程序：公告沒寫的不要自行假設，公告寫的每一項都要逐一確認。提早一晚把資料和交通安排妥當，當天就能把注意力放在完成手續與聽清楚後續通知。", items: ["再次確認報到日期、到場時段、校門或集合地點，以及是否需要本人、家長或代理人一同出席。", "依校方清單準備文件的正本、影本、照片或表件；若有任何一項來不及備妥，先向承辦單位確認補件規則。", "預留交通時間，並把校方電話、新生專區網址和可識別的完成報到證明存到手機。"] },
    { heading: "完成報到後，還有哪些通知不能漏", lead: "完成報到代表已處理好錄取資格，但高中生活的行政準備通常才剛開始。不同學校的安排差異很大，因此最可靠的做法是持續追蹤該校的新生公告。", items: ["確認是否需要填寫新生基本資料、選課、制服尺寸、午餐、交通車或健康檢查相關表單。", "記下新生訓練、編班公告、領取資料與開學日，避免暑假後才發現錯過期限。", "若決定改走其他已確認的升學管道，務必先依規定辦理放棄，不要以缺席代替正式程序。"] },
  ],
  "not-admitted": [
    { heading: "先確認自己的狀態，再找下一條路", lead: "『沒有錄取』可能是分發結果未錄取，也可能是沒有完成報到、想改變原本選擇，或仍等待其他招生管道的結果。不同情況適用的資格與時程不同，先把狀態釐清，才能避免做了無效申請。", items: ["保存正式結果頁面，確認自己是未錄取、備取、放棄資格，還是已在其他管道錄取但尚未決定。", "向原國中註冊組、輔導室或招生承辦單位詢問當年度仍開放的正式管道與資格限制。", "所有簡章都要確認報名日、放榜日、報到日與所需資料，因為每個管道的規定並不相同。"] },
    { heading: "備案不是退而求其次，而是重新做選擇", lead: "面對不如預期的結果很不容易，但重新檢視校科特色、通勤、學習方式與未來方向，常能找到真正適合自己的選項。先把時間留給比較資訊，而不是被網路上的保證入學或未證實名額催促。", items: ["研究仍可申請校科的課程、實習、升學與交通安排，確認自己願意就讀後再送件。", "和家長、導師或輔導老師討論可接受的選項與限制，把每一步的期限寫成行動表。", "只透過核准的招生簡章與校方窗口辦理，不提供個資給來路不明的代辦或社群帳號。"] },
  ],
  "result-day": [
    { heading: "結果公布時，先照顧資訊也照顧自己", lead: "放榜當下容易因興奮、緊張或失落而快速做出反應。先完成資料核對與期限確認，再處理分享、討論或下一個決定，可以讓重要程序不被情緒打亂。", items: ["若網站暫時壅塞，保持在官方頁面重試，不要因焦急改用不明查榜連結。", "先保存自己的結果與公告連結，再決定是否分享；所有含個資的截圖都應避免公開。", "不論結果如何，先把當天可做的行政事項完成，後續選擇再和家人或師長充分討論。"] },
    { heading: "查榜後二十四小時內的優先事項", lead: "很多後續程序會在放榜後很快開始，最有效的做法是用一張待辦清單將學校公告拆成可執行的小步驟。完成一項就保留一項的紀錄，能大幅降低遺漏風險。", items: ["確認錄取學校是否已發布報到說明、文件清單、線上填寫頁面或聯絡方式。", "把每個日期連同時間、地點與負責人寫進行事曆，並設定一至兩天前的提醒。", "有資料疑義時，先讀公告的複查或詢問方式；提問時附上必要資訊，避免只用『我覺得不對』描述問題。"] },
  ],
  "registration-documents": [
    { heading: "把公告轉成自己的文件包", lead: "最安全的準備方式不是搜尋網路上的通用清單，而是把錄取學校當年度公告逐條轉成勾選表。每一份文件都標示是否要正本、影本、簽名或家長協助，出門前再逐一核對。", items: ["將身分證明、畢業相關文件、照片、表件與可能的委託資料分開放入透明夾，避免現場翻找。", "如果公告有指定格式或下載表單，使用當年度版本，不沿用學長姐或去年的檔案。", "任何文件規定看不懂時，先問校方承辦單位；確認答案後再準備，避免白跑一趟。"] },
    { heading: "報到現場要問清楚的五件事", lead: "報到當天常會一次收到許多新資訊。除了確認資料已收齊，也要主動問清楚下一次需要出席或完成事項的時間與方式，回家後立刻整理成自己的新生行事曆。", items: ["詢問是否已完成報到，以及會收到何種收據、回條或系統通知作為證明。", "確認新生訓練、健康檢查、服裝、編班、選課與資料填寫的公告管道。", "記下負責窗口與聯絡方式，未來遇到補件、資料異動或資格問題時可快速聯繫。"] },
  ],
  "continued-enrollment": [
    { heading: "看到續招資訊時，先讀什麼", lead: "續招的校科、名額與資格都可能因年度而變動，因此轉傳名單只能當線索。真正要依據的是主管機關核准的簡章與校方公告，尤其要看清楚自己是否符合報名與報到限制。", items: ["確認公告是否為當年度正式版本，並核對校名、科別、名額、報名方式與截止時間。", "先判斷自己目前是否已在其他管道錄取或完成報到，必要時向原學校與續招單位詢問資格。", "計算郵寄、線上送件、審查與報到所需時間，避免只看到截止日期卻錯過前置作業。"] },
    { heading: "申請後如何避免錯過下一關", lead: "送出申請不等於流程結束。續招同樣會有放榜、報到、補件或遞補等後續安排；建立一份時間表並保留每次送件證明，才能在需要確認時有完整紀錄。", items: ["保存簡章、報名畫面、繳費或收件證明，並記下招生單位的公告位置。", "每天於公告期間查看結果，不只等待簡訊或他人轉告。", "若確定錄取，依規定完成報到；若要放棄或改走別的管道，也要先確認資格與程序。"] },
  ],
  "admission-status": [
    { heading: "結果不是第一志願時，怎麼看才正確", lead: "分發結果是依照先前提交的志願表與當年度規則產生。看到非第一志願的校科時，先對照自己的志願順序與正式說明，避免把失望直接當成系統錯誤。", items: ["找出最後確認的志願表，核對錄取校科在志願表中的位置及校科名稱。", "比較同名學校、不同校區或不同科別時，以結果頁與對應公告的完整名稱為準。", "若仍有疑問，先準備志願表、結果畫面與明確問題，再在期限內向就學區承辦單位詢問。"] },
    { heading: "確認狀態後，立刻建立下一步地圖", lead: "無論顯示錄取、未錄取或需要進一步確認，下一步都應回到公告的指定窗口與期限。把結果頁、校方公告和個人行事曆放在一起，能讓後續處理清楚又安心。", items: ["錄取者：優先查看報到要求、文件與新生公告；不要等到報到前才開始準備。", "未錄取者：確認當年度仍可參加的管道、資格與截止日，再準備備案。", "結果有疑義者：保存畫面、閱讀複查規定，並用官方聯絡方式在期限內提出詢問。"] },
  ],
  "result-question": [
    { heading: "先把疑義變成可查證的問題", lead: "查榜結果與預期不同時，最重要的是冷靜保存資訊。承辦人員能協助核對具體資料，但無法只依模糊印象判斷；把問題整理清楚，能縮短來回確認的時間。", items: ["記錄查詢日期、使用的系統、顯示結果與你想確認的欄位，例如校科、狀態或招生管道。", "準備最後確認的志願表、正式結果畫面與必要身分資料，但不要把這些個資公開到社群。", "先從公告中尋找複查、申訴或聯絡窗口，依指定方式詢問並保留寄送或通話紀錄。"] },
    { heading: "詢問後仍要追蹤哪些事", lead: "提出問題後，請持續留意回覆期限與補件要求。若收到說明，先確認它是否已回答你在意的欄位；若需要再補問，也應引用案件資訊與前一次的溝通內容。", items: ["將承辦人的回覆、案件編號、補件要求與截止時間集中保存，避免不同家人各自記錄造成落差。", "未收到回覆時，依公告提供的時間與方式禮貌追問，不要改用私人社群帳號尋找答案。", "在問題釐清前仍要留意報到或其他程序期限，必要時主動詢問是否有保留或處理方式。"] },
  ],
  withdrawal: [
    { heading: "決定放棄前，先完成兩次確認", lead: "放棄錄取資格會影響已取得的入學機會，也可能與其他管道的資格相連。先確認新的選擇是否真的可行，再向原錄取學校詢問正式程序，能避免因一時猶豫留下空窗。", items: ["確認自己目前的報到狀態、另一個升學選項的進度，以及各項期限是否能順利銜接。", "閱讀原錄取學校與招生委員會的放棄資格公告，確認誰可辦理、是否需要表件、如何送件。", "與家長共同決定，重要文件送出前拍照或掃描保存，並記下承辦窗口的聯絡資訊。"] },
    { heading: "送出放棄後，不要只等結果", lead: "完成申請後仍應確認學校已收件、程序是否完成，以及接下來的新管道有哪些待辦。保留完整紀錄能在系統資料尚未更新或資格需要核對時保護自己。", items: ["取得收據、回條、電子郵件或完成畫面，並確認是否還需要到校補件或領取文件。", "依新管道的公告重新準備資料，不假設原本的文件或資格會自動轉移。", "若決定改變或遇到特殊狀況，及早和原錄取學校、新申請單位及國中端確認。"] },
  ],
  "new-student": [
    { heading: "把新生公告變成暑假行動表", lead: "完成報到後，最容易發生的問題是以為所有事情都結束了。其實不少學校會分批發布新生資料、訓練、健康檢查、服裝與編班資訊；主動建立追蹤習慣，開學前就會從容許多。", items: ["固定查看錄取學校官網、新生專區與正式通知，並避免只依賴家長群組或同學轉傳。", "把每份表單、繳費、到校活動與截止日記到同一份行事曆，標示是否需要家長協助。", "所有帳密、通知與完成證明集中保存，日後需要登入或核對資料時更方便。"] },
    { heading: "開學前一週的安心確認", lead: "接近開學時，把抽象的擔心轉成具體問題最有效：怎麼到校、第一天在哪裡集合、需要帶什麼、遇到狀況找誰。提早確認後，孩子和家長都能更安心迎接新環境。", items: ["確認通勤路線、出門時間、校門位置與集合地點，必要時事先實地走一次。", "重新閱讀新生訓練與開學公告，準備指定用品、服裝或健康檢查相關資料。", "若有資料異動、特殊需求或無法出席的情況，提前透過校方正式窗口說明並確認處理方式。"] },
  ],
};

function ArticleHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="border-b border-slate-100 px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-slate-950 font-outfit text-sm font-black text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.9)]">{number}</span>
        <div>
          <p className="text-xs font-black tracking-[0.15em] text-sky-700">{eyebrow}</p>
          <h2 className="mt-1 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ArticleList({ items }: { items: string[] }) {
  return <ul className="space-y-2.5 text-sm font-semibold leading-6 text-slate-600">{items.map((item) => <li key={item} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />{item}</li>)}</ul>;
}

function ArticleDeepDive({ articleId }: { articleId: string }) {
  const sections = articleAdditions[articleId] || [];
  if (sections.length === 0) return null;

  return <section className="mt-9 overflow-hidden rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)] sm:p-8"><div className="border-b border-slate-100 pb-5"><p className="text-xs font-black tracking-[0.16em] text-sky-700">PRACTICAL GUIDE</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">再多準備一步，流程更安心</h2><p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-slate-600">以下內容依照查到錄取結果後最常遇到的實際情境整理。各校與各就學區的細節仍請以當年度正式公告為準。</p></div><div className="mt-6 space-y-6">{sections.map((section, index) => <section key={section.heading} className="grid gap-4 rounded-[26px] bg-slate-50/75 p-5 sm:p-6 lg:grid-cols-[180px_minmax(0,1fr)]"><div><span className="font-outfit text-xs font-black tracking-[0.14em] text-sky-600">延伸 {index + 1}</span><h3 className="mt-2 text-xl font-black leading-tight text-slate-950">{section.heading}</h3></div><div><p className="text-sm font-semibold leading-7 text-slate-600">{section.lead}</p><div className="mt-4 border-t border-slate-200/80 pt-4"><ArticleList items={section.items} /></div></div></section>)}</div></section>;
}

function BriefArticle({ article }: { article: ArticleMeta }) {
  const sections = articleBodies[article.id] || [];
  return <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)]"><ArticleHeading number="READ" eyebrow={article.tag.toUpperCase()} title={article.subtitle} description={article.description} /><div className="p-5 sm:p-8"><p className="max-w-3xl text-base font-semibold leading-8 text-slate-700">這篇文章以實際做決定時最常遇到的問題為主軸。先掌握原則，再回到自己的就學區與招生管道確認當年度規定，才能把資訊真正用在下一步。</p><div className="mt-8 space-y-8">{sections.map((section, index) => <section key={section.heading} className="grid gap-4 rounded-[26px] border border-slate-100 p-5 sm:p-6 lg:grid-cols-[160px_minmax(0,1fr)]"><div><span className="font-outfit text-xs font-black tracking-[0.14em] text-sky-600">0{index + 1}</span><h3 className="mt-2 text-xl font-black leading-tight text-slate-950">{section.heading}</h3></div><div><p className="text-sm font-semibold leading-7 text-slate-600">{section.lead}</p><div className="mt-4 border-t border-slate-100 pt-4"><ArticleList items={section.items} /></div></div></section>)}</div><div className="mt-8 grid gap-4 rounded-[26px] bg-slate-950 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs font-black tracking-[0.14em] text-sky-200">NEXT STEP</p><h3 className="mt-1 text-xl font-black">最後一定要做的確認</h3><p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-300">各招生管道的日期、名額、文件與資格會依年度和地區而異。準備下一步前，請回到當年度官方簡章、就學區或招生委員會公告確認。</p></div><a href="https://cap.rcpet.edu.tw/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-sky-100">官方公告 <ExternalLink className="h-4 w-4" /></a></div></div></article>;
}

function RecommendedReading({ currentId }: { currentId: string }) {
  const currentArticle = articleLinks.find((article) => article.id === currentId);
  const recommended = articleLinks
    .filter((article) => article.id !== currentId)
    .sort((a, b) => Number(b.tag === currentArticle?.tag) - Number(a.tag === currentArticle?.tag))
    .slice(0, 3);

  return <section className="mt-9"><div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4"><div><p className="text-xs font-black tracking-[0.16em] text-sky-700">KEEP READING</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">接下來，你可能也想知道</h2></div><a href="/front/articles/" className="shrink-0 text-sm font-black text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-900 hover:decoration-sky-700">查看全部文章</a></div><div className="mt-5 grid gap-4 md:grid-cols-3">{recommended.map((article, index) => <a key={article.id} href={`/front/articles/${article.id}/`} className="group rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_22px_48px_-40px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"><div className="flex items-center justify-between gap-3"><span className="font-outfit text-xs font-black tracking-[0.12em] text-sky-600">0{index + 1}</span><span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black tracking-[0.1em] text-sky-700">{article.tag}</span></div><h3 className="mt-4 text-lg font-black leading-snug text-slate-950">{article.subtitle}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{article.description}</p><span className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-sky-700">繼續閱讀 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></a>)}</div></section>;
}

export function ArticleHubPage({ articleId }: { articleId?: string }) {
  const selectedArticle = articleLinks.find((article) => article.id === articleId);
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8" tabIndex={-1}>
      <div className="mb-5"><BackButton href={articleId ? "/front/articles/" : undefined} /></div>
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 px-5 py-8 text-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.9)] sm:rounded-[42px] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-[0.16em] text-sky-100 ring-1 ring-white/15"><Newspaper className="h-4 w-4" /> 116 學年度升學文章專區</div>
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">{selectedArticle ? selectedArticle.subtitle : "放榜之後，下一步怎麼走？"}</h1>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-300 sm:text-base">{selectedArticle ? selectedArticle.description : "給考生與家長的查榜、報到、志願與備案指南。選一篇主題開始閱讀，再依自己的結果與官方公告做決定。"}</p>
        </div>
      </section>

      {!selectedArticle && <section className="mt-9"><div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black tracking-[0.16em] text-sky-700">LATEST STORIES</p><h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">最新升學文章</h2></div><p className="text-sm font-semibold text-slate-500">共 {articleLinks.length} 篇實用攻略</p></div><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articleLinks.map((article, index) => <a key={article.id} href={`/front/articles/${article.id}/`} className={`group relative overflow-hidden rounded-[24px] border p-5 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 hover:border-sky-200 ${index === 0 ? "md:col-span-2 lg:col-span-2 bg-slate-950 text-white" : "border-slate-100 bg-white"}`}><div className="flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-[0.12em] ${index === 0 ? "bg-white/12 text-sky-100" : "bg-sky-50 text-sky-700"}`}>{article.tag}</span><span className={`font-outfit text-xs font-bold ${index === 0 ? "text-slate-400" : "text-slate-400"}`}>{article.date}</span></div><h3 className={`mt-5 font-black leading-snug ${index === 0 ? "max-w-xl text-3xl sm:text-4xl" : "text-xl text-slate-950"}`}>{article.subtitle}</h3><p className={`mt-3 text-sm font-semibold leading-6 ${index === 0 ? "max-w-xl text-slate-300" : "text-slate-600"}`}>{article.description}</p><span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-black ${index === 0 ? "text-sky-200" : "text-sky-700"}`}>閱讀全文 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></a>)}</div></section>}

      {selectedArticle && <div className="mt-9 space-y-8">
        {articleId === "after-results" && <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)]">
          <ArticleHeading number="01" eyebrow="RESULT DAY PLAYBOOK" title="查到免試入學錄取結果後要做什麼？完整流程整理" description="這篇整理志願選填後查到免試入學錄取校科後的完整流程。確認結果後，請立刻依錄取學校的公告安排報到與後續程序。" />
          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950"><CalendarCheck2 className="h-5 w-5 text-sky-600" />查到錄取結果後的 6 個動作</h3>
              <ol className="mt-4 space-y-4">
                {[
                  ["核對錄取校與科別", "先確認畫面上的姓名、錄取學校、科別／群別與錄取狀態是否正確。不要只看校名；同一所學校不同科別的報到資訊可能不同。"],
                  ["保存正式結果", "下載、列印或截圖分發結果，並保留查詢頁面、通知單與登入資料。若之後需要詢問、申請複查或辦理報到，這些資料都能快速核對。"],
                  ["立刻閱讀錄取學校公告", "到錄取學校官網或新生專區查看報到日期、時段、地點、方式及應備文件。這一步要以學校公告為準，不要只參考親友或去年的資訊。"],
                  ["把關鍵期限寫下來", "將報到、複查、放棄錄取資格與新生資料填寫等期限加入行事曆，並設定提醒。每個期限都可能影響後續升學安排。"],
                  ["確認誰要到場、帶什麼", "確認是本人、家長或代理人辦理，以及是否需要委託書、身分證明、畢業證書或校方指定表件；不確定時直接詢問錄取學校承辦單位。"],
                  ["完成報到並留存證明", "依公告完成現場或線上報到後，保存收據、回條或完成畫面；接著再查看新生編班、制服、健康檢查與開學前通知。"],
                ].map(([title, text], index) => <li key={title} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 font-outfit text-xs font-black text-sky-700 ring-1 ring-sky-100">{index + 1}</span><div><h4 className="font-black text-slate-900">{title}</h4><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{text}</p></div></li>)}
              </ol>
            </div>
            <aside className="rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-100">
              <h3 className="flex items-center gap-2 font-black text-slate-950"><Lightbulb className="h-5 w-5 text-amber-500" />先確認這兩件事</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-[18px] bg-white p-4"><p className="text-xs font-black text-sky-700">這是志願選填的分發結果嗎？</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">本篇適用於已完成志願選填、現在查到高中職錄取校科的同學；請以所屬就學區的正式結果為準。</p></div>
                <div className="rounded-[18px] bg-white p-4"><p className="text-xs font-black text-emerald-700">下一步看哪裡？</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">先看錄取學校公告的報到規定與期限，再處理複查、放棄資格或新生資料等後續事項。</p></div>
              </div>
            </aside>
          </div>
        </article>}

        {articleId === "how-to-check" && <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)]">
          <ArticleHeading number="02" eyebrow="CHECK RESULTS SAFELY" title="免試入學結果怎麼查？各就學區查榜入口整理" description="志願選填後的高中職分發結果，沒有一個可查所有人的全國榜單。請到你當初參加的就學區免試入學系統或招生管道，查詢自己最後錄取的校科。" />
          <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-3">
            <section className="rounded-[24px] border border-sky-100 bg-sky-50/65 p-5"><Search className="h-6 w-6 text-sky-600" /><h3 className="mt-4 text-lg font-black text-slate-950">A. 先找當初選填的管道</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">請回想自己原本透過哪一個就學區或招生管道完成志願選填。錄取結果必須回到同一個正式系統查詢。</p><a href="/front/#regions-title" className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-sky-700 hover:text-sky-900">查看各就學區入口 <ArrowRight className="h-4 w-4" /></a></section>
            <section className="rounded-[24px] border border-emerald-100 bg-emerald-50/65 p-5"><MapPin className="h-6 w-6 text-emerald-600" /><h3 className="mt-4 text-lg font-black text-slate-950">B. 查免試分發結果</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">進入所屬就學區免試入學委員會的分發結果系統，核對姓名、錄取校科與狀態。不同區域的網址、開放時間與登入欄位可能不同。</p><a href="/front/#regions-title" className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-emerald-700 hover:text-emerald-900">前往分發查榜入口 <ArrowRight className="h-4 w-4" /></a></section>
            <section className="rounded-[24px] border border-amber-100 bg-amber-50/65 p-5"><GraduationCap className="h-6 w-6 text-amber-600" /><h3 className="mt-4 text-lg font-black text-slate-950">C. 查其他招生管道結果</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">五專、特色招生、技優或直升等，各有自己的招生委員會與放榜頁面。請回到當初報名的官方系統查看錄取結果。</p><a href="https://www.techadmi.edu.tw/edutype.php?type=3" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-amber-700 hover:text-amber-900">查看五專招生資訊 <ExternalLink className="h-4 w-4" /></a></section>
          </div>
          <div className="mx-5 mb-5 flex gap-3 rounded-[20px] border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold leading-6 text-rose-900 sm:mx-8 sm:mb-8"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />請勿把社群截圖、轉傳榜單或第三方查榜頁當成正式結果。若姓名、錄取校科、狀態或日期有疑問，以招生委員會、錄取學校與正式通知單為準。</div>
        </article>}

        {articleId === "admitted" && <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)]">
          <ArticleHeading number="03" eyebrow="AFTER ADMISSION" title="免試入學放榜後，錄取後有哪些事情要做？" description="錄取不是全部結束；「報到是否完成」以及後續是否要放棄資格，往往各有指定程序與期限。請把錄取學校公告當成待辦清單逐項完成。" />
          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-2">
            <section><h3 className="flex items-center gap-2 text-lg font-black text-slate-950"><BadgeCheck className="h-5 w-5 text-emerald-600" />錄取後 24 小時內的檢查清單</h3><div className="mt-4 rounded-[24px] border border-slate-100 p-5"><ArticleList items={["確認錄取學校、科別／群別與公告的報到日期、時間、地點。", "確認報到是本人、家長或代理人到場；若可委託，所需委託書與證件以校方公告為準。", "備妥校方要求的文件。常見資料可能包含身分證明、畢業證書或相關表件，但請勿只依網路清單準備。", "確認是否有線上登錄、繳交表單、服裝尺寸、新生資料或健康檢查等後續事項。", "留存完成報到的證明、收據或系統畫面，並記下承辦單位聯絡方式。"]} /></div></section>
            <section><h3 className="flex items-center gap-2 text-lg font-black text-slate-950"><FileSearch className="h-5 w-5 text-sky-600" />想換學校或還有其他管道？</h3><div className="mt-4 rounded-[24px] bg-slate-950 p-5 text-white"><p className="text-sm font-semibold leading-7 text-slate-300">同時獲多個招生管道錄取時，通常必須依規定擇一報到。若已報到、又要改走其他管道，請先查「聲明放棄錄取資格」的期限與程序。</p><p className="mt-4 text-sm font-black leading-6 text-white">不要直接缺席，也不要假設不去就自動完成放棄。</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-300">未在期限內依規定處理，可能影響後續招生資格；各管道規定不同，請向原錄取學校與招生委員會確認。</p></div></section>
          </div>
        </article>}

        {articleId === "not-admitted" && <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_28px_68px_-52px_rgba(15,23,42,0.75)]">
          <ArticleHeading number="04" eyebrow="PLAN B, WITH A PLAN" title="沒有錄取怎麼辦？後續升學管道整理" description="先不用急著做決定。先確認自己是「未錄取」、「未完成報到」，還是「想改變原本選擇」；三種情況能走的管道與限制不同。最重要的是看當年度、當地區仍在受理的正式招生資訊。" />
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
            {alternativeCards.map(({ title, text, icon: Icon, color }) => <section key={title} className="rounded-[24px] border border-slate-100 bg-slate-50/70 p-5"><Icon className={`h-6 w-6 ${color}`} /><h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p></section>)}
          </div>
          <div className="mx-5 mb-5 rounded-[22px] bg-amber-50 p-5 sm:mx-8 sm:mb-8"><h3 className="font-black text-amber-950">重要限制：已報到者不能把續招當成任意轉學途徑</h3><p className="mt-2 text-sm font-semibold leading-6 text-amber-900">教育部的免試續招原則對已在其他入學管道錄取並完成報到的學生設有限制；如因搬遷等特殊因素要變更，須依規定提出證明並取得同意。請先確認資格再送件。</p></div>
        </article>}
        {selectedArticle && !detailedArticleIds.has(selectedArticle.id) && <BriefArticle article={selectedArticle} />}
      </div>}

      {selectedArticle && <ArticleDeepDive articleId={selectedArticle.id} />}

      {selectedArticle && <RecommendedReading currentId={selectedArticle.id} />}

      <section className="mt-9 rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_24px_64px_-48px_rgba(15,23,42,0.65)] sm:p-8">
        <p className="text-xs font-black tracking-[0.16em] text-sky-700">OFFICIAL SOURCES</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">查資料，優先回到官方</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{officialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-[20px] border border-slate-100 p-4 transition hover:border-sky-200 hover:bg-sky-50"><div><h3 className="font-black text-slate-950">{link.label}</h3><p className="mt-1 text-xs font-semibold text-slate-500">{link.note}</p></div><ExternalLink className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-sky-700" /></a>)}</div>
      </section>
    </main>
  );
}
