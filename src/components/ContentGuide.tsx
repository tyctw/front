import {
  AlertCircle,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const guideCards = [
  {
    title: "查榜前先確認就學區",
    body: "各區免試入學查榜系統彼此獨立，請先確認自己報名的就學區，再使用對應入口查詢。若選錯區域，系統通常會顯示查無資料或無法登入。",
    icon: FileSearch,
  },
  {
    title: "準備登入資料",
    body: "查榜系統多會要求准考證號，並可能搭配身分證字號、生日或學校提供的登入資訊。查詢前先準備准考證號與個人身分資料即可。",
    icon: ClipboardCheck,
  },
  {
    title: "錄取後看學校公告",
    body: "查到錄取學校後，再到錄取學校官網、新生專區或招生公告確認報到時間、方式、是否需要文件與放棄錄取資格流程。",
    icon: BookOpenCheck,
  },
];

const timeline = [
  { date: "115/06/05 08:00", title: "會考成績公布", body: "正式成績請以國中教育會考相關官方查詢系統為準。" },
  { date: "115/06/18 起，依各區截止時間", title: "個人序位查詢與志願選填", body: "各就學區截止時間不同，例如基北區為6/18中午12:00至6/25中午12:00，中投區為6/18上午8:00至6/23中午12:00。請依所屬就學區公告完成選填。" },
  { date: "115/07/07 11:00", title: "免試入學分發結果查詢", body: "多數就學區於115/7/7上午11:00公告分發結果。請到所屬就學區查榜入口查詢錄取學校，並保存或列印查詢結果。" },
  { date: "115/07/08，依各區指定時段", title: "分發結果複查", body: "複查時間、地點與方式依各就學區簡章辦理；部分區域要求學生或家長親自送件，且逾期不受理。" },
  { date: "115/07/09，依錄取學校公告", title: "錄取生報到", body: "多數就學區安排於115/7/9辦理報到，常見時段為上午9:00至11:00；實際時段、分流方式與文件請看錄取學校公告。" },
  { date: "多數區域為115/07/13前", title: "報到後放棄錄取資格期限", body: "已報到但要參加其他招生管道者，通常須在規定期限內向錄取學校聲明放棄；常見期限為115/7/13下午2:00前，仍應以各區簡章為準。" },
];

const documentItems = [
  "身分證明文件，例如身分證、健保卡、學生證或戶口名簿。",
  "錄取通知單或查榜結果列印資料；若學校公告不強制，仍建議備妥。",
  "錄取學校公告要求的照片、影本、表件或線上填報完成證明。",
];

const resultActions = [
  {
    title: "查到錄取",
    items: [
      "確認錄取學校名稱、科別或班別是否正確。",
      "立刻查看錄取學校首頁、招生公告或新生專區。",
      "依學校公告完成現場報到、線上表單或分流作業。",
    ],
  },
  {
    title: "查不到結果",
    items: [
      "先確認就學區、准考證號、身分資料與輸入格式是否正確。",
      "若系統流量過大，稍後再查，避免短時間重複送出。",
      "仍無法查詢時，請聯繫就讀國中的註冊組或導師協助確認。",
    ],
  },
  {
    title: "想走其他管道",
    items: [
      "未報到通常視同放棄該次錄取資格，但仍需以簡章規定為準。",
      "已完成報到者，須在期限內向錄取學校聲明放棄錄取資格。",
      "續招、特色招生、五專或其他管道的資格限制請分別查閱官方公告。",
    ],
  },
];

const reminders = [
  "本頁整理公開資訊與考生常見流程，實際招生作業以各就學區委員會、錄取學校與官方簡章公告為準。",
  "本站不會要求輸入身分證字號、准考證號或密碼；需要輸入個人資料時，請確認已進入各區官方系統。",
  "若官方系統或學校公告內容與本頁不同，請以官方系統、學校公告或就學區簡章為準。",
];

export function ContentGuide() {
  return (
    <article className="space-y-10" aria-labelledby="guide-title">
      <section className="overflow-hidden rounded-[38px] border border-white/80 bg-white/86 p-5 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.55)] backdrop-blur-2xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-black text-sky-700 ring-1 ring-sky-100">
              <ShieldCheck className="h-4 w-4" />
              非官方資訊整理
            </div>
            <h1 id="guide-title" className="text-[38px] font-black leading-[1.08] tracking-normal text-slate-950 md:text-6xl">
              115 會考查榜與免試入學報到重點
            </h1>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              本頁整理 115 學年度國中教育會考後，免試入學查榜、報到、複查與放棄錄取資格的常見流程。
              日期以民國 115 年標示，對應西元 2026 年；各就學區時段可能不同，實際作業仍以各就學區委員會、錄取學校與官方簡章公告為準。
            </p>
          </div>

          <div className="grid gap-3">
            {guideCards.map((item) => {
              const Icon = item.icon;
              return (
                <section key={item.title} className="rounded-[24px] border border-slate-100 bg-white/82 p-4 shadow-sm">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-slate-950 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-950">{item.title}</h2>
                      <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">{item.body}</p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/80 bg-white/78 p-5 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-7" aria-labelledby="timeline-title">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-slate-950 text-white">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">Timeline</p>
            <h2 id="timeline-title" className="text-2xl font-black text-slate-950 md:text-3xl">重要日期與流程</h2>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {timeline.map((item, index) => (
            <section key={item.title} className="rounded-[24px] border border-slate-100 bg-white/84 p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700 ring-1 ring-sky-100">
                  {item.date}
                </span>
                <span className="font-outfit text-xs font-black text-slate-300">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.body}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/80 bg-white/78 p-5 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-7" aria-labelledby="documents-title">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 id="documents-title" className="text-2xl font-black text-slate-950">報到文件準備</h2>
          </div>
          <ul className="grid gap-3">
            {documentItems.map((item) => (
              <li key={item} className="flex gap-3 rounded-[20px] bg-white/82 p-3 text-sm font-semibold leading-6 text-slate-600 ring-1 ring-slate-100">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[32px] border border-white/80 bg-white/78 p-5 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-7" aria-labelledby="result-title">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-rose-50 text-rose-700 ring-1 ring-rose-100">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h2 id="result-title" className="text-2xl font-black text-slate-950">查榜後怎麼做</h2>
          </div>
          <div className="grid gap-3">
            {resultActions.map((group) => (
              <section key={group.title} className="rounded-[22px] border border-slate-100 bg-white/84 p-4">
                <h3 className="text-base font-black text-slate-950">{group.title}</h3>
                <ul className="mt-2 grid gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm font-medium leading-6 text-slate-600">
                      <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-amber-100 bg-amber-50/78 p-5 shadow-[0_20px_60px_-48px_rgba(180,83,9,0.48)]" aria-labelledby="reminder-title">
        <div className="flex gap-3">
          <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <h2 id="reminder-title" className="text-lg font-black text-amber-950">使用提醒與資料安全</h2>
            <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-amber-950/82">
              {reminders.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}
