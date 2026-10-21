---
title: Ghi gì vào Context?
author: Quý Hải Ng
category: Công nghệ
status: done
---

# Ghi gì vào Context?

Bạn muốn 1 Prompt của bạn khi được gửi cho agents có thể giải quyết toàn bộ vấn đề không cần biết vấn đề dù khó hay phức tạp đến mức nào? Và để làm được điều đó, context chắc chắn đã phải được chuẩn bị từ trước. Lúc này anh em sẽ quan tâm tới việc làm sao để hoàn thành context? Nên lựa chọn context theo mẫu hay tự viết context từ đầu? Context của bản thân sẽ tiết kiệm được bao nhiêu prompt, bao nhiêu token? Và cuối cùng, bản thân anh em sẽ phải sửa context bao nhiêu lần, sửa ra sao?

## Xác định mục tiêu trước khi chọn context template

AI bây giờ có thể làm hầu hết các sản phẩm, dịch vụ dạng số như văn bản, hình ảnh, âm thanh, mã nguồn và thậm chí là các chuỗi lệnh để tương tác với các phần mềm khác nhau. Vì vậy, trước khi quyết định đến context, hãy xác định bản thân muốn gì (hay muốn những gì). Hay nói cụ thể hơn, bản thân muốn đạt được kết quả hay đầu ra gì từ agent? Dưới đây là một số nhu cầu phổ biến khi cần dùng đến agents:

- Dự án phần mềm
- Nội dung được tạo ra trong tháng hoặc quý tới
- Kế hoạch, chiến dịch, lộ trình, đánh giá hoàn thiện qua từng giai đoạn
- Bản báo cáo, soạn email, tin nhắn
- Khai báo doanh nghiệp, thông tin về các sản phẩm / dịch vụ
- RnD, paper

Anh em có để ý gì không, có những cái thậm chí chẳng cần tới context vì mọi người đều có thể prompt và prompt tiếp cho tới khi hoàn tất. Nghĩa là chỉ cần dựa vào câu trả lời rồi thay tên đổi họ xíu là xong. Chẳng hạn như trong một số trường hợp viết email hay tin nhắn, bạn chỉ cần prompt ngắn gọn 1-2 dòng về mục đích, gửi tới ai, còn lại chỉ cần thay tên của mình và ngày tháng vào là được. 

Nhưng ngược lại sẽ có những cái cần rất nhiều context để agent có thể thực thi chính xác - chẳng hạn như một tấm hình hoặc là một phần mềm. Anh em sẽ không muốn phần mềm chính thức ra cái giao diện mà không thiện cảm hoặc không kết nối cảm xúc với người dùng cho lắm. Và anh em cũng không muốn xuất hiện những trường thông tin lạ, những flow lạ hoặc mô tả "máy móc tới mắc cười" do chính mình tạo ra. Chính vì thế, anh em sẽ cần những context nhất định để "nắn" không cho agent tạo ra sản phẩm quá khác những gì anh em mong muốn từ đầu.

## Viết gì vào context

Khi đã xác định được mục tiêu rồi thì anh em sẽ hình dung ra được mình có cần đến context hay không? Cần những loại context nào?

**Những gì có thể bỏ vào context?**

`mục tiêu` `tác vụ` `checklist` `kpi/metrics` `giới thiệu` `logs` `bmc` `canvas` `mục đích` `vấn đề` `giải pháp` `hướng tiếp cận` `hình dung kết quả đầu ra` `quy trình` `nguồn tài liệu` 

Bên trên là những gì có thể bỏ vào context. Tất nhiên là sẽ không ai bỏ hết toàn bộ vào mà sẽ tùy thuộc vào công việc hoặc sản phẩm mà bản thân đang thực hiện. Hoặc cũng có thể là tùy vào giai đoạn thực hiện. Với một tấm hình, một video, anh em cần kết quả đầu ra để làm context. Với một bảng báo cáo, anh em cần kpi / metrics để có số liệu. Với việc nhờ AI làm một slides gọi vốn, anh em nên có context dạng BMC hoặc Lean Canvas. Với mã nguồn phần mềm thì có thể phức tạp hơn: cần xác định rõ vấn đề và giải pháp, cần quy trình, cần checklist, cần cả hình dung về giao diện... và rất có thể với phần mềm phức tạp sẽ cần nhiều hơn 1 prompt. 

**Có nên dùng AI để hỗ trợ viết context hay không?** 

Có, nhưng hãy đảm bảo là bản thân đã đọc qua context để loại bỏ hoặc chỉnh sửa những phần thừa / không cần thiết. Khi đó, con người sẽ đứng giữa vòng lặp để duyệt nội dung cho đúng ý mình thay vì để AI vẽ ra những thứ không liên quan. Rõ ràng khi bạn quyết định bắt đầu xây dựng giải pháp nào đó, trong đầu của bạn chỉ có khoảng 3 cái gạch đầu dòng về vấn đề và 3 gạch đầu dòng về giải pháp. Lúc này còn rất nhiều thứ cần làm rõ. Giả sử bạn lấy Lean Canvas làm context, bạn cần phải hoàn thành thêm 7 mục nữa, chẳng hạn như dòng doanh thu, cơ cấu chi phí, kênh tiếp cận, chỉ số hiệu quả,... Và lúc này, bạn có thể dùng AI để hoàn thành chúng nhưng hãy duyệt lại để đảm bảo rằng chúng đúng với kế hoạch đề ra ban đầu tới khi thử nghiệm và xem thị trường phản ứng.



## Case Study: Tour-op (tour-op.com)

Về cơ bản, Tour-op là ứng dụng web và mobile cho phép du khách và người địa phương kết nối với nhau. 2 bên lên trên đó làm hồ sơ và đăng tải mong muốn chuyến đi. Những người phù hợp sẽ kết nối với nhau và cùng thực hiện những chuyến đi. Sau đó họ có thể để lại đánh giá để người sau biết và cân nhắc chọn lựa. 

