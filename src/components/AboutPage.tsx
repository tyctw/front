import { BookOpenCheck, Compass, HeartHandshake, Search, ShieldCheck, Sparkles } from "lucide-react";
import { BackButton } from "./BackButton";

const principles = [
  {
    title: "讓資訊更容易被找到",
    icon: Search,
    color: "bg-sky-50 text-sky-700 ring-sky-100",
    text: "各就學區的招生簡章、分發規則、重要日程與系統入口，往往分散在不同網站與公告頁面。我們將常用資訊整理成容易閱讀的導覽，協助學生、家長與教育工作者更快回到需要的官方資源。",
    points: ["依查榜、報到、放棄資格、續招與新生準備等情境整理入口。", "清楚標示資訊用途，減少把不同招生管道或不同年度規則混在一起的機會。", "提供文章與待辦整理，協助使用者知道查到結果後應先確認哪些事項。"],
  },
  {
    title: "讓規劃回到學生身上",
    icon: Compass,
    color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    text: "升學不是只比較分數或校名的問題。志願選擇、錄取後的決定與未來規劃，也應一併考量興趣、性向、能力、通勤、學校特色、家庭支持與未來發展。",
    points: ["落點與歷年資訊可以協助比較，但不能替代學生自己的理解與選擇。", "鼓勵在重要決定前，與家長、導師、輔導老師或校方承辦單位充分討論。", "不以單一結果定義學生；每一條合規且適合的進路都值得被認真了解。"],
  },
  {
    title: "降低資訊與試算門檻",
    icon: BookOpenCheck,
    color: "bg-violet-50 text-violet-700 ring-violet-100",
    text: "不同就學區與招生管道可能採用不同的比序項目、積分、換算方式與作業時程。透過清楚的入口、流程說明與提醒，我們希望減少反覆查找、人工比對與漏看規則帶來的壓力。",
    points: ["將複雜流程拆成可以一步步完成的行動清單。", "提醒查榜結果、校方公告、報到期限與所需文件必須一起確認。", "遇到資格、資料或結果疑義時，優先引導使用者回到正確的官方窗口詢問。"],
  },
  {
    title: "維持公開、免費與負責任",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-800 ring-amber-100",
    text: "基礎升學資訊應該容易取得。本網站不要求建立帳號，並盡可能提供免費的資訊整理與使用導引。同時，我們會說明資訊的參考性質，讓使用者知道哪些事項必須以正式公告為準。",
    points: ["本站協助整理與導覽，不是招生單位、學校或招生委員會。", "不代替使用者辦理報名、查詢錄取、報到、複查或放棄資格等正式程序。", "日期、名額、資格、文件與作業方式可能調整，請以當年度、所屬就學區及錄取學校公告為正式依據。"],
  },
];

export function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8" tabIndex={-1}>
      <div className="mb-5"><BackButton /></div>
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 px-5 py-9 text-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.9)] sm:rounded-[42px] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-[0.16em] text-sky-100 ring-1 ring-white/15"><Sparkles className="h-4 w-4" /> ABOUT THIS PLATFORM</div>
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">讓升學資訊，成為更安心的下一步</h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-300">升學是學生與家庭共同面對的重要選擇，但資訊往往分散、規則也不容易理解。我們希望做的，是把複雜資料整理得更清楚，讓每個人都能更有方向地規劃下一步。</p>
        </div>
      </section>

      <section className="mt-9 rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_24px_64px_-48px_rgba(15,23,42,0.65)] sm:p-8">
        <p className="text-xs font-black tracking-[0.16em] text-sky-700">我們想做的事</p>
        <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">不是替你決定，而是幫你看懂選擇</h2>
        <div className="mt-5 max-w-4xl space-y-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          <p>查榜、報到與後續升學流程常常發生在時間緊湊的幾天內。當網站、簡章、學校公告與親友訊息同時湧入，很容易因為找不到入口、看漏期限或誤解規則而感到焦慮。</p>
          <p>這個平台以資訊整理與流程導引為核心，協助使用者從自己參加的就學區或招生管道出發，找到對應的官方系統、了解查到錄取結果後的待辦，並把重要提醒放在容易看見的位置。</p>
          <p>我們相信，好的資訊服務不是給出一個替代答案，而是讓學生與家庭有足夠時間、正確資訊與合適支持，做出屬於自己的決定。</p>
        </div>
      </section>

      <section className="mt-9 grid gap-5 md:grid-cols-2">
        {principles.map(({ title, icon: Icon, color, text, points }) => (
          <article key={title} className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_22px_56px_-46px_rgba(15,23,42,0.6)] sm:p-7">
            <span className={`flex h-12 w-12 items-center justify-center rounded-[18px] ring-1 ${color}`}><Icon className="h-6 w-6" /></span>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">{title}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
            <ul className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm font-semibold leading-6 text-slate-600">
              {points.map((point) => <li key={point} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />{point}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-9 rounded-[30px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-5 shadow-[0_24px_64px_-48px_rgba(14,165,233,0.45)] sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white"><HeartHandshake className="h-6 w-6" /></div>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">使用資訊前，請記得這幾件事</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] bg-white/85 p-4 shadow-sm ring-1 ring-white"><p className="font-black text-slate-950">以官方公告為準</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">招生簡章、就學區委員會與錄取學校公告，才是辦理正式程序的依據。</p></div>
          <div className="rounded-[22px] bg-white/85 p-4 shadow-sm ring-1 ring-white"><p className="font-black text-slate-950">重要期限要自己確認</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">查榜、報到、複查與放棄資格的日期可能不同，請主動記入行事曆。</p></div>
          <div className="rounded-[22px] bg-white/85 p-4 shadow-sm ring-1 ring-white"><p className="font-black text-slate-950">遇到疑義直接問窗口</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">涉及結果、資格或文件時，請聯繫招生委員會、原國中或錄取學校承辦人。</p></div>
        </div>
      </section>
    </main>
  );
}
