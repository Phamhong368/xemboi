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
const tarotCountField = document.querySelector("#tarotCountField");
const tarotCount = document.querySelector("#tarotCount");
const readingMode = document.querySelector("#readingMode");
const partnerFields = document.querySelector("#partnerFields");
const topicSelect = document.querySelector("#topicSelect");
const questionHint = document.querySelector("#questionHint");
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
  tarotCountField.hidden = !isTarot;
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

const tarotDeck = [
  { name: "The Fool", vi: "Kẻ Khờ", symbol: "0", upright: "khởi đầu mới, niềm tin và sự tự do", reversed: "vội vàng, thiếu chuẩn bị hoặc né trách nhiệm" },
  { name: "The Magician", vi: "Nhà Ảo Thuật", symbol: "I", upright: "năng lực biến ý tưởng thành hành động", reversed: "tiềm năng chưa được dùng đúng cách" },
  { name: "The High Priestess", vi: "Nữ Tư Tế", symbol: "II", upright: "trực giác, bí mật và điều chưa nói ra", reversed: "nhiễu cảm xúc, khó nghe tiếng lòng thật" },
  { name: "The Empress", vi: "Hoàng Hậu", symbol: "III", upright: "nuôi dưỡng, phát triển và sức hút tự nhiên", reversed: "cho đi quá mức hoặc thiếu chăm sóc bản thân" },
  { name: "The Emperor", vi: "Hoàng Đế", symbol: "IV", upright: "trật tự, ranh giới và quyết định rõ", reversed: "kiểm soát cứng hoặc thiếu nền tảng" },
  { name: "The Lovers", vi: "Nhân Tình", symbol: "VI", upright: "lựa chọn từ trái tim và sự hòa hợp", reversed: "lệch giá trị, thiếu cam kết hoặc phân vân" },
  { name: "The Chariot", vi: "Cỗ Xe", symbol: "VII", upright: "tiến lên, ý chí và kiểm soát hướng đi", reversed: "giằng co, mất hướng hoặc nóng vội" },
  { name: "Strength", vi: "Sức Mạnh", symbol: "VIII", upright: "kiên nhẫn, mềm mà vững và nội lực", reversed: "mệt mỏi, tự nghi ngờ hoặc phản ứng quá mạnh" },
  { name: "The Hermit", vi: "Ẩn Sĩ", symbol: "IX", upright: "chiêm nghiệm, tìm câu trả lời bên trong", reversed: "cô lập hoặc suy nghĩ quá lâu" },
  { name: "Wheel of Fortune", vi: "Bánh Xe Số Phận", symbol: "X", upright: "chu kỳ mới, cơ hội và bước ngoặt", reversed: "kẹt vòng lặp cũ hoặc chống lại thay đổi" },
  { name: "Justice", vi: "Công Lý", symbol: "XI", upright: "sự thật, cân bằng và nhân quả", reversed: "thiếu công bằng hoặc chưa dám đối diện sự thật" },
  { name: "The Star", vi: "Ngôi Sao", symbol: "XVII", upright: "hy vọng, chữa lành và định hướng sáng", reversed: "mất niềm tin hoặc cần hồi phục thêm" },
];

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
    tarot: buildTarotSpread(data, reading, seed),
  };
}

function buildTarotSpread(data, reading, seed) {
  const count = Number(data.tarotCount || 3);
  const positionSets = {
    1: ["Thông điệp chính"],
    3:
      data.readingMode === "couple"
        ? ["Năng lượng của bạn", "Năng lượng người ấy", "Hướng đi của mối quan hệ"]
        : ["Gốc vấn đề", "Hiện tại", "Lời khuyên"],
    5: ["Gốc vấn đề", "Điều đang hỗ trợ", "Điều đang cản trở", "Việc nên làm", "Kết quả gần"],
    7: ["Hiện trạng", "Điều ẩn dưới bề mặt", "Bài học cũ", "Nỗi sợ", "Cơ hội", "Hành động nên làm", "Thông điệp cuối"],
  };
  const positions = positionSets[count] || positionSets[3];
  const used = new Set();

  return positions.map((position, index) => {
    let cardIndex = Math.abs(seed + reading.lifePath * (index + 2) + index * 7) % tarotDeck.length;
    while (used.has(cardIndex)) {
      cardIndex = (cardIndex + 1) % tarotDeck.length;
    }
    used.add(cardIndex);

    const card = tarotDeck[cardIndex];
    const reversed = (seed + index + reading.luck) % 4 === 0;
    const meaning = reversed ? card.reversed : card.upright;
    const topicLine = getTarotTopicLine(data, reading, card, reversed, index);

    return {
      ...card,
      position,
      reversed,
      meaning,
      topicLine,
    };
  });
}

