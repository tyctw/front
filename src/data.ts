export const YEAR = 2027;
export const SCORE_OPEN_DATE = `${YEAR}-06-05T08:00:00`;
export const SCORE_CLOSE_DATE = `${YEAR}-06-18T12:00:00`;
export const ADMISSION_LIST_OPEN_DATE = `${YEAR}-06-18T12:00:00`;
export const ADMISSION_LIST_CLOSE_DATE = `${YEAR}-06-25T12:00:00`;
export const RESULT_WARNING_UNLOCK_DATE = `${YEAR}-07-07T09:00:00`;
export const RESULT_LIST_OPEN_DATE = `${YEAR}-07-07T11:00:00`;
export const RESULT_LIST_CLOSE_DATE = `${YEAR}-07-30T23:59:59`;
export const FIREWORK_SHOW_START_DATE = `${YEAR}-07-09T11:30:00`;
export const REGISTRATION_COMPLETE_DATE = `${YEAR}-07-09T11:30:00`;
export const VOLUNTEER_URL = "https://tyctw.github.io/volunteer/";
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

export const EVENTS = [
  { id: 'reg', title: '國中教育會考報名', dateStart: `${YEAR}-03-05T08:00:00`, dateEnd: `${YEAR}-03-07T17:00:00`, isRange: true },
  { id: 'card', title: '寄發准考證', dateStart: `${YEAR}-04-10T08:00:00`, isRange: false },
  { id: 'exam', title: '國中教育會考日期', dateStart: `${YEAR}-05-15T08:00:00`, dateEnd: `${YEAR}-05-16T12:00:00`, isRange: true },
  { id: 'score', title: '國中教育會考成績公布', dateStart: SCORE_OPEN_DATE, isRange: false },
  { id: 'rank', title: '個人序位區間公告/查詢', dateStart: ADMISSION_LIST_OPEN_DATE, isRange: false },
  { id: 'vol', title: '就學區免試入學志願選填', dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE, isRange: true },
  { id: 'final', title: '就學區免試入學放榜', dateStart: RESULT_LIST_OPEN_DATE, isRange: false },
  {
    id: 'joint-registration',
    title: '五專聯合免試入學與藝才班分發報到',
    details: [
      '五專聯合免試入學現場登記分發報到',
      '藝才班（獨招學校、戲劇班、舞蹈班、音樂班、美術班）各區分發報到',
    ],
    dateStart: `${YEAR}-07-08T08:00:00`,
    isRange: false,
  },
  {
    id: 'admission-registration',
    title: '免試入學、特色招生與各類班別報到',
    details: [
      '免試入學及特色招生考試分發入學報到',
      '藝才班（獨招學校、戲劇班、舞蹈班、音樂班、美術班）報到後聲明放棄錄取資格截止日',
      '建教合作班入學報到截止日',
      '體育班、運動績優生（甄審、甄試及獨招學校）報到',
    ],
    dateStart: `${YEAR}-07-09T08:00:00`,
    isRange: false,
  },
  {
    id: 'admission-waiver-deadline',
    title: '報到後聲明放棄錄取資格截止日',
    details: [
      '免試入學及特色招生考試分發入學報到後聲明放棄錄取資格截止日',
      '體育班、運動績優生（甄審、甄試及獨招學校）報到後聲明放棄錄取資格截止日',
      '五專聯合免試入學報到後聲明放棄錄取資格截止日',
    ],
    dateStart: `${YEAR}-07-13T08:00:00`,
    isRange: false,
  },
];

export const FAQ_DATA = [
  { q: "免試入學分發結果什麼時候查？", a: "116學年度各就學區免試入學分發結果於116年7月7日（三）上午11:00起開放查詢。請在本頁「各就學區查榜入口」選擇自己的就學區，再依各區系統指示輸入資料查詢錄取學校。" },
  { q: "查到錄取後，報到時間是什麼時候？", a: "錄取學生原則上應於116年7月9日（五）上午9:00至11:00到錄取學校辦理報到。部分學校可能另有分流、線上表單或校內指定流程，請務必查看錄取學校網站公告。" },
  { q: "報到要準備哪些文件？", a: "通常需攜帶國中畢業證書正本或同等學歷證件，以及身分證明文件，例如身分證、健保卡、學生證或戶口名簿。建議同時查看錄取學校公告，確認是否需要錄取通知單、照片、影本或其他表件。" },
  { q: "對分發結果有疑問，可以複查嗎？", a: "可以。116學年度免試入學分發結果複查多安排於116年7月8日（四）辦理，部分區域作業時間為上午8:00至中午12:00。複查通常須依各就學區簡章填表、繳費並到指定地點辦理，不是重新分發或重新比序。" },
  { q: "沒有報到或想參加其他管道怎麼辦？", a: "錄取後未依期限完成報到，通常視同放棄錄取資格。若已完成報到但要參加後續其他招生管道，須依規定向錄取學校聲明放棄錄取資格，116學年度多數區域期限為116年7月13日（二）下午2:00前。續招與其他管道請以各校及各就學區公告為準。" },
];
