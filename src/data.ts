import { SCHEDULE_EVENTS } from "./schedule";
// Date-only PDF milestones use Taipei day boundaries for website display, not official opening hours.
export const YEAR = 2027;
export const SCORE_OPEN_DATE = `${YEAR}-06-04T00:00:00`;
export const SCORE_CLOSE_DATE = `${YEAR}-06-18T00:00:00`;
export const ADMISSION_LIST_OPEN_DATE = `${YEAR}-06-18T00:00:00`;
export const ADMISSION_LIST_CLOSE_DATE = `${YEAR}-06-25T00:00:00`;
export const RESULT_WARNING_UNLOCK_DATE = `${YEAR}-07-06T00:00:00`;
export const RESULT_LIST_OPEN_DATE = `${YEAR}-07-06T00:00:00`;
export const RESULT_LIST_CLOSE_DATE = `${YEAR}-07-30T23:59:59`;
export const FIREWORK_SHOW_START_DATE = `${YEAR}-07-09T00:00:00`;
export const REGISTRATION_COMPLETE_DATE = `${YEAR}-07-09T00:00:00`;
export const VOLUNTEER_URL = "https://tyctw.github.io/volunteer/";
export const SPARE_URL = "https://tyctw.github.io/spare/";
export const RESULT_LOOKUP_URL = "#regions-title";
export const FRESHMAN_GUIDE_URL = "https://tyctw.github.io/freshman/";
export const THREADS_COMMUNITY_URL = "https://www.threads.net/@115.rcpet";

export const LATEST_ANNOUNCEMENT = {
  active: true,
  text: "116年國中教育會考倒數計時中，請考生多加留意重要日程。本平台將持續更新最新資訊。",
  date: "2027-06-19",
};

export const REGIONS = [
  { id: 'tp', name: '基北區', url: 'https://ttk.entry.edu.tw/NoExamImitate_TP/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'blue', category: '北部區域' },
  { id: 'tl', name: '桃連區', url: 'https://tyc.entry.edu.tw/NoExamImitate_TL/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'indigo', category: '北部區域' },
  { id: 'hm', name: '竹苗區', url: 'https://hhm.entry.edu.tw/NoExamImitate_HM/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'teal', category: '北部區域' },
  { id: 'ct', name: '中投區', url: 'https://ct.entry.edu.tw/NoExamImitate_CT/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'emerald', category: '中部區域' },
  { id: 'chc', name: '彰化區', url: 'https://chc.entry.edu.tw/NoExamImitate_CH/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'orange', category: '中部區域' },
  { id: 'ylc', name: '雲林區', url: 'https://ylc.entry.edu.tw/NoExamImitate_YL/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'lime', category: '中部區域' },
  { id: 'cyc', name: '嘉義區', url: 'https://cyc.entry.edu.tw/NoExamImitate_CY/NoExamImitateAdmissionList/', colorClass: 'amber', category: '中部區域' },
  { id: 'tn', name: '台南區', url: 'https://tn.entry.edu.tw/NoExamImitate_TN/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'red', category: '南部區域' },
  { id: 'kh', name: '高雄區', url: 'https://kh.entry.edu.tw/stu_result/login.php', colorClass: 'rose', category: '南部區域' },
  { id: 'ptc', name: '屏東區', url: 'https://ptc.entry.edu.tw/NoExamImitate_PT/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'pink', category: '南部區域' },
  { id: 'iln', name: '宜蘭區', url: 'https://iln.entry.edu.tw//NoExamImitate_IL/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'violet', category: '東部區域' },
  { id: 'ttf', name: '台東區', url: 'https://ttf.entry.edu.tw/NoExamImitate_TT/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'purple', category: '東部區域' },
  { id: 'hlc', name: '花蓮區', url: 'https://hlc.entry.edu.tw/NoExamImitate_HL/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'fuchsia', category: '東部區域' },
  { id: 'ph', name: '澎湖區', url: 'https://ph.entry.edu.tw/', colorClass: 'sky', category: '離島區域' },
  { id: 'km', name: '金門區', url: 'https://km.entry.edu.tw/NoExamImitate_KM/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'yellow', category: '離島區域' },
];

// Homepage highlights share the exact dates of the complete source schedule.
const highlightTitles: Record<string, string> = {
  '國中教育會考報名': 'reg',
  '寄發國中教育會考准考證': 'card',
  '國中教育會考': 'exam',
  '寄發國中教育會考成績通知單並開放網路查詢': 'score',
  '各就學區免試入學開放個人序位查詢及志願選填': 'rank',
  '各就學區個人序位查詢、免試入學及特色招生考試分發入學志願選填截止日': 'vol-end',
  '各就學區高級中等學校免試入學、特色招生考試分發入學報名截止日': 'registration-end',
  '各就學區免試入學及特色招生考試分發入學放榜': 'final',
  '五專聯合免試入學現場登記分發報到': 'joint-registration',
  '各就學區免試入學及特色招生考試分發入學報到': 'admission-registration',
  '各就學區免試入學及特色招生考試分發入學報到後聲明放棄錄取資格': 'admission-waiver-deadline',
};
export const EVENTS = SCHEDULE_EVENTS.filter(event => highlightTitles[event.title]).map(event => ({
  ...event, id: highlightTitles[event.title],
  // Countdown intervals include the last calendar day.
  dateEnd: event.dateEnd ? `${event.dateEnd}T23:59:59` : undefined,
}));

export const FAQ_DATA = [
  { q: "免試入學分發結果什麼時候查？", a: "116學年度各就學區免試入學分發結果於116年7月6日（二）放榜，實際開放查詢時刻依各區公告。請在本頁「各就學區查榜入口」選擇自己的就學區，再依各區系統指示輸入資料查詢錄取學校。" },
  { q: "查到錄取後，報到時間是什麼時候？", a: "錄取學生原則上應於116年7月8日（四）依學校指定時段到錄取學校辦理報到。部分學校可能另有分流、線上表單或校內指定流程，請務必查看錄取學校網站公告。" },
  { q: "報到要準備哪些文件？", a: "通常需攜帶國中畢業證書正本或同等學歷證件，以及身分證明文件，例如身分證、健保卡、學生證或戶口名簿。建議同時查看錄取學校公告，確認是否需要錄取通知單、照片、影本或其他表件。" },
  { q: "對分發結果有疑問，可以複查嗎？", a: "複查申請請依各就學區簡章辦理；教育部重要日程表未列統一複查日期與時段。複查通常須依各就學區簡章填表、繳費並到指定地點辦理，不是重新分發或重新比序。" },
  { q: "沒有報到或想參加其他管道怎麼辦？", a: "錄取後未依期限完成報到，通常視同放棄錄取資格。若已完成報到但要參加後續其他招生管道，須依規定向錄取學校聲明放棄錄取資格，教育部日程表列於116年7月12日（一）辦理，實際截止時刻依各區簡章。續招與其他管道請以各校及各就學區公告為準。" },
];