Khi mới bắt đầu làm, Hải sử dụng Lean Canvas để làm context trên chính SaaS mình tạo là Lean2Pitch. [^1]  Trong đầu Hải lúc này đã có 1 vài ý tưởng cơ bản về vấn đề mà 1 du khách thường gặp phải: Không biết chọn quán nào, sợ bị chặt chém, sợ bị chăn dắt, không có ý tưởng nên đi đâu,... Và hình thành nên giải pháp kết nối du khách với một người địa phương hiểu khu vực. Tất nhiên là du khách có thể chưa tin tưởng người địa phương đó. Vậy thì sẽ có review, có xác thực hồ sơ, có điểm số mức độ hoàn thiện hồ sơ. Và điều đặc biệt nhất - có rất nhiều hồ sơ khác nhau cho du khách lựa chọn. 

Khi chọn Lean và hoàn thành trường vấn đề và giải pháp, Hải còn tận 7 ô cần điền và Hải lựa chọn dùng AI để hoàn thành context. Tất nhiên là Hải sẽ kiểm tra lại về chi phí, dòng doanh thu và kênh tiếp cận - thường là AI tạo đủ và Hải chỉ cần bỏ bớt đi cho phù hợp. 

Và khi cho AI chạy một hồi để Build phần mềm thì cơ bản đã có tính năng nhưng còn khá nhiều thứ rất mắc cười. Hải nhận ra là mình không có checklist các mô tả cho website, mình không có checklist các action button cho 2 ngôn ngữ tiếng Anh và tiếng Việt, mình cũng không có danh sách các ảnh được chuẩn bị trước để tạo cái landing cho đẹp 1 chút. Và cuối cùng, mình không có 1 vài seed data để tạo người dùng mẫu, tương tác mẫu. 

Anh em chú ý khi xây web app nội bộ và có đội ngũ đào tạo riêng cho mọi người thì có thể không cần giao diện nhiều hình ảnh. Nhưng khi làm web app giới thiệu dịch vụ hoặc các sản phẩm có tính trải nghiệm, giải trí cao thì yếu tố hình ảnh cực kỳ quan trọng. Nếu trang chỉ toàn chữ là chữ sẽ rất dễ làm cho người dùng phát ngán và muốn rời đi thay vì nhẫn nhịn ở lại khám phá tiếp. 

Nếu phải làm từ đầu mà không có AI, ngay cả checklist mô tả cũng sẽ lấy đi cả tháng của Hải chứ chưa nói tới những thứ phía sau như ảnh. Cái giao diện AI tạo lúc đầu ổn nhưng không có hình dẫn tới web rất thiếu kết nối cảm xúc và khi cho một người truy cập thử, họ không thực sự hình dung ra là Hải đang làm gì. Vì vậy, thiếu cái gì thì Hải sẽ tạo cái đó. 

**Ảnh vừa là tài nguyên, vừa là context**

Dù dùng Claude cho việc code khá là mạnh, Hải lựa chọn các mô hình gpt-image để tạo rất nhiều ảnh cho tour-op. Từ ảnh carousel, ảnh avatar mẫu, ảnh background mẫu, ảnh trải nghiệm mẫu cho tới ảnh giao diện mẫu. Không có ảnh, Claude sẽ không biết làm gì với web tiếp theo nên Hải vừa coi ảnh là asset, vừa coi là context để quăng cho AI làm giao diện hoàn chỉnh hơn. 

**Tạo lại danh sách UI**

Tour-op lúc đầu Hải nghĩ đơn giản chỉ cần landing page và trang hồ sơ. Nhưng về sau mới thấy nó thực sự cần nhiều hơn. Tổng cộng là 12 trang đã được tạo ra. Từ landing, trang khám phá, trang hồ sơ, trang trải nghiệm, chat, trang để admin quản trị, form để yêu cầu ghép local. Và một loạt thứ khác như thông báo, responsive. Vì thế, Hải sử dụng gpt để tạo mẫu 12 UI trên cùng một bức hình trước khi đưa cho Claude tạo lại trang web cùng với carousel. Cái tính năng đó của ChatGPT thật sự rất hay, không cần Figma chi tiết nhưng vẫn giải quyết được vấn đề và quản lý được 12 UI trong 1 khung hình.

## Kết

Khi nhắc đến context cho AI, có rất nhiều thứ cần phải học. Nhưng chung quy mục đích là để 1 prompt của mình làm cho AI tạo ra được sản phẩm đúng với yêu cầu nhất thay vì phải làm đi làm lại. Các tình huống, công việc khác nhau sẽ đòi hỏi các ngữ cảnh cần bổ sung cho AI khác nhau. Khi nói về context, sẽ không có mẫu số chung nào là chính xác hoàn toàn. Điều quan trọng là anh em áp dụng vào tình huống của mình cho phù hợp và hiệu quả thì vì cứng nhắc theo khuôn. 

Hi vọng anh em đọc bài viết này của Hải như một góc nhìn về việc sử dụng context bởi Hải cũng chỉ mới sử dụng context để phát triển ứng dụng chứ chưa từng sử dụng context để tạo nội dung tiếp cận người dùng và xây dựng thương hiệu đều đặn. Và hi vọng anh em cũng sẽ đón chờ các bài viết về sử dụng context cho mục đích chuyên sâu hơn như nội dung hoặc chiến dịch quảng cáo vào các bài viết sau!

[^1]: Quý Hải Ng, "Bộ khung Canvas tinh gọn," Hải có gì hay, 2026. https://haicogihay.com/blog/bo-khung-canvas-tinh-gon.html