function getTarotTopicLine(data, reading, card, reversed, index) {
  if (data.readingMode === "couple") {
    const lines = [
      "Lá này cho thấy cách bạn đang bước vào mối quan hệ: phần muốn gần hơn và phần vẫn cần được an toàn.",
      "Lá này phản ánh điều người ấy có thể đang mang trong lòng, không nên chỉ nhìn qua lời nói bên ngoài.",
      "Lời nhắn là hãy để hành động đều đặn trả lời cho cảm xúc, thay vì ép một cam kết quá nhanh.",
    ];
    return lines[index];
  }

  const topicLines = {
    "tong-quan": "Lá này nhắc bạn chọn một việc trọng tâm, vì vận hiện tại mở qua sự rõ ràng chứ không qua ôm đồm.",
    "tinh-duyen": "Trong tình cảm, lá này khuyên nhìn vào mức độ an toàn và sự nhất quán hơn là cảm xúc nhất thời.",
    "su-nghiep": "Trong công việc, lá này chỉ ra việc cần biến năng lực thành kết quả cụ thể, có người nhìn thấy được.",
    "tai-loc": "Trong tài lộc, lá này nhắc kiểm tra dòng tiền và tránh quyết định vì cảm xúc hoặc sĩ diện.",
  };

  return `${topicLines[data.topic] || topicLines["tong-quan"]} ${reversed ? "Vì lá ở thế ngược, hãy chậm lại để sửa nền trước khi tiến." : "Vì lá ở thế xuôi, có thể chủ động bước tiếp nhưng cần giữ nhịp ổn định."}`;
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
}

function renderTarotReading(data, reading) {
  resultCard.innerHTML = `
    <p class="eyebrow">Kết quả Tarot</p>
    <h2>Trải bài ${reading.deep.tarot.length} lá cho ${escapeHtml(data.fullName.trim())}</h2>
    <p>${(data.question || "").trim() ? `Câu hỏi: ${escapeHtml(data.question.trim())}` : "Trải bài này đọc năng lượng hiện tại và lời khuyên hành động gần nhất."}</p>
    <section class="reading-section">
      <h3>Trải bài tarot</h3>
      <div class="tarot-spread tarot-spread-${reading.deep.tarot.length}">
        ${reading.deep.tarot
          .map(
            (card) => `
              <div class="tarot-card">
                <div class="tarot-symbol">${card.symbol}</div>
                <span>${card.position}</span>
                <strong>${card.vi} ${card.reversed ? "(ngược)" : "(xuôi)"}</strong>
                <p>${card.meaning}. ${card.topicLine}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
    <section class="reading-section">
      <h3>Tổng luận tarot</h3>
      <p>${buildTarotSummary(data, reading)}</p>
    </section>
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
}

function buildTarotSummary(data, reading) {
  const reversedCount = reading.deep.tarot.filter((card) => card.reversed).length;
  const tempo = reversedCount > reading.deep.tarot.length / 2
    ? "Trải bài có nhiều lá ngược, nên năng lượng hiện tại chưa thuận để ép kết quả. Việc đúng hơn là sửa điểm nghẽn trước."
    : "Trải bài có nhiều lá xuôi, cho thấy tình huống có thể tiến triển nếu bạn hành động rõ ràng và đúng nhịp.";
  const focus = data.readingMode === "couple"
    ? "Trong chuyện tình cảm, hãy nhìn vào sự nhất quán và khả năng cùng sửa sai sau va chạm."
    : "Điểm quan trọng là chọn một hành động cụ thể, không chỉ chờ thêm dấu hiệu.";

  return `${tempo} ${focus}`;
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
    `Họ tên: ${data.fullName.trim()}`,
    `Ngày sinh: ${data.birthDate}`,
    `Giờ sinh: ${data.birthTime || "Chưa rõ"}`,
    `Giới tính: ${data.gender}`,
    `Chủ đề: ${reading.topic.title}`,
    `Câu hỏi: ${question}`,
    ...deepQuestions.map((item, index) => `Câu hỏi chuyên sâu ${index + 1}: ${item}`),
    ...partnerLines,
    "",
    `Quẻ: ${reading.palace}`,
    `Cung hoàng đạo: ${reading.zodiac}`,
    `Số chủ đạo: ${reading.lifePath}`,
    `Ngũ hành: ${reading.element}`,
    `Giờ sinh luận: ${reading.hourBranch}`,
    `Năng lượng: ${reading.energy}/100`,
    `Sáng rõ: ${reading.clarity}/100`,
    `May mắn: ${reading.luck}/100`,
    "",
    "Tóm tắt luận giải:",
    reading.type === "tu-vi" ? reading.deep.currentFlow : buildTarotSummary(data, reading),
    reading.type === "tu-vi" ? reading.deep.topicFocus : "",
    reading.type === "tarot" ? "Tarot:" : "",
    ...reading.deep.tarot.map((card) => `${card.position}: ${card.vi} ${card.reversed ? "(ngược)" : "(xuôi)"} - ${card.meaning}`),
    reading.deep.couple ? reading.deep.couple.summary : "",
  ].join("\n");
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
