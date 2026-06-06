export const YEAR = 2026;
export const SCORE_OPEN_DATE = `${YEAR}-06-05T08:00:00`;
export const SCORE_CLOSE_DATE = `${YEAR}-06-18T12:00:00`;
export const ADMISSION_LIST_OPEN_DATE = `${YEAR}-06-18T12:00:00`;
export const ADMISSION_LIST_CLOSE_DATE = `${YEAR}-06-25T12:00:00`;

export const LATEST_ANNOUNCEMENT = {
  active: true,
  text: "115年國中教育會考倒數計時中，請考生多加留意重要日程。本平台將持續更新最新資訊。",
  date: "2026-03-01",
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
  { id: 'iln', name: '宜蘭區', url: 'https://iln.entry.edu.tw/NoExamImitate_IL/NoExamImitateHome/Page/Public/ChooseSys?s=03', colorClass: 'violet', category: '東部區域' },
  { id: 'ttf', name: '台東區', url: 'https://ttf.entry.edu.tw/NoExamImitate_TT/NoExamImitateHome/Page/Public/ChooseSys?s=15', colorClass: 'purple', category: '東部區域' },
  { id: 'hlc', name: '花蓮區', url: 'https://hlc.entry.edu.tw/NoExamImitate_HL/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'fuchsia', category: '東部區域' },
  { id: 'ph', name: '澎湖區', url: 'https://ph.entry.edu.tw/', colorClass: 'sky', category: '離島區域' },
  { id: 'km', name: '金門區', url: 'https://km.entry.edu.tw/NoExamImitate_KM/NoExamImitateAdmissionList/AdmissionList.aspx', colorClass: 'yellow', category: '離島區域' },
];

export const EVENTS = [
  { id: 'reg', title: '國中教育會考報名', dateStart: `${YEAR}-03-05T08:00:00`, dateEnd: `${YEAR}-03-07T17:00:00`, isRange: true },
  { id: 'card', title: '寄發准考證', dateStart: `${YEAR}-04-10T08:00:00`, isRange: false },
  { id: 'exam', title: '國中教育會考日期', dateStart: `${YEAR}-05-16T08:00:00`, dateEnd: `${YEAR}-05-17T12:00:00`, isRange: true },
  { id: 'score', title: '國中教育會考成績公布', dateStart: SCORE_OPEN_DATE, isRange: false },
  { id: 'rank', title: '個人序位區間公告/查詢', dateStart: ADMISSION_LIST_OPEN_DATE, isRange: false },
  { id: 'vol', title: '就學區免試入學志願選填', dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE, isRange: true },
  { id: 'final', title: '就學區免試入學放榜', dateStart: `${YEAR}-07-07T08:00:00`, isRange: false },
];

export const FAQ_DATA = [
  { q: "忘記登入密碼怎麼辦？", a: "如果您忘記了志願選填或查榜系統的密碼，請立即聯繫您就讀國中的註冊組老師協助重置，或依各就學區系統首頁之「忘記密碼」功能進行操作。請勿嘗試多次錯誤輸入以免帳號被鎖定。" },
  { q: "什麼時候可以查詢個人序位區間？", a: "115學年度個人序位區間查詢時間預計於 115年06月18日(四) 中午12:00 開放，至 115年06月25日(四) 中午12:00 截止。請務必在期限內完成查詢並進行志願選填。" },
  { q: "免試入學分發結果如何查詢？", a: "各就學區免試入學放榜時間為 115年07月07日(二)。屆時請點選本平台上方之「各就學區查榜入口」，選擇您的就學區並輸入相關資料即可查詢錄取學校。" },
  { q: "如果對成績有疑義可以複查嗎？", a: "可以。若對國中教育會考成績有疑義，請在成績公布後（依簡章規定日期）向試務會提出複查申請。需注意複查僅確認分數計算無誤，不重新閱卷。" },
  { q: "超額比序是什麼？", a: "當報名人數超過學校招生名額時，會依據各就學區訂定之「超額比序項目」積分高低進行錄取。常見項目包含：多元學習表現、志願序、教育會考成績等。詳細比序規則請參閱各區簡章。" },
];
