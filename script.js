const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";
const FACEBOOK_PAGE_ID = "61563211834277";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61563211834277&locale=vi_VN";
const FACEBOOK_PROFILE_URL = "https://www.facebook.com/profile.php?id=100057491366920";
const CUSTOMER_CONTACT_URL = FACEBOOK_PAGE_URL;
const BUSINESS_INBOX_URL = "https://business.facebook.com/latest/inbox/all?asset_id=61563211834277";

const form = document.querySelector("#readingForm");
const resultCard = document.querySelector("#resultCard");
const shareTop = document.querySelector("#shareTop");
const shareResult = document.querySelector("#shareResult");
const facebookLogin = document.querySelector("#facebookLogin");
const pageLink = document.querySelector("#pageLink");
const profileLink = document.querySelector("#profileLink");
const businessInboxLink = document.querySelector("#businessInboxLink");
const messengerTop = document.querySelector("#messengerTop");
const floatingMessenger = document.querySelector("#floatingMessenger");
const readingType = document.querySelector("#readingType");
const readingMode = document.querySelector("#readingMode");
const partnerFields = document.querySelector("#partnerFields");
const topicSelect = document.querySelector("#topicSelect");
const questionHint = document.querySelector("#questionHint");
const astrologyFields = document.querySelectorAll(".astrology-field");
const deepQuestionFields = [
  form.elements.deepQuestion1,
  form.elements.deepQuestion2,
  form.elements.deepQuestion3,
];

let latestShareText = "Tôi vừa gieo quẻ trên Xem Bói An Nhiên.";
let latestConsultText = "";

pageLink.href = FACEBOOK_PAGE_URL;
profileLink.href = FACEBOOK_PROFILE_URL;
businessInboxLink.href = BUSINESS_INBOX_URL;
messengerTop.href = CUSTOMER_CONTACT_URL;
floatingMessenger.href = CUSTOMER_CONTACT_URL;

readingType.addEventListener("change", () => {
  const isTarot = readingType.value === "tarot";
  for (const field of astrologyFields) {
    field.hidden = isTarot;
  }
  form.elements.fullName.required = !isTarot;
  form.elements.birthDate.required = !isTarot;
  partnerFields.hidden = isTarot || readingMode.value !== "couple";
  for (const field of partnerFields.querySelectorAll("input")) {
    field.required = !isTarot && readingMode.value === "couple" && field.name !== "partnerBirthTime";
  }
  updateDeepQuestionPrompts();
});

const deepQuestionSuggestions = {
  "tong-quan": [
    "Vấn đề cốt lõi tôi cần nhìn thẳng lúc này là gì?",
    "Trong 7 ngày tới tôi nên ưu tiên điều gì để mở vận?",
    "Tôi đang lặp lại mẫu cũ nào mà chưa nhận ra?",
  ],
  "tinh-duyen": [
    "Người ấy thật sự đang cần điều gì từ mối quan hệ này?",
    "Mối quan hệ này có điểm nghẽn cảm xúc nào cần tháo?",
    "Tôi nên chủ động, chờ đợi hay đặt ranh giới rõ hơn?",
  ],
  "su-nghiep": [
    "Điểm nghẽn lớn nhất trong công việc của tôi hiện tại là gì?",
    "Tôi nên tập trung vào cơ hội nào để có kết quả rõ nhất?",
    "Có dấu hiệu nào cho thấy tôi nên đổi hướng hoặc kiên trì?",
  ],
  "tai-loc": [
    "Dòng tiền của tôi đang bị hao ở điểm nào?",
    "Cơ hội tăng thu gần nhất đến từ kỹ năng hay mối quan hệ nào?",
    "Tôi nên tránh quyết định tài chính nào trong thời gian tới?",
  ],
  couple: [
    "Hai đứa có duyên đi đường dài không?",
    "Điểm lệch lớn nhất giữa em và người ấy là gì?",
    "Em nên làm gì để mối quan hệ rõ ràng hơn trong 7 ngày tới?",
  ],
  tarot: [
    "Tôi cần nhìn rõ điều gì trong tình huống này?",
    "Năng lượng hiện tại đang nghiêng về hướng nào?",
    "Lá bài khuyên tôi nên hành động ra sao?",
  ],
};

function updateDeepQuestionPrompts() {
  const key = readingType.value === "tarot" ? "tarot" : readingMode.value === "couple" ? "couple" : topicSelect.value;
  const suggestions = deepQuestionSuggestions[key] || deepQuestionSuggestions["tong-quan"];
  questionHint.textContent = `Gợi ý: ${suggestions.join(" · ")}`;
  deepQuestionFields.forEach((field, index) => {
    field.placeholder = suggestions[index];
  });
}

readingMode.addEventListener("change", () => {
  const isCouple = readingMode.value === "couple";
  partnerFields.hidden = !isCouple;
  for (const field of partnerFields.querySelectorAll("input")) {
    field.required = isCouple && field.name !== "partnerBirthTime";
  }
  if (isCouple) {
    topicSelect.value = "tinh-duyen";
  }
  updateDeepQuestionPrompts();
});

topicSelect.addEventListener("change", updateDeepQuestionPrompts);
updateDeepQuestionPrompts();

const topicCopy = {
  "tong-quan": {
    title: "Tổng quan",
    lines: [
      "Vận khí hôm nay hợp với việc thu gọn mục tiêu, chọn một việc quan trọng và làm đến nơi.",
      "Nếu phải quyết định, hãy dựa vào dữ kiện đã có thay vì nghe quá nhiều ý kiến trái chiều.",
      "Một cuộc trò chuyện rõ ràng sẽ giúp tháo nút thắt đang nằm ở giữa kế hoạch.",
    ],
  },
  "tinh-duyen": {
    title: "Tình duyên",
    lines: [
      "Tình cảm nghiêng về sự lắng nghe, bớt thử lòng và nói thẳng điều mình cần.",
      "Người độc thân dễ có tín hiệu tốt từ một mối quan hệ bắt đầu bằng sự tự nhiên.",
      "Người đang yêu nên ưu tiên một buổi nói chuyện nhẹ nhàng hơn là tranh luận đúng sai.",
    ],
  },
  "su-nghiep": {
    title: "Sự nghiệp",
    lines: [
      "Công việc hợp với chiến lược chậm mà chắc, tránh ôm thêm việc khi nền cũ chưa vững.",
      "Một người có kinh nghiệm có thể giúp bạn rút ngắn đường vòng nếu bạn hỏi đúng câu.",
      "Hãy ưu tiên việc có kết quả đo được trong 48 giờ tới.",
    ],
  },
  "tai-loc": {
    title: "Tài lộc",
    lines: [
      "Tài chính cần kỷ luật nhỏ mỗi ngày hơn là một quyết định quá táo bạo.",
      "Nên soát lại khoản chi lặp lại và trì hoãn giao dịch chưa thật cần thiết.",
      "Có cơ hội tăng thu nếu bạn biết đóng gói kỹ năng thành một dịch vụ rõ ràng.",
    ],
  },
};

const palaces = [
  "Bình Hòa",
  "Minh Đường",
  "Thanh Mộc",
  "Kim Đăng",
  "Thủy An",
  "Sơn Nguyệt",
  "Hỏa Âm",
  "Vân Cát",
  "Lưu Quang",
  "Thiên Khôi",
  "Ngọc Đường",
  "Phúc Tinh",
];

