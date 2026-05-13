import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 3000);
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "xemboi_verify_token";
const PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN || "";
const PAYMENT_CODE = (process.env.PAYMENT_CODE || "MMVT2026").trim().toLowerCase();
const PAYMENT_AMOUNT = process.env.PAYMENT_AMOUNT || "50.000đ";
const PAYMENT_INFO =
  process.env.PAYMENT_INFO ||
  "Chuyển khoản theo thông tin của Page Mật Mã Vũ Trụ. Sau khi chuyển, nhắn mã xác nhận để mở lá số.";

const sessions = new Map();

const topicLabels = {
  "1": "tong-quan",
  "2": "tinh-duyen",
  "3": "su-nghiep",
  "4": "tai-loc",
  "tong quan": "tong-quan",
  "tổng quan": "tong-quan",
  "tinh duyen": "tinh-duyen",
  "tình duyên": "tinh-duyen",
  "su nghiep": "su-nghiep",
  "sự nghiệp": "su-nghiep",
  "tai loc": "tai-loc",
  "tài lộc": "tai-loc",
};

const topicCopy = {
  "tong-quan": {
    title: "Tổng quan",
    focus:
      "Lá số nhấn vào việc phân biệt việc thật sự tạo kết quả với việc chỉ làm bạn bận. Ba ngày tới nên dọn một điểm nghẽn cũ trước khi mở kế hoạch mới.",
  },
  "tinh-duyen": {
    title: "Tình duyên",
    focus:
      "Trọng tâm không phải ai đúng ai sai mà là cảm giác an toàn khi nói thật. Hãy quan sát cách đối phương phản hồi khi bạn nói nhu cầu thật của mình.",
  },
  "su-nghiep": {
    title: "Sự nghiệp",
    focus:
      "Bạn đang ở đoạn cần chứng minh bằng kết quả cụ thể. Đừng ôm hình ảnh phải giỏi mọi thứ; hãy chọn một mảng tạo dấu ấn rõ nhất.",
  },
  "tai-loc": {
    title: "Tài lộc",
    focus:
      "Lá số không báo vận tiền kiểu may rủi, mà báo vận chỉnh lại cách giữ tiền. Cơ hội tăng thu nằm ở việc biến kỹ năng thành đề nghị rõ ràng.",
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

const elementsByMonth = ["Thủy", "Mộc", "Mộc", "Thổ", "Hỏa", "Hỏa", "Thổ", "Kim", "Kim", "Thổ", "Thủy", "Thủy"];

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
  "Bạch Dương": "Bạn có khí mở đường mạnh, hợp chủ động nhưng cần tránh nóng vội.",
  "Kim Ngưu": "Bạn có nền khí bền và thực tế, vận tốt đến qua tích lũy đều.",
  "Song Tử": "Bạn bắt tín hiệu nhanh, nhưng cần chọn một hướng chính để không phân tán.",
  "Cự Giải": "Trực giác tốt, nhưng cần phân biệt cảm nhận thật với nỗi lo tự tạo.",
  "Sư Tử": "Khí chất dẫn dắt mạnh, càng nâng người khác lên thì quý nhân càng dễ mở.",
  "Xử Nữ": "Mạnh ở phân tích và sửa lỗi, nhưng đừng để cầu toàn làm chậm quyết định.",
  "Thiên Bình": "Có duyên hòa giải, nhưng đừng vì giữ hòa khí mà né một lời nói thật.",
  "Bọ Cạp": "Nội lực sâu, hợp nhìn tận gốc và cắt bỏ điều làm hao năng lượng.",
  "Nhân Mã": "Tầm nhìn rộng, vận tốt khi tự do đi cùng kỷ luật.",
  "Ma Kết": "Ý chí vững, hợp đường dài nhưng nên học cách nhận hỗ trợ.",
  "Bảo Bình": "Tư duy khác biệt, cần nối ý tưởng với hành động cụ thể.",
  "Song Ngư": "Cảm nhận tinh tế, lòng tốt thành sức mạnh khi có ranh giới rõ.",
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
  if (!timeText || timeText === "không rõ") {
    return "Giờ sinh chưa rõ";
  }

  const hour = Number(timeText.split(":")[0]);
  const branches = ["Tý", "Sửu", "Sửu", "Dần", "Dần", "Mão", "Mão", "Thìn", "Thìn", "Tỵ", "Tỵ", "Ngọ", "Ngọ", "Mùi", "Mùi", "Thân", "Thân", "Dậu", "Dậu", "Tuất", "Tuất", "Hợi", "Hợi", "Tý"];
  return `Giờ ${branches[hour] || "chưa rõ"}`;
}

function normalizeDate(value) {
  const match = value.trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!match) {
    return "";
  }

  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function normalizeTime(value) {
  const clean = value.trim().toLowerCase();
  if (["không rõ", "khong ro", "không biết", "khong biet"].includes(clean)) {
    return "không rõ";
  }

  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!match) {
    return "";
  }

  const hour = Number(match[1]);
  const minute = Number(match[2] || "0");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return "";
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function createReading(data) {
  const birthDate = new Date(`${data.birthDate}T12:00:00`);
  const seed = hashText(`${data.fullName}${data.birthDate}${data.birthTime}${data.topic}${data.question}`);
  const topic = topicCopy[data.topic] || topicCopy["tong-quan"];
  const zodiac = getZodiac(birthDate);
  const lifePath = getLifePath(data.birthDate);
  const element = elementsByMonth[birthDate.getMonth()];
  const hourBranch = getHourBranch(data.birthTime);
  const palace = pick(palaces, seed + lifePath);
  const energy = Math.min(99, 55 + ((seed + lifePath) % 41));
  const clarity = Math.min(99, 52 + ((seed * 3 + birthDate.getDate()) % 43));
  const luck = Math.min(99, 50 + ((seed * 7 + birthDate.getMonth()) % 45));
  const tension =
    clarity > luck
      ? "Bạn đang nhìn vấn đề khá rõ, nhưng vận may chưa mở hẳn. Càng chuẩn bị kỹ, kết quả càng đổi."
      : "May mắn đang nhỉnh hơn độ sáng rõ. Có cơ hội xuất hiện bất ngờ, nhưng cần đặt tiêu chí trước khi chọn.";

  return [
    `Lá số của ${data.fullName}`,
    "",
    `Quẻ: ${palace}`,
    `Cung: ${zodiac}`,
    `Số chủ đạo: ${lifePath}`,
    `Ngũ hành: ${element}`,
    `Giờ sinh: ${hourBranch}`,
    `Chủ đề: ${topic.title}`,
    "",
    `Điểm năng lượng: ${energy}/100`,
    `Độ sáng rõ: ${clarity}/100`,
    `May mắn: ${luck}/100`,
    "",
    `Chân dung: ${zodiacAdvice[zodiac]} ${numerologyAdvice[lifePath]}`,
    `Mẫu vận: Quẻ ${palace} nghiêng về bài học nhịp độ. ${elementAdvice[element]}`,
    `Vận hiện tại: ${tension}`,
    `Luận ${topic.title.toLowerCase()}: ${topic.focus}`,
    data.question
      ? `Câu hỏi riêng: "${data.question}". Hướng xử lý là tách ra điều đã chắc, điều đang sợ và một hành động nhỏ có thể kiểm chứng trong hôm nay.`
      : "Hướng xử lý: chọn một việc nhỏ nhưng thật sự tạo kết quả, làm xong trước khi mở thêm việc mới.",
    "",
    "Nếu muốn luận sâu hơn, hãy nhắn thêm bối cảnh hiện tại để thầy xem tiếp.",
  ].join("\n");
}

function nextPrompt(session) {
  switch (session.step) {
    case "payment":
      return [
        "Để xem lá số, bạn vui lòng thanh toán trước.",
        "",
        `Phí xem: ${PAYMENT_AMOUNT}`,
        PAYMENT_INFO,
        "",
        "Sau khi thanh toán, hãy nhắn mã xác nhận mà Page cung cấp.",
        "Nếu đã có mã, hãy gửi mã ngay tại đây.",
      ].join("\n");
    case "name":
      return "Chào bạn. Để xem lá số, hãy gửi họ tên của bạn.";
    case "birthDate":
      return "Gửi ngày sinh theo dạng ngày/tháng/năm. Ví dụ: 25/01/1998.";
    case "birthTime":
      return "Gửi giờ sinh theo dạng 14:30. Nếu không rõ, nhắn: không rõ.";
    case "topic":
      return "Bạn muốn xem chủ đề nào?\n1. Tổng quan\n2. Tình duyên\n3. Sự nghiệp\n4. Tài lộc";
    case "question":
      return "Bạn có câu hỏi riêng không? Nếu không có, nhắn: không.";
    default:
      return "Nhắn 'xem bói' để bắt đầu lại.";
  }
}

function handleBotMessage(senderId, text) {
  const lower = text.trim().toLowerCase();
  let session = sessions.get(senderId);

  if (!session || ["xem bói", "xem boi", "bắt đầu", "bat dau", "start", "reset"].includes(lower)) {
    session = { step: "payment", data: {} };
    sessions.set(senderId, session);
    return nextPrompt(session);
  }

  if (session.step === "payment") {
    if (lower !== PAYMENT_CODE) {
      return [
        "Mã xác nhận chưa đúng.",
        "",
        `Phí xem: ${PAYMENT_AMOUNT}`,
        PAYMENT_INFO,
        "",
        "Sau khi thanh toán, hãy nhắn đúng mã xác nhận để bắt đầu xem lá số.",
      ].join("\n");
    }

    session.step = "name";
    return "Đã xác nhận thanh toán. Bây giờ hãy gửi họ tên của bạn.";
  }

  if (session.step === "name") {
    session.data.fullName = text.trim();
    session.step = "birthDate";
    return nextPrompt(session);
  }

  if (session.step === "birthDate") {
    const birthDate = normalizeDate(text);
    if (!birthDate) {
      return "Ngày sinh chưa đúng định dạng. Hãy gửi dạng ngày/tháng/năm, ví dụ: 25/01/1998.";
    }
    session.data.birthDate = birthDate;
    session.step = "birthTime";
    return nextPrompt(session);
  }

  if (session.step === "birthTime") {
    const birthTime = normalizeTime(text);
    if (!birthTime) {
      return "Giờ sinh chưa đúng. Hãy gửi dạng 14:30, hoặc nhắn: không rõ.";
    }
    session.data.birthTime = birthTime;
    session.step = "topic";
    return nextPrompt(session);
  }

  if (session.step === "topic") {
    const topic = topicLabels[lower];
    if (!topic) {
      return nextPrompt(session);
    }
    session.data.topic = topic;
    session.step = "question";
    return nextPrompt(session);
  }

  if (session.step === "question") {
    session.data.question = ["không", "khong", "không có", "khong co"].includes(lower) ? "" : text.trim();
    const reading = createReading(session.data);
    sessions.delete(senderId);
    return reading;
  }

  return nextPrompt(session);
}

async function sendMessengerText(recipientId, text) {
  if (!PAGE_ACCESS_TOKEN) {
    console.log("Missing META_PAGE_ACCESS_TOKEN. Reply would be:\n", text);
    return;
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      messaging_type: "RESPONSE",
      message: { text },
    }),
  });

  if (!response.ok) {
    console.error("Messenger send failed:", response.status, await response.text());
    return;
  }

  console.log("Messenger reply sent:", response.status, text.slice(0, 80));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Xem Bói Facebook Messenger Bot đang chạy.");
    return;
  }

  if (request.method === "GET" && url.pathname === "/webhook") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified successfully.");
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(challenge);
      return;
    }

    console.warn("Webhook verification failed:", { mode, token });
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (request.method === "POST" && url.pathname === "/webhook") {
    try {
      const body = await readJson(request);
      const entries = body.entry || [];

      for (const entry of entries) {
        for (const event of entry.messaging || []) {
          const senderId = event.sender?.id;
          const text = event.message?.text;

          if (senderId && text) {
            console.log("Incoming message:", { senderId, text });
            const reply = handleBotMessage(senderId, text);
            await sendMessengerText(senderId, reply);
          } else {
            console.log("Ignored webhook event:", JSON.stringify(event).slice(0, 500));
          }
        }
      }

      response.writeHead(200);
      response.end("EVENT_RECEIVED");
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end("Server error");
    }
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});
