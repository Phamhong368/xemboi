# Xem Bói An Nhiên

Web xem bói giải trí tích hợp Facebook bằng HTML, CSS và JavaScript thuần.

## Chạy thử

Mở trực tiếp file `index.html` trong trình duyệt, hoặc chạy server tĩnh:

```bash
python3 -m http.server 8080
```

Sau đó mở `http://localhost:8080`.

## Cấu hình Facebook

Sửa các biến đầu file `script.js`:

```js
const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";
const FACEBOOK_PAGE_ID = "61563211834277";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61563211834277&locale=vi_VN";
const FACEBOOK_PROFILE_URL = "https://www.facebook.com/profile.php?id=100057491366920";
const CUSTOMER_CONTACT_URL = FACEBOOK_PAGE_URL;
const BUSINESS_INBOX_URL = "https://business.facebook.com/latest/inbox/all?asset_id=61563211834277";
```

Với cách không mua miền, web chỉ là công cụ tạo lá số. Khách bấm “Gửi thông số qua Facebook”, web copy toàn bộ dữ liệu, mở Facebook của bạn, rồi khách dán nội dung để bạn tư vấn.

## Tính năng

- Form lấy lá số theo họ tên, ngày sinh, giờ sinh và chủ đề.
- Kết quả xem bói sinh trên client, không cần backend.
- Luận đoán gồm cung hoàng đạo, số chủ đạo, ngũ hành theo mùa sinh, giờ sinh và quẻ tổng hợp.
- Nút “Gửi thông số qua Facebook” copy toàn bộ thông tin lá số để khách dán vào cuộc trò chuyện, giúp bạn thấy đủ dữ liệu khi tư vấn.
- Nút chia sẻ Facebook hoạt động ngay cả khi chưa có App ID.
- Nút mở Facebook tư vấn luôn hiển thị ở góc màn hình để khách dễ bấm.
- Nút “Mở hộp thư tư vấn” cho chủ web vào nhanh Meta Business Suite Inbox.
- Không cần mua miền, không cần Facebook App cho luồng tư vấn chính.

## Nếu muốn khách chỉ xem trong Facebook

Dùng bot Messenger trong `bot-server.mjs`. Khách không cần vào web, chỉ nhắn Page trong Facebook. Bot sẽ hỏi họ tên, ngày sinh, giờ sinh, chủ đề và trả lá số ngay trong Messenger.

Chạy thử server bot:

```bash
npm start
```

Cấu hình cần có khi kết nối Meta:

```bash
META_VERIFY_TOKEN=xemboi_verify_token
META_PAGE_ACCESS_TOKEN=page_access_token_cua_ban
PAYMENT_CODE=MMVT2026
PAYMENT_AMOUNT=50.000đ
PAYMENT_INFO=Chuyển khoản theo thông tin của Page Mật Mã Vũ Trụ. Sau khi chuyển, nhắn mã xác nhận để mở lá số.
```

Bot mặc định yêu cầu khách thanh toán trước. Sau khi bạn xác nhận đã nhận tiền, gửi mã `PAYMENT_CODE` cho khách trong Meta Inbox. Khách nhắn đúng mã thì bot mới bắt đầu hỏi thông tin và trả lá số.

Webhook URL trên Meta sẽ là:

```text
https://link-hosting-mien-phi-cua-ban/webhook
```

Không cần mua tên miền riêng, nhưng Messenger Platform vẫn cần một URL HTTPS công khai để Meta gửi tin nhắn về bot.