const elementsByMonth = [
  "Thủy",
  "Mộc",
  "Mộc",
  "Thổ",
  "Hỏa",
  "Hỏa",
  "Thổ",
  "Kim",
  "Kim",
  "Thổ",
  "Thủy",
  "Thủy",
];

const elementAdvice = {
  Kim: "Kim vượng ở sự rõ ràng: càng bớt rườm rà, đường đi càng sáng.",
  Mộc: "Mộc vượng ở sự phát triển: nên nuôi một việc dài hạn thay vì nóng vội đổi hướng.",
  Thủy: "Thủy vượng ở khả năng thích nghi: mềm mỏng nhưng cần giữ ranh giới.",
  Hỏa: "Hỏa vượng ở hành động: hợp khởi động việc mới, nhưng tránh phản ứng theo cảm xúc.",
  Thổ: "Thổ vượng ở nền tảng: làm chắc phần gốc trước khi mở rộng.",
};

const zodiacData = [
  ["Ma Kết", 120],
  ["Bảo Bình", 219],
  ["Song Ngư", 320],
  ["Bạch Dương", 420],
  ["Kim Ngưu", 521],
  ["Song Tử", 621],
  ["Cự Giải", 722],
  ["Sư Tử", 823],
  ["Xử Nữ", 923],
  ["Thiên Bình", 1023],
  ["Bọ Cạp", 1122],
  ["Nhân Mã", 1222],
  ["Ma Kết", 1232],
];

const zodiacAdvice = {
  "Bạch Dương": "Bạn có khí mở đường mạnh: khi đã thấy đúng thì muốn làm ngay. Điểm sáng là tốc độ và lòng can đảm, điểm cần giữ là đừng biến sự nóng ruột thành áp lực lên người khác.",
  "Kim Ngưu": "Bạn có nền khí bền và thực tế. Vận tốt thường đến khi bạn tích lũy đều, nhưng nếu quá sợ thay đổi thì cơ hội mới dễ trôi qua trước mắt.",
  "Song Tử": "Bạn có đầu óc linh hoạt, bắt tín hiệu nhanh và giỏi xoay chuyển. Điểm nghẽn là dễ phân tán, nên cần chọn một hướng chính để năng lượng không bị rải mỏng.",
  "Cự Giải": "Bạn nhạy cảm với không khí xung quanh và dễ nhận ra điều người khác chưa nói. Đây là trực giác tốt, nhưng cần phân biệt cảm nhận thật với nỗi lo tự tạo.",
  "Sư Tử": "Bạn có khí chất dẫn dắt và nhu cầu được ghi nhận. Khi dùng sự tự tin để nâng người khác lên, vận quý nhân dễ mở; khi cố chứng minh quá nhiều, vận lại nặng.",
  "Xử Nữ": "Bạn mạnh ở khả năng nhìn lỗi, sửa hệ thống và làm việc có chuẩn. Đừng để sự cầu toàn làm chậm quyết định vốn đã đủ dữ kiện.",
  "Thiên Bình": "Bạn có duyên hòa giải, biết nhìn hai phía và tạo cảm giác dễ chịu. Bài học là đừng vì giữ hòa khí mà trì hoãn một lời nói thật cần thiết.",
  "Bọ Cạp": "Bạn có nội lực sâu, càng khó càng muốn hiểu tận gốc. Khi biết buông kiểm soát, bạn sẽ thấy nhẹ hơn và quyết định sáng hơn.",
  "Nhân Mã": "Bạn có tầm nhìn rộng, hợp học hỏi, di chuyển và mở hướng mới. Vận tốt đến khi sự tự do đi cùng kỷ luật, không phải đi cùng bốc đồng.",
  "Ma Kết": "Bạn có ý chí vững và chịu được đường dài. Điểm cần tránh là tự biến trách nhiệm thành gánh nặng, khiến bản thân khó nhận hỗ trợ.",
  "Bảo Bình": "Bạn có tư duy khác biệt, thích cách làm mới và thường thấy lối ra khi người khác chỉ thấy khuôn cũ. Cần nối ý tưởng với hành động cụ thể để vận không chỉ nằm trên giấy.",
  "Song Ngư": "Bạn có cảm nhận tinh tế và dễ chạm vào phần sâu của người khác. Khi có ranh giới rõ, lòng tốt của bạn trở thành sức mạnh thay vì sự hao tổn.",
};

const numerologyAdvice = {
  1: "Số 1 thiên về độc lập, cần quyết đoán nhưng đừng tự ôm hết mọi việc.",
  2: "Số 2 thiên về kết nối, hợp hợp tác và chữa lành hiểu lầm.",
  3: "Số 3 thiên về biểu đạt, nên nói rõ ý tưởng và tránh lan man.",
  4: "Số 4 thiên về kỷ luật, càng có quy trình càng dễ gặp may.",
  5: "Số 5 thiên về thay đổi, hợp thử nghiệm nhưng cần kiểm soát rủi ro.",
  6: "Số 6 thiên về trách nhiệm, nên cân bằng giữa chăm người và chăm mình.",
  7: "Số 7 thiên về chiều sâu, hợp nghiên cứu, tĩnh tâm và nhìn lại.",
  8: "Số 8 thiên về thành tựu, hợp thương lượng lợi ích và quản trị tiền bạc.",
  9: "Số 9 thiên về bao dung, nên khép lại việc cũ để mở vận mới.",
};

