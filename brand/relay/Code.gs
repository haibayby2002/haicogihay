/**
 * Hải Có Gì Hay? — contact form → email relay (Google Apps Script)
 * ---------------------------------------------------------------------------
 * The landing page is static and can't send mail itself, so the "Gửi yêu cầu"
 * button POSTs the request here. This forwards it to NOTIFY_EMAIL and returns
 * { ok: true } so the page shows the success badge.
 *
 * DEPLOY (about 2 minutes)
 *  1. https://script.google.com  →  New project  →  paste this file  →  Save.
 *  2. Function dropdown → `sendTest` → Run → "Review permissions" → Allow.
 *     A test mail should arrive at NOTIFY_EMAIL.
 *  3. Deploy → New deployment → type: Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *     → Deploy → copy the Web app URL ( .../exec ).
 *  4. Put that URL in  brand/config.json → contact.submitEndpoint,
 *     then run  python build.py
 *
 * Change the destination address in NOTIFY_EMAIL below, or set a Script
 * Property named NOTIFY_EMAIL (Project Settings → Script properties).
 */

var NOTIFY_EMAIL =
  PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL") ||
  "nguyenquyhai2002@gmail.com";

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!d.name || !d.email || !d.phone) {
      return json_({ ok: false, error: "missing name / email / phone" });
    }
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Yêu cầu mới từ website — " + d.name,
      body: d.text || plain_(d),
      replyTo: d.email,
      name: "Hải Có Gì Hay? website",
    });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: "haicogihay contact -> email" });
}

function plain_(d) {
  return [
    "Yêu cầu mới từ website Hải Có Gì Hay?",
    "",
    "• Họ tên: " + (d.name || "-"),
    "• Điện thoại: " + (d.phone || "-"),
    "• Email: " + (d.email || "-"),
    "• Nội dung: " + (d.message || "-"),
    d.package ? "\nGói: " + d.package : "",
  ].join("\n");
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function sendTest() {
  var out = doPost({
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        phone: "0700000000",
        email: "test@example.com",
        message: "Tin nhắn thử.",
        text: "Đây là email thử từ sendTest().",
      }),
    },
  });
  Logger.log(out.getContent());
}