const majorArcana = [
  ["The Fool", "Kẻ Khờ", "0", "khởi đầu mới, niềm tin và sự tự do", "vội vàng, thiếu chuẩn bị hoặc né trách nhiệm"],
  ["The Magician", "Nhà Ảo Thuật", "I", "biến ý tưởng thành hành động", "tiềm năng chưa dùng đúng cách"],
  ["The High Priestess", "Nữ Tư Tế", "II", "trực giác, bí mật và điều chưa nói", "nhiễu cảm xúc, khó nghe tiếng lòng"],
  ["The Empress", "Hoàng Hậu", "III", "nuôi dưỡng, phát triển và sức hút", "cho đi quá mức hoặc thiếu chăm sóc bản thân"],
  ["The Emperor", "Hoàng Đế", "IV", "trật tự, ranh giới và quyết định rõ", "kiểm soát cứng hoặc thiếu nền tảng"],
  ["The Hierophant", "Giáo Hoàng", "V", "niềm tin, cam kết và khuôn phép", "mắc kẹt trong khuôn cũ"],
  ["The Lovers", "Nhân Tình", "VI", "lựa chọn từ trái tim và sự hòa hợp", "lệch giá trị hoặc thiếu cam kết"],
  ["The Chariot", "Cỗ Xe", "VII", "ý chí, tiến lên và kiểm soát hướng đi", "giằng co, mất hướng hoặc nóng vội"],
  ["Strength", "Sức Mạnh", "VIII", "kiên nhẫn, mềm mà vững và nội lực", "mệt mỏi hoặc tự nghi ngờ"],
  ["The Hermit", "Ẩn Sĩ", "IX", "chiêm nghiệm và tìm câu trả lời bên trong", "cô lập hoặc suy nghĩ quá lâu"],
  ["Wheel of Fortune", "Bánh Xe Số Phận", "X", "chu kỳ mới, cơ hội và bước ngoặt", "kẹt vòng lặp cũ"],
  ["Justice", "Công Lý", "XI", "sự thật, cân bằng và nhân quả", "thiếu công bằng hoặc né sự thật"],
  ["The Hanged Man", "Người Treo Ngược", "XII", "tạm dừng, đổi góc nhìn và buông kiểm soát", "trì hoãn vô ích"],
  ["Death", "Cái Chết", "XIII", "kết thúc để tái sinh", "kháng cự thay đổi"],
  ["Temperance", "Tiết Chế", "XIV", "chữa lành, cân bằng và phối hợp", "mất nhịp hoặc thiếu điều độ"],
  ["The Devil", "Ác Quỷ", "XV", "ràng buộc, ham muốn và phần bóng tối", "phụ thuộc hoặc tự trói mình"],
  ["The Tower", "Tòa Tháp", "XVI", "đổ vỡ để lộ sự thật", "né tránh cú thay đổi cần thiết"],
  ["The Star", "Ngôi Sao", "XVII", "hy vọng, chữa lành và định hướng sáng", "mất niềm tin hoặc cần hồi phục"],
  ["The Moon", "Mặt Trăng", "XVIII", "mơ hồ, trực giác và nỗi sợ ẩn", "ảo tưởng dần được tháo gỡ"],
  ["The Sun", "Mặt Trời", "XIX", "rõ ràng, thành công và sức sống", "niềm vui bị che khuất"],
  ["Judgement", "Phán Xét", "XX", "thức tỉnh, gọi tên sự thật và bước sang giai đoạn mới", "chưa sẵn sàng đáp lời thay đổi"],
  ["The World", "Thế Giới", "XXI", "hoàn tất, trưởng thành và mở chu kỳ mới", "còn thiếu một mảnh để khép vòng"],
].map(([name, vi, symbol, upright, reversed]) => ({ name, vi, symbol, upright, reversed }));

const suitConfig = {
  Cups: { vi: "Cốc", symbol: "C", theme: "cảm xúc, tình yêu và trực giác", blocked: "cảm xúc bị kẹt hoặc kỳ vọng chưa nói" },
  Wands: { vi: "Gậy", symbol: "G", theme: "đam mê, hành động và ý chí", blocked: "nóng vội, thiếu lửa hoặc hành động lệch hướng" },
  Swords: { vi: "Kiếm", symbol: "K", theme: "suy nghĩ, sự thật và quyết định", blocked: "căng thẳng, nghi ngờ hoặc lời nói sắc quá mức" },
  Pentacles: { vi: "Tiền", symbol: "T", theme: "vật chất, công việc và sự ổn định", blocked: "bất ổn tài chính hoặc thiếu nền tảng thực tế" },
};

const minorRanks = [
  ["Ace", "Át", "khởi nguồn năng lượng mới"],
  ["Two", "Hai", "lựa chọn, cân bằng hoặc đối ứng"],
  ["Three", "Ba", "phát triển, kết nối và bước đầu thành hình"],
  ["Four", "Bốn", "ổn định, giữ lại hoặc tạm dừng"],
  ["Five", "Năm", "xáo trộn, thử thách và bài học"],
  ["Six", "Sáu", "điều chỉnh, hồi phục và trao đổi"],
  ["Seven", "Bảy", "kiểm chứng, phòng thủ hoặc chọn lọc"],
  ["Eight", "Tám", "chuyển động, nỗ lực và tăng tốc"],
  ["Nine", "Chín", "kết tinh, độc lập và thành quả gần tới"],
  ["Ten", "Mười", "hoàn tất một chu kỳ và gánh trách nhiệm"],
  ["Page", "Tiểu Đồng", "tin tức, học hỏi và tín hiệu ban đầu"],
  ["Knight", "Kỵ Sĩ", "hành động, theo đuổi và biến chuyển"],
  ["Queen", "Nữ Hoàng", "làm chủ nội tâm và nuôi dưỡng năng lượng"],
  ["King", "Vua", "làm chủ tình huống và quyết định trưởng thành"],
];

const minorArcana = Object.entries(suitConfig).flatMap(([suit, config]) =>
  minorRanks.map(([rank, rankVi, rankMeaning], index) => ({
    name: `${rank} of ${suit}`,
    vi: `${rankVi} ${config.vi}`,
    symbol: `${config.symbol}${index + 1}`,
    upright: `${rankMeaning} trong lĩnh vực ${config.theme}`,
    reversed: `${config.blocked}; bài học là xử lý phần ${rankMeaning.toLowerCase()} chưa ổn`,
  }))
);

const tarotDeck = [...majorArcana, ...minorArcana];

function hashText(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function getZodiac(date) {
  const marker = (date.getMonth() + 1) * 100 + date.getDate();
  return zodiacData.find(([, end]) => marker <= end)[0];
}

function getLifePath(dateText) {
  let value = dateText.replace(/\D/g, "").split("").reduce((sum, digit) => sum + Number(digit), 0);
  while (value > 9) {
    value = String(value).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value || 1;
}

function getHourBranch(timeText) {
  if (!timeText) {
    return "Giờ sinh chưa rõ";
  }

  const hour = Number(timeText.split(":")[0]);
  const branches = [
    "Tý",
    "Sửu",
    "Sửu",
    "Dần",
    "Dần",
    "Mão",
    "Mão",
    "Thìn",
    "Thìn",
    "Tỵ",
    "Tỵ",
    "Ngọ",
    "Ngọ",
    "Mùi",
    "Mùi",
    "Thân",
    "Thân",
    "Dậu",
    "Dậu",
    "Tuất",
    "Tuất",
    "Hợi",
    "Hợi",
    "Tý",
  ];

  return `Giờ ${branches[hour]}`;
}

function buildPersonProfile(name, birthDateText, birthTimeText = "") {
  const birthDate = new Date(`${birthDateText}T12:00:00`);
  const zodiac = getZodiac(birthDate);
  const lifePath = getLifePath(birthDateText);
  const element = elementsByMonth[birthDate.getMonth()];
  const hourBranch = getHourBranch(birthTimeText);

  return {
    name: name.trim(),
    birthDate,
    birthDateText,
    birthTimeText,
    zodiac,
    lifePath,
    element,
    hourBranch,
  };
}

function buildQuestionAdvice(question, palace, topicTitle) {
  if (!question.trim()) {
    return `Quẻ ${palace} không khuyên bạn đi nhanh. Quẻ này nghiêng về việc nhìn lại trật tự bên trong: điều gì đang thật sự quan trọng với ${topicTitle.toLowerCase()}, điều gì chỉ là tiếng ồn, và việc nào nếu làm xong sẽ khiến các việc còn lại nhẹ hơn.`;
  }

  return `Với câu hỏi riêng của bạn, quẻ ${palace} cho thấy vấn đề không nằm ở việc có nên làm hay không, mà nằm ở thời điểm, cách nói và mức độ chuẩn bị. Hãy tách câu hỏi thành ba lớp: điều đã chắc, điều đang sợ, và một hành động nhỏ có thể kiểm chứng trong hôm nay.`;
}

function buildDeepReading(data, reading, seed) {
  const name = data.fullName.trim();
  const topicName = reading.topic.title.toLowerCase();
  const question = (data.question || "").trim();
  const questionText = question
    ? `Câu hỏi "${escapeHtml(question)}" cho thấy bạn đang cần một câu trả lời có tính định hướng hơn là một lời trấn an.`
    : `Bạn chưa đặt câu hỏi riêng, vì vậy lá số được đọc theo vận tổng quan và chủ đề ${topicName}.`;
  const tension = reading.clarity > reading.luck
    ? "Bạn đang nhìn vấn đề khá rõ, nhưng vận may chưa mở hẳn. Nghĩa là không nên phó mặc cho thời thế; càng chuẩn bị kỹ, kết quả càng đổi."
    : "May mắn đang nhỉnh hơn độ sáng rõ. Có cơ hội xuất hiện bất ngờ, nhưng nếu không đặt tiêu chí trước, bạn dễ chọn theo cảm xúc nhất thời.";
  const actionStyle = reading.energy >= 80
    ? "Năng lượng cao, hợp chủ động mở lời, chốt việc và nhận phần trách nhiệm rõ ràng."
    : reading.energy >= 65
      ? "Năng lượng vừa đủ, hợp tiến từng bước, không nên bung quá nhiều đầu việc cùng lúc."
      : "Năng lượng đang cần giữ, hợp thu gọn lịch, nghỉ đúng lúc và tránh quyết định trong trạng thái mệt.";

  return {
    overview: `${name} mang tổ hợp ${reading.zodiac} - số chủ đạo ${reading.lifePath} - hành ${reading.element}. Tổ hợp này cho thấy bên ngoài bạn có xu hướng xử lý việc bằng ${reading.zodiac === "Bảo Bình" ? "ý tưởng và góc nhìn khác biệt" : "trực giác pha lý trí"}, còn bên trong lại cần một điểm tựa rõ ràng trước khi thật sự yên tâm. ${zodiacAdvice[reading.zodiac]}`,
    hiddenPattern: `Điểm sâu của quẻ ${reading.palace} là bài học về nhịp độ. Khi nóng lòng, bạn dễ muốn tìm một dấu hiệu chắc chắn ngay; nhưng vận hiện tại lại mở theo kiểu "rõ dần qua hành động". ${elementAdvice[reading.element]} ${numerologyAdvice[reading.lifePath]}`,
    currentFlow: `${questionText} ${tension} ${actionStyle}`,
    topicFocus: buildTopicFocus(data.topic, reading),
    advice: buildQuestionAdvice(data.question || "", reading.palace, reading.topic.title),
    timeline: buildTimeline(seed, reading),
    deepAnswers: data.readingType === "tu-vi" ? buildDeepAnswers(data, reading, seed) : [],
    couple: buildCoupleReading(data, reading, seed),
    tarot: [],
  };
}

function buildTarotSpreadFromSelection(data, selectedIndexes) {
  const positions = ["Gốc vấn đề", "Hiện tại", "Lời khuyên"];
  const seed = hashText(`${data.question || ""}${selectedIndexes.join("-")}`);

  return selectedIndexes.map((cardIndex, index) => {
    const card = tarotDeck[cardIndex];
    const reversed = (seed + cardIndex + index) % 4 === 0;
    return {
      ...card,
      position: positions[index],
      reversed,
      meaning: reversed ? card.reversed : card.upright,
      visual: getTarotVisual(card),
      topicLine: getTarotTopicLine(data, { topic: { title: "Tarot" } }, card, reversed, index),
    };
  });
}

function getTarotTopicLine(data, reading, card, reversed, index) {
  const question = (data.question || "").trim();
  const topicName = {
    "tong-quan": "tổng quan",
    "tinh-duyen": "tình cảm",
    "su-nghiep": "công việc",
    "tai-loc": "tài lộc",
  }[data.topic] || "vấn đề bạn đang hỏi";
  const cardTone = reversed
    ? "đang bị nghẽn, dễ lặp lại kiểu phản ứng cũ nếu bạn nóng ruột"
    : "đang mở, nhưng chỉ rõ khi bạn chọn một hướng hành động cụ thể";

  if (data.readingMode === "couple") {
    const lines = [
      `Gốc của mối liên kết nằm ở ${card.meaning}; có phần muốn gần hơn nhưng vẫn cần cảm giác an toàn.`,
      `Hiện tại cho thấy ${card.meaning}; đừng chỉ nghe lời nói, hãy nhìn nhịp phản hồi và việc người ấy có giữ lời không.`,
      `Lời khuyên là ${card.meaning}; hãy nói rõ nhu cầu, rồi quan sát hành động đều đặn thay vì ép cam kết ngay.`,
    ];
    return lines[index];
  }

  const lines = [
    `Gốc vấn đề trong ${topicName} là ${card.meaning}. Lá này nói rằng điều bạn hỏi ${question ? `"${question}" ` : ""}${cardTone}.`,
    `Hiện tại đang vận hành qua ${card.meaning}. Điểm cần nhìn kỹ là bạn đang phản ứng theo cảm xúc, hay thật sự chọn điều có lợi về lâu dài.`,
    `Lời khuyên của lá này là ${card.meaning}. Việc nên làm trong 24-48 giờ tới là chốt một bước nhỏ, đo được, rồi mới quyết định bước lớn hơn.`,
  ];

  return lines[index];
}

function getTarotVisual(card) {
  const majorIcons = {
    "Kẻ Khờ": "☉",
    "Pháp Sư": "✦",
    "Nữ Tư Tế": "☾",
    "Hoàng Hậu": "✿",
    "Hoàng Đế": "♜",
    "Giáo Hoàng": "⚜",
    "Tình Nhân": "♡",
    "Cỗ Xe": "◆",
    "Sức Mạnh": "♌",
    "Ẩn Sĩ": "♢",
    "Bánh Xe Số Phận": "◎",
    "Công Lý": "⚖",
    "Người Treo Ngược": "▽",
    "Cái Chết": "✧",
    "Tiết Độ": "☯",
    "Ác Quỷ": "♆",
    "Tòa Tháp": "▥",
    "Ngôi Sao": "✶",
    "Mặt Trăng": "☾",
    "Mặt Trời": "☀",
    "Phán Xét": "✺",
    "Thế Giới": "⊕",
  };
  const suits = [
    { key: "Cốc", className: "cups", icon: "∪", label: "Nước" },
    { key: "Gậy", className: "wands", icon: "✦", label: "Lửa" },
    { key: "Kiếm", className: "swords", icon: "⚔", label: "Khí" },
    { key: "Tiền", className: "pentacles", icon: "✪", label: "Đất" },
  ];
  const suit = suits.find((item) => card.vi.includes(item.key));

  if (suit) {
    return {
      family: suit.className,
      icon: suit.icon,
      label: suit.label,
    };
  }

  return {
    family: "major",
    icon: majorIcons[card.vi] || card.symbol,
    label: "Ẩn chính",
  };
}

function buildDeepAnswers(data, reading, seed) {
  const questions = [data.deepQuestion1, data.deepQuestion2, data.deepQuestion3]
    .map((question) => (question || "").trim())
    .filter(Boolean)
    .slice(0, 3);
  const answerStyles = getTopicDeepAnswerStyles(data, reading);

  return questions.map((question, index) => ({
    question,
    answer: answerStyles[(seed + index) % answerStyles.length],
  }));
}

function getTopicDeepAnswerStyles(data, reading) {
  if (data.readingMode === "couple") {
    return [
      `Quẻ ${reading.palace} cho thấy mối quan hệ này cần sự rõ ràng hơn là thêm thử lòng. Nếu muốn đi xa, hai bạn cần nói thật về kỳ vọng và nhịp cam kết.`,
      `Điểm sâu nằm ở cảm giác an toàn. Khi một người im lặng hoặc né tránh, người còn lại dễ tự diễn giải. Việc nên làm là hỏi thẳng nhưng không ép câu trả lời ngay.`,
      `Duyên còn hay hết không chỉ nhìn vào cảm xúc mạnh, mà nhìn vào khả năng sửa sai sau va chạm. Trong 7 ngày tới, hãy quan sát hành động ổn định hơn lời hứa.`,
    ];
  }

  const stylesByTopic = {
    "tong-quan": [
      `Quẻ ${reading.palace} cho thấy điều cốt lõi là sắp lại thứ tự ưu tiên. Bạn đang mất năng lượng vì để việc nhỏ chen vào việc lớn.`,
      `Tổ hợp ${reading.zodiac} và số chủ đạo ${reading.lifePath} khuyên bạn nhìn lại một mẫu lặp cũ: cứ gần đến quyết định thì lại tìm thêm dấu hiệu để trì hoãn.`,
      `Trong 7 ngày tới, vận mở qua một việc rất cụ thể. Đừng hỏi "mọi thứ có tốt không", hãy hỏi "việc nào làm xong sẽ làm mọi thứ nhẹ hơn".`,
    ],
    "tinh-duyen": [
      `Tình duyên hiện tại cần sự thật mềm, không phải im lặng đẹp. Nếu có điều làm bạn bất an, hãy nói bằng nhu cầu thay vì trách móc.`,
      `Quẻ ${reading.palace} cho thấy điểm nghẽn là nhịp cảm xúc không đều. Một người muốn chắc chắn, người kia có thể cần thêm không gian.`,
      `Dấu hiệu cần chú ý là sự nhất quán. Người hợp với bạn không chỉ làm bạn rung động, mà còn khiến bạn thấy an toàn khi là chính mình.`,
    ],
    "su-nghiep": [
      `Sự nghiệp đang cần một kết quả đo được. Đừng cố chứng minh bằng quá nhiều việc; hãy chọn một mũi nhọn đủ rõ để người khác nhìn thấy năng lực.`,
      `Điểm nghẽn không hẳn là thiếu cơ hội, mà là thiếu cách đóng gói giá trị của bạn. Hãy nói rõ bạn giải quyết vấn đề gì và kết quả là gì.`,
      `Nếu đang phân vân đổi hướng, hãy thử một bước nhỏ trước khi cắt hẳn đường cũ. Quẻ này hợp kiểm chứng, không hợp quyết định trong bốc đồng.`,
    ],
    "tai-loc": [
      `Tài lộc hiện tại nghiêng về giữ tiền trước khi kiếm thêm. Có khoản hao nhỏ nhưng lặp lại đang làm dòng tiền mất lực.`,
      `Cơ hội tăng thu đến từ thứ bạn đã biết làm, không phải một hướng hoàn toàn xa lạ. Vấn đề là biến kỹ năng đó thành lời đề nghị có giá trị rõ.`,
      `Tránh quyết định tiền bạc khi muốn chứng minh bản thân. Quẻ ${reading.palace} khuyên kiểm tra rủi ro, thời hạn và người chịu trách nhiệm trước khi xuống tiền.`,
    ],
  };

  return stylesByTopic[data.topic] || stylesByTopic["tong-quan"];
}

function buildCoupleReading(data, reading, seed) {
  if (data.readingMode !== "couple") {
    return null;
  }

  const partner = buildPersonProfile(data.partnerName || "Người ấy", data.partnerBirthDate, data.partnerBirthTime);
  const selfScore = reading.lifePath + reading.energy + reading.clarity;
  const partnerScore = partner.lifePath * 11 + partner.birthDate.getDate() + partner.birthDate.getMonth();
  const harmony = 52 + ((selfScore + partnerScore + seed) % 43);
  const elementMatch = reading.element === partner.element ? "đồng khí" : "bù khí";
  const zodiacLine =
    reading.zodiac === partner.zodiac
      ? "Hai bạn có cách phản ứng khá giống nhau, dễ hiểu nhau nhưng cũng dễ cùng mắc một điểm mù."
      : `Bạn mang sắc thái ${reading.zodiac}, còn người ấy mang sắc thái ${partner.zodiac}; sự khác biệt này tạo lực hút nếu cả hai biết nói rõ nhu cầu.`;
  const advice =
    harmony >= 82
      ? "Mối quan hệ có độ hòa hợp tốt, nhưng cần tránh chủ quan. Việc nên làm là đặt một kế hoạch chung nhỏ để kiểm tra khả năng đồng hành."
      : harmony >= 68
        ? "Mối quan hệ có duyên nhưng cần học cách đi cùng nhịp. Một người muốn rõ ràng nhanh, người kia cần thời gian cảm nhận."
        : "Mối quan hệ có lực hút nhưng cũng có bài học lớn về ranh giới. Nếu tiếp tục, hai bạn cần nói thật về kỳ vọng thay vì đoán ý nhau.";

  return {
    partner,
    harmony,
    elementMatch,
    zodiacLine,
    advice,
    summary: `${data.fullName.trim()} và ${partner.name} có điểm hòa hợp ${harmony}/100, dạng ${elementMatch}.`,
  };
}

function buildTopicFocus(topic, reading) {
  const map = {
    "tong-quan": `Trong tổng quan, lá số nhấn vào việc phân biệt việc thật sự tạo kết quả với việc chỉ làm bạn bận. Ba ngày tới nên dọn một điểm nghẽn cũ, sau đó mới mở kế hoạch mới. Nếu phải chọn, hãy chọn việc làm rõ trách nhiệm và dòng tiền.`,
    "tinh-duyen": `Trong tình duyên, trọng tâm không phải ai đúng ai sai mà là cảm giác an toàn khi nói thật. Nếu đang có người trong lòng, hãy quan sát cách họ phản hồi khi bạn nói nhu cầu của mình. Nếu còn độc thân, vận tốt đến từ kết nối tự nhiên, không ép nhịp.`,
    "su-nghiep": `Trong sự nghiệp, quẻ cho thấy bạn đang ở đoạn cần chứng minh bằng kết quả cụ thể. Đừng ôm hình ảnh "phải giỏi mọi thứ"; hãy chọn một mảng có thể tạo dấu ấn rõ nhất. Người có kinh nghiệm sẽ giúp bạn nếu bạn hỏi bằng dữ kiện, không hỏi quá chung.`,
    "tai-loc": `Trong tài lộc, lá số không báo vận tiền lớn kiểu may rủi, mà báo vận chỉnh lại cách giữ tiền. Cơ hội tăng thu nằm ở việc biến kỹ năng sẵn có thành đề nghị rõ ràng: ai cần, giá trị gì, nhận kết quả khi nào.`,
  };

  return `${map[topic] || map["tong-quan"]} Với điểm sáng rõ ${reading.clarity}/100, điều cần nhất là viết ra tiêu chí trước khi quyết.`;
}

function buildTimeline(seed, reading) {
  const first = [
    "đừng vội trả lời ngay; hãy gom đủ thông tin còn thiếu.",
    "nên hoàn tất một việc nhỏ đã hứa, vì nó mở lại niềm tin.",
    "tránh tranh luận khi cảm xúc đang cao; nói chậm sẽ có lợi hơn.",
  ];
  const second = [
    "một tín hiệu tốt đến từ người từng biết năng lực của bạn.",
    "có cơ hội sửa sai hoặc nói lại cho rõ một chuyện cũ.",
    "nên kiểm tra giấy tờ, tiền bạc hoặc lịch hẹn trước khi chốt.",
  ];
  const third = [
    "hợp ra quyết định nếu bạn đã có ít nhất hai phương án dự phòng.",
    "hợp mở lời hợp tác, đặt lịch hẹn hoặc đưa ra đề nghị cụ thể.",
    "nên nghỉ và hồi phục, vì vận tốt cần thân tâm đủ ổn để nhận.",
  ];

  return [
    { label: "1-2 ngày", text: pick(first, seed) },
    { label: "3-5 ngày", text: pick(second, seed + reading.lifePath) },
    { label: "6-7 ngày", text: pick(third, seed + reading.energy) },
  ];
}

function createReading(data) {
  if (data.readingType === "tarot") {
    return createTarotOnlyReading(data);
  }

  const profile = buildPersonProfile(data.fullName, data.birthDate, data.birthTime);
  const birthDate = profile.birthDate;
  const seed = hashText(`${data.fullName}${data.birthDate}${data.birthTime}${data.gender}${data.topic}`);
  const topic = topicCopy[data.topic] || topicCopy["tong-quan"];
  const zodiac = profile.zodiac;
  const lifePath = profile.lifePath;
  const element = profile.element;
  const hourBranch = profile.hourBranch;
  const palace = pick(palaces, seed + lifePath);
  const energy = Math.min(99, 55 + ((seed + lifePath) % 41));
  const clarity = Math.min(99, 52 + ((seed * 3 + birthDate.getDate()) % 43));
  const luck = Math.min(99, 50 + ((seed * 7 + birthDate.getMonth()) % 45));
  const personalLine = buildQuestionAdvice(data.question || "", palace, topic.title);
  const baseReading = {
    topic,
    type: data.readingType || "tu-vi",
    zodiac,
    lifePath,
    element,
    hourBranch,
    palace,
    energy,
    clarity,
    luck,
    personalLine,
    insights: [
      zodiacAdvice[zodiac],
      numerologyAdvice[lifePath],
      elementAdvice[element],
      ...topic.lines,
    ],
    summary: `${data.fullName.trim()} gặp quẻ ${palace}, cung ${zodiac}, số chủ đạo ${lifePath}, năng lượng ${energy}/100.`,
  };

  return {
    ...baseReading,
    deep: buildDeepReading(data, baseReading, seed),
  };
}

function createTarotOnlyReading(data) {
  const baseReading = {
    topic: { title: "Tarot" },
    type: "tarot",
    zodiac: "",
    lifePath: 0,
    element: "",
    hourBranch: "",
    palace: "Tarot",
    energy: 0,
    clarity: 0,
    luck: 0,
    personalLine: "",
    summary: `Trải bài tarot 3 lá${data.question ? ` cho câu hỏi: ${data.question.trim()}` : ""}.`,
  };

  return {
    ...baseReading,
    deep: {
      tarot: [],
      deepAnswers: [],
      couple: null,
    },
  };
}

function renderReading(data, reading) {
  latestConsultText = buildConsultText(data, reading);
  if (reading.type === "tarot") {
    renderTarotReading(data, reading);
    return;
  }
  const coupleSection = reading.deep.couple
    ? `
    <section class="reading-section">
      <h3>Luận tình duyên đôi lứa</h3>
      <p>${reading.deep.couple.zodiacLine}</p>
      <div class="destiny-grid">
        <div class="destiny-item"><span>Người ấy</span><strong>${escapeHtml(reading.deep.couple.partner.name)}</strong></div>
        <div class="destiny-item"><span>Cung</span><strong>${reading.deep.couple.partner.zodiac}</strong></div>
        <div class="destiny-item"><span>Số chủ đạo</span><strong>${reading.deep.couple.partner.lifePath}</strong></div>
        <div class="destiny-item"><span>Hòa hợp</span><strong>${reading.deep.couple.harmony}/100</strong></div>
      </div>
      <p>${reading.deep.couple.advice}</p>
    </section>`
    : "";
  const deepQuestionSection = reading.deep.deepAnswers.length
    ? `
    <section class="reading-section">
      <h3>Trả lời câu hỏi chuyên sâu</h3>
      <div class="deep-list">
        ${reading.deep.deepAnswers
          .map(
            (item) =>
              `<div class="deep-answer"><strong>${escapeHtml(item.question)}</strong><span>${item.answer}</span></div>`
          )
          .join("")}
      </div>
    </section>`
    : "";
  const followUpSection = buildFollowUpSection(data, reading);
  resultCard.innerHTML = `
    <p class="eyebrow">Kết quả ${reading.topic.title}</p>
    <h2>${escapeHtml(data.fullName.trim())} gặp quẻ ${reading.palace}</h2>
    <p>${reading.personalLine}</p>
    <div class="destiny-grid">
      <div class="destiny-item"><span>Cung</span><strong>${reading.zodiac}</strong></div>
      <div class="destiny-item"><span>Số chủ đạo</span><strong>${reading.lifePath}</strong></div>
      <div class="destiny-item"><span>Ngũ hành</span><strong>${reading.element}</strong></div>
      <div class="destiny-item"><span>Giờ sinh</span><strong>${reading.hourBranch}</strong></div>
    </div>
    <div class="score-row">
      <div class="score"><span>Năng lượng</span><strong>${reading.energy}</strong></div>
      <div class="score"><span>Sáng rõ</span><strong>${reading.clarity}</strong></div>
      <div class="score"><span>May mắn</span><strong>${reading.luck}</strong></div>
    </div>
    <section class="reading-section">
      <h3>Chân dung bản mệnh</h3>
      <p>${reading.deep.overview}</p>
    </section>
    <section class="reading-section">
      <h3>Mẫu vận đang lặp lại</h3>
      <p>${reading.deep.hiddenPattern}</p>
    </section>
    <section class="reading-section">
      <h3>Vận hiện tại</h3>
      <p>${reading.deep.currentFlow}</p>
    </section>
    <section class="reading-section">
      <h3>Luận theo chủ đề</h3>
      <p>${reading.deep.topicFocus}</p>
    </section>
    ${coupleSection}
    ${deepQuestionSection}
    <section class="reading-section">
      <h3>Hướng xử lý</h3>
      <p>${reading.deep.advice}</p>
    </section>
    <section class="reading-section">
      <h3>Mốc 7 ngày tới</h3>
      <div class="timeline">
        ${reading.deep.timeline
          .map((item) => `<div class="timeline-item"><strong>${item.label}</strong><span>${item.text}</span></div>`)
          .join("")}
      </div>
    </section>
    ${followUpSection}
    <div class="consult-actions">
      <button class="primary-button" id="sendConsultMessage" type="button">Gửi thông số qua Facebook</button>
      <button class="secondary-button" id="copyConsultMessage" type="button">Copy thông số</button>
    </div>
    <div class="consult-note">
      Bước tiếp theo: bấm “Gửi thông số qua Facebook”, web sẽ copy toàn bộ lá số và mở Facebook của thầy.
      Khi Facebook mở ra, hãy dán nội dung vào khung chat hoặc bình luận rồi gửi.
    </div>
    <div class="share-preview">${escapeHtml(reading.summary)}</div>
  `;

  document.querySelector("#sendConsultMessage").addEventListener("click", sendConsultToMessenger);
  document.querySelector("#copyConsultMessage").addEventListener("click", copyConsultText);
  attachFollowUpHandlers();
}

function renderTarotReading(data, reading) {
  if (!reading.deep.tarot.length) {
    renderTarotPicker(data, reading);
    return;
  }

  const followUpSection = buildFollowUpSection(data, reading);
  resultCard.innerHTML = `
    <p class="eyebrow">Kết quả Tarot</p>
    <h2>Trải bài ${reading.deep.tarot.length} lá</h2>
    <p>${(data.question || "").trim() ? `Câu hỏi: ${escapeHtml(data.question.trim())}` : "Trải bài này đọc năng lượng hiện tại và lời khuyên hành động gần nhất."}</p>
    <section class="reading-section">
      <h3>Trải bài tarot</h3>
      <div class="tarot-spread tarot-spread-${reading.deep.tarot.length}">
        ${reading.deep.tarot
          .map(
            (card) => `
              <div class="tarot-card ${card.reversed ? "is-reversed" : ""}">
                <div class="tarot-art tarot-art-${card.visual.family}">
                  <div class="tarot-art-frame">
                    <span>${card.symbol}</span>
                    <strong>${card.visual.icon}</strong>
                    <em>${card.visual.label}</em>
                  </div>
                </div>
                <span>${card.position}</span>
                <strong>${card.vi} ${card.reversed ? "(ngược)" : "(xuôi)"}</strong>
                <p class="tarot-meaning">${card.meaning}</p>
                <p>${card.topicLine}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
    <section class="reading-section">
      <h3>Tổng luận tarot</h3>
      <p>${escapeHtml(buildTarotSummary(data, reading))}</p>
    </section>
    ${followUpSection}
    <div class="consult-actions">
      <button class="primary-button" id="sendConsultMessage" type="button">Gửi thông số qua Facebook</button>
      <button class="secondary-button" id="copyConsultMessage" type="button">Copy thông số</button>
    </div>
    <div class="consult-note">
      Nếu muốn luận sâu hơn từng lá, hãy gửi trải bài này qua Facebook để thầy đọc tiếp.
    </div>
    <div class="share-preview">${escapeHtml(reading.summary)}</div>
  `;

  document.querySelector("#sendConsultMessage").addEventListener("click", sendConsultToMessenger);
  document.querySelector("#copyConsultMessage").addEventListener("click", copyConsultText);
  attachFollowUpHandlers();
}

function renderTarotPicker(data, reading) {
  resultCard.innerHTML = `
    <p class="eyebrow">Tarot</p>
    <h2>Chọn 3 lá trong bộ 78 lá</h2>
    <p>${(data.question || "").trim() ? `Câu hỏi: ${escapeHtml(data.question.trim())}` : "Hãy giữ câu hỏi trong đầu, rồi chọn 3 lá bài."}</p>
    <section class="reading-section">
      <h3>Bộ bài 78 lá</h3>
      <p>Chọn đúng 3 lá. Lá sẽ được lật theo thứ tự: Gốc vấn đề, Hiện tại, Lời khuyên.</p>
      <div class="tarot-pick-status" id="tarotPickStatus">Đã chọn 0/3 lá</div>
      <div class="tarot-deck-grid">
        ${tarotDeck
          .map(
            (card, index) => `
              <button class="tarot-back-card" type="button" data-card-index="${index}" aria-label="Lá tarot ${index + 1}">
                <span>${index + 1}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <button class="primary-button tarot-reveal-button" id="revealTarotCards" type="button" disabled>Lật bài và luận giải</button>
    </section>
  `;

  const selected = [];
  const status = document.querySelector("#tarotPickStatus");
  const reveal = document.querySelector("#revealTarotCards");

  for (const button of document.querySelectorAll(".tarot-back-card")) {
    button.addEventListener("click", () => {
      const cardIndex = Number(button.dataset.cardIndex);
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        selected.splice(selected.indexOf(cardIndex), 1);
      } else {
        if (selected.length >= 3) {
          return;
        }
        button.classList.add("selected");
        selected.push(cardIndex);
      }

      status.textContent = `Đã chọn ${selected.length}/3 lá`;
      reveal.disabled = selected.length !== 3;
    });
  }

  reveal.addEventListener("click", () => {
    reading.deep.tarot = buildTarotSpreadFromSelection(data, selected);
    latestConsultText = buildConsultText(data, reading);
    renderTarotReading(data, reading);
  });
}

function buildFollowUpSection(data, reading) {
  const questions = getFollowUpQuestions(data, reading);
  return `
    <section class="reading-section">
      <h3>Câu hỏi nên hỏi tiếp</h3>
      <p>Khách có thể bấm một câu để copy toàn bộ thông tin và gửi qua Facebook tư vấn sâu hơn.</p>
      <div class="follow-up-grid">
        ${questions
          .map(
            (question) =>
              `<button class="follow-up-question" type="button" data-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`
          )
          .join("")}
      </div>
    </section>`;
}

function getFollowUpQuestions(data, reading) {
  if (reading.type === "tarot") {
    return [
      "Lá nào đang là điểm nghẽn lớn nhất của tôi?",
      "Nếu tôi hành động ngay bây giờ thì kết quả gần nhất là gì?",
      "Tôi nên tránh điều gì để không làm lệch năng lượng trải bài?",
      "Có dấu hiệu nào cho thấy tôi nên chờ thêm không?",
    ];
  }

  if (data.readingMode === "couple") {
    return [
      "Người ấy có thật lòng muốn đi xa với tôi không?",
      "Điểm lệch lớn nhất giữa hai đứa là gì?",
      "Tôi nên chủ động hay chờ người ấy rõ ràng hơn?",
      "Trong 7 ngày tới nên làm gì để mối quan hệ tốt hơn?",
    ];
  }

  const byTopic = {
    "tong-quan": [
      "Vấn đề chính tôi cần giải quyết trước là gì?",
      "Trong 7 ngày tới tôi nên ưu tiên việc nào?",
      "Có cơ hội nào đang đến mà tôi chưa nhìn ra không?",
      "Tôi đang lặp lại mẫu cũ nào cần dừng lại?",
    ],
    "tinh-duyen": [
      "Người tôi đang nghĩ tới có phù hợp với tôi không?",
      "Tôi nên mở lòng hay đặt ranh giới rõ hơn?",
      "Mối quan hệ này đang vướng ở điểm cảm xúc nào?",
      "Tình duyên gần tới có dấu hiệu mới không?",
    ],
    "su-nghiep": [
      "Công việc hiện tại có nên tiếp tục không?",
      "Tôi nên đổi hướng hay kiên trì thêm?",
      "Cơ hội nghề nghiệp gần nhất đến từ đâu?",
      "Tôi cần cải thiện điểm nào để được ghi nhận hơn?",
    ],
    "tai-loc": [
      "Dòng tiền của tôi đang hao ở đâu?",
      "Có cơ hội tăng thu nào gần tới không?",
      "Tôi có nên đầu tư hoặc chi tiền cho việc này không?",
      "Tôi nên tránh rủi ro tài chính nào trong tháng này?",
    ],
  };

  return byTopic[data.topic] || byTopic["tong-quan"];
}

function attachFollowUpHandlers() {
  for (const button of document.querySelectorAll(".follow-up-question")) {
    button.addEventListener("click", async () => {
      const question = button.dataset.question;
      const text = `${latestConsultText}\n\nCâu hỏi muốn hỏi thêm:\n${question}`;
      try {
        await navigator.clipboard.writeText(text);
        alert("Đã copy câu hỏi hỏi thêm. Khi Facebook mở ra, hãy dán vào khung chat và gửi.");
      } catch (error) {
        window.prompt("Copy nội dung này rồi dán vào Facebook:", text);
      }
      window.open(CUSTOMER_CONTACT_URL, "facebook-follow-up");
    });
  }
}

function buildTarotSummary(data, reading) {
  const [root, current, advice] = reading.deep.tarot;
  const reversedCount = reading.deep.tarot.filter((card) => card.reversed).length;
  const question = (data.question || "").trim();
  const opening = question
    ? `Với câu hỏi "${question}", ba lá đang kể một mạch khá rõ:`
    : "Ba lá đang kể một mạch khá rõ:";
  const tempo = reversedCount >= 2
    ? "Có nhiều lá ngược nên trọng tâm không phải là ép kết quả ngay, mà là tháo nút nghẽn trước khi đi tiếp."
    : reversedCount === 1
      ? "Chỉ có một lá ngược, nghĩa là tình huống vẫn có cửa mở nhưng còn một điểm lệch cần chỉnh."
      : "Cả ba lá đều xuôi, năng lượng tương đối thuận nếu bạn hành động rõ và không đổi ý liên tục.";
  const topicFocus = data.readingMode === "couple"
    ? "Nếu hỏi về một người, hãy đo bằng sự nhất quán, tốc độ phản hồi và khả năng sửa sai sau va chạm."
    : "Cách đi đúng là chọn một việc nhỏ nhưng có thể kiểm chứng, làm xong rồi mới đọc tiếp tín hiệu.";

  return `${opening} ${root.position} là ${root.vi}, chỉ ra nền của chuyện này nằm ở ${root.meaning}. ${current.position} là ${current.vi}, cho thấy hiện tại đang chịu ảnh hưởng bởi ${current.meaning}. ${advice.position} là ${advice.vi}, nên lời khuyên không phải chờ may mắn mà là ${advice.meaning}. ${tempo} ${topicFocus}`;
}

function buildConsultText(data, reading) {
  const question = (data.question || "").trim() || "Chưa nhập câu hỏi riêng";
  const deepQuestions = [data.deepQuestion1, data.deepQuestion2, data.deepQuestion3]
    .map((item) => (item || "").trim())
    .filter(Boolean);
  const partnerLines = reading.deep.couple
    ? [
        "",
        "Thông tin người yêu:",
        `Tên: ${reading.deep.couple.partner.name}`,
        `Ngày sinh: ${data.partnerBirthDate}`,
        `Giờ sinh: ${data.partnerBirthTime || "Chưa rõ"}`,
        `Cung: ${reading.deep.couple.partner.zodiac}`,
        `Số chủ đạo: ${reading.deep.couple.partner.lifePath}`,
        `Điểm hòa hợp: ${reading.deep.couple.harmony}/100`,
      ]
    : [];
  return [
    "Em muốn tư vấn theo lá số này:",
    "",
    `Kiểu xem: ${data.readingType === "tarot" ? "Tarot" : "Tử vi"}`,
    `Phạm vi: ${data.readingMode === "couple" ? "Mình và người yêu" : "Bản thân"}`,
    data.readingType === "tarot" ? "" : `Họ tên: ${data.fullName.trim()}`,
    data.readingType === "tarot" ? "" : `Ngày sinh: ${data.birthDate}`,
    data.readingType === "tarot" ? "" : `Giờ sinh: ${data.birthTime || "Chưa rõ"}`,
    data.readingType === "tarot" ? "" : `Giới tính: ${data.gender}`,
    `Chủ đề: ${reading.topic.title}`,
    `Câu hỏi: ${question}`,
    ...deepQuestions.map((item, index) => `Câu hỏi chuyên sâu ${index + 1}: ${item}`),
    ...partnerLines,
    "",
    reading.type === "tu-vi" ? `Quẻ: ${reading.palace}` : "",
    reading.type === "tu-vi" ? `Cung hoàng đạo: ${reading.zodiac}` : "",
    reading.type === "tu-vi" ? `Số chủ đạo: ${reading.lifePath}` : "",
    reading.type === "tu-vi" ? `Ngũ hành: ${reading.element}` : "",
    reading.type === "tu-vi" ? `Giờ sinh luận: ${reading.hourBranch}` : "",
    reading.type === "tu-vi" ? `Năng lượng: ${reading.energy}/100` : "",
    reading.type === "tu-vi" ? `Sáng rõ: ${reading.clarity}/100` : "",
    reading.type === "tu-vi" ? `May mắn: ${reading.luck}/100` : "",
    "",
    "Tóm tắt luận giải:",
    reading.type === "tu-vi" ? reading.deep.currentFlow : buildTarotSummary(data, reading),
    reading.type === "tu-vi" ? reading.deep.topicFocus : "",
    reading.type === "tarot" ? "Tarot:" : "",
    ...reading.deep.tarot.map((card) => `${card.position}: ${card.vi} ${card.reversed ? "(ngược)" : "(xuôi)"} - ${card.meaning}`),
    reading.deep.couple ? reading.deep.couple.summary : "",
  ].filter(Boolean).join("\n");
}

async function copyConsultText() {
  if (!latestConsultText) {
    alert("Bạn hãy xem kết quả trước, sau đó mới gửi thông số tư vấn.");
    return false;
  }

  try {
    await navigator.clipboard.writeText(latestConsultText);
    alert("Đã copy thông số. Khi Facebook mở ra, hãy dán vào khung chat hoặc bình luận và gửi.");
    return true;
  } catch (error) {
    window.prompt("Copy thông số này rồi dán vào Facebook:", latestConsultText);
    return false;
  }
}

async function sendConsultToMessenger() {
  await copyConsultText();
  window.open(CUSTOMER_CONTACT_URL, "facebook-consult");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const quote = encodeURIComponent(latestShareText);

  if (window.FB && FACEBOOK_APP_ID !== "YOUR_FACEBOOK_APP_ID") {
    window.FB.ui({ method: "share", href: window.location.href, quote });
    return;
  }

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
    "facebook-share",
    "width=640,height=520"
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const reading = createReading(data);
  latestShareText = reading.summary;
  renderReading(data, reading);
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

shareTop.addEventListener("click", shareOnFacebook);
shareResult.addEventListener("click", shareOnFacebook);

facebookLogin.addEventListener("click", () => {
  window.open(CUSTOMER_CONTACT_URL, "facebook-profile");
});
