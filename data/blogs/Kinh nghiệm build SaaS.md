---
title: Kinh nghiệm build SaaS
author: Quý Hải Ng
category: Công nghệ
status: done
---

# Kinh nghiệm build SaaS

Nếu phải nói rằng ngành công nghiệp nào phát triển mạnh mẽ nhất và thay đổi nhiều nhất trong vòng 10 năm trở lại đây, Hải nghĩ đó là ngành công nghiệp phần mềm dịch vụ hay còn được biết đến với tên gọi SaaS (Software-as-a-Service). Cổ phiếu của những công ty phần mềm tăng từ 5-10 lần bất chấp có thời điểm kinh tế suy thoái do tác động của dịch bệnh và chiến tranh. Các công ty start-up công nghệ mới liên tục ra đời và được định giá với những con số không tưởng, điển hình là OpenAI, Anthropic, Anysphere. 


## Thay đổi của SaaS trong 10 năm

Xu hướng chung về số lượng phần mềm dịch vụ ra đời cũng như lượng người dùng phần lớn là tăng trưởng. Nhờ vào việc SaaS được triển khai trên Cloud, các cá nhân hoặc doanh nghiệp làm SaaS có thể nhanh chóng thực hiện chỉnh sửa để thích nghi với sự thay đổi của người dùng. 

Thống kê từ Exploding Topics cuối 2026 [^1] chỉ ra trung bình mỗi người dành 4 giờ 37 phút mỗi ngày để dùng điện thoại. Mỗi ngày, mỗi người dùng mở điện thoại khoảng 58 lần: 3 lần để sử dụng trên 10 phút, 40 lần để kiểm tra thông báo nhanh dưới 2 phút. 52% khoảng thời gian check điện thoại mỗi tháng diễn ra trong giờ làm việc. 

Nhiều thống kê khác nhau tại Việt Nam cũng chỉ ra thời lượng sử dụng điện thoại trung bình của người Việt là từ 6-8 tiếng mỗi ngày, thậm chí có bài báo giật tít tiêu đề từ 9-13 tiếng. Nói như vậy để hiểu nhu cầu thực cho ngành phần mềm và Internet nói chung vẫn là **rất lớn**.

### Hướng tới mô hình trả phí để nhận một số đặc quyền (freemium)

Đây là điều dễ thấy nhất hiện nay. SaaS được nhắc tới nhiều nhất về việc này có lẽ là Youtube khi ra mắt tính năng Premium để tắt quảng cáo. Và điều này cũng từng gây ra tranh cãi khi nhiều người cho rằng họ tự tạo ra vấn đề là chèn thêm quảng cáo và bán giải pháp để giải quyết vấn đề do chính họ tạo ra. Nhưng nhìn chung, khi nhắc tới trải nghiệm người dùng, mỗi người sẽ có cảm nhận khác nhau về việc có đáng xuống tiền hay không?

Cho tới ngày nay, hầu hết các SaaS sẽ tìm cách thu phí của người dùng theo cách này hoặc cách khác. Từ ứng dụng chỉnh sửa ảnh, quản lý tài liệu / nội dung, từ các app môi giới như việc làm hay ứng dụng hẹn hò cho tới mạng xã hội. Có thể là dùng nhiêu trả nhiêu (Pay-as-you-go) hoặc là đăng ký thuê bao (Subscription).

Và sẽ thật thiếu xót nếu như không nói về việc Duolingo cũng lựa chọn tư bản hóa giáo dục. Bạn sẽ bị hạn chế nội dung hoặc thời lượng nếu như bạn không mua các gói tháng/năm do cú xanh đề xuất. Nhưng biết sao được, ai cũng cần phải ăn cơm mà - có lẽ doanh thu từ quảng cáo là chưa đủ. 


### SaaS ngày càng ứng dụng AI nhiều hơn

Đây là điều không cần phải bàn cãi. AI dù còn nhiều thiếu sót nhưng chúng làm rất tốt từ việc lập lịch, đặt lịch, tự động hóa, hỗ trợ hoàn thiện nội dung cho tới việc làm trợ lý toàn thời gian. CRM, ERP bây giờ cần AI. Các ứng dụng văn phòng cần AI. Các kỹ sư từ khắp các ngành nghề khác nhau cần AI. Sự ra đời của ChatGPT, sau đó kéo theo sự ra đời của hàng loạt LLM và AI Agents khác thực sự đã làm thay đổi mọi thứ không chỉ riêng SaaS.

## Trải nghiệm cá nhân trong gần 10 năm

### Rào cản khi Hải mới chập chững làm SaaS

Hầu hết mọi người đều học code từ những khung đen Console - Hải cũng vậy. Quay lại 8 năm trước, học ngôn ngữ gì, framework gì đã là một rào cản. Bởi vì có quá nhiều lựa chọn khi xét tới việc chúng làm được gì, mất bao lâu để học, chi phí để triển khai một ứng dụng hoàn chỉnh là bao nhiêu? Chúng có hỗ trợ trên hệ điều hành X hay không? Để đóng gói mã nguồn thành file cài đặt thì phải làm sao, mất bao nhiêu tiền? Thương mại hóa chúng thế nào? Có sợ bị ăn cắp mã nguồn không? Code có tối ưu về mặt hiệu năng hay không?

Thời điểm đó, việc cân nhắc lựa chọn thuê cloud hay host cho rẻ và có nên cúng tiền cho domain hay không cũng đã là vấn đề lớn với Hải. Có quá nhiều ngôn ngữ, framework cho tới công ty cung cấp giải pháp điện toán và offer nhiều mức giá khác nhau. Không trả lời được câu hỏi này thì mã nguồn chỉ có thể chạy local và đưa lên Github. Còn nếu tự build server? - Tiền điện 24/7 và tiền mua hardware có khi còn mắc hơn!

Theo trải nghiệm của Hải, vấn đề tích hợp giải pháp từ bên ngoài cũng là trở ngại. Nhẹ nhất là kết nối .NET với máy in qua thư viện để xuất báo cáo, máy scan để đọc barcode. Nặng hơn là làm sao để liên hệ với hàng loạt ngân hàng khác nhau để gom chung về 1 cổng thanh toán?

### Thay đổi từ "công nhân viết code" sang "kỹ sư phần mềm"

Nếu như trước đây, việc dành ra 1 buổi đi cafe nói chuyện với ai đó sẽ lấy đi thời gian làm SaaS của Hải thì bây giờ Hải đã có thể vừa cafe trò chuyện, vừa build SaaS. Thậm chí, Hải có thể nhanh chóng thay đổi hoặc bổ sung thêm tính năng gì đó mới đến từ cuộc trò chuyện với người khác. Quả thật AI đã có thể viết code, review và tự test nhanh và tốt hơn 1 Dev trình độ Junior. Việc của Hải chỉ đơn giản là quản lý tốt context, kiến trúc và cấp quyền cho Agents. 

**Nói nhiều hơn về nhu cầu và trải nghiệm người dùng thay vì code**

Thực lực của Hải hiện tại cộng với sự giúp sức của 1 AI agent hoàn toàn có thể cho ra 1-2 SaaS mới mỗi tuần. Nếu bạn không thấy SaaS mới từ Hải sau 1 tháng, hoặc là Hải đang tập trung cải thiện trải nghiệm người dùng của các SaaS cũ, hoặc là Hải đang bí ý tưởng, hoặc cũng còn một khả năng khác cao hơn là hết tiền làm SaaS. 

Rõ ràng các AI Agent như Cursor và Claude ngày nay có thể nhanh chóng code giao diện, thiết kế và kết nối cơ sở dữ liệu. Điều đó làm giảm đáng kể thời gian phát triển và triển khai ứng dụng. Vì vậy, nếu phải nói một câu công bằng - thì các SaaS hơn nhau ở việc hiểu người dùng chứ không phải là độ dài của mã nguồn. Vì vậy, phần lớn thời gian dành cho xây dựng SaaS ngày nay nên đến từ việc:

1. Xác định vấn đề và nhu cầu người dùng để tìm kiếm cửa sổ cơ hội và thị trường đủ lớn.

2. Quản lý tốt context để build SaaS nhanh chóng (tham khảo Mô hình Canvas và ứng dụng CaaS - Lean2Pitch [^2])

3. Thu thập trải nghiệm của người dùng để cải tiến ứng dụng (tiếp tục lặp đi lặp lại)

## SaaS thực dụng: Chi phí và doanh thu

Nhớ nhé, cái gì bạn không tự làm được mà phải nhờ đến người khác (hoặc đã ăn độc quyền) thì đó là chi phí. Còn những gì bạn tự làm được nhưng vẫn phải bỏ thời gian thì đó vẫn là chi phí - nhưng nếu bạn thấy đáng thì vẫn sẽ làm (miễn là còn gồng được). Một số chi phí làm SaaS mà anh em có thể phải đối mặt:

- Phát triển, bảo trì và cải tiến SaaS
- Hosting, lưu trữ, CDN
- Tên miền, công cụ vận hành và bản quyền tài nguyên
- SEO, quảng cáo để tiếp cận người dùng
- Hỗ trợ người dùng và phí thanh toán nếu áp dụng gói trả phí

Còn về doanh thu, khả năng cao chúng sẽ đến từ quảng cáo, các offer trả phí khác nhau. Vì thế, nếu không có investors, rất có thể anh em sẽ đói trong giai đoạn đầu làm SaaS đấy!

**Không tham vọng lớn khi nguồn lực nhỏ!**

Một trong những tham vọng dẫn tới thất bại phổ biến nhất của người mới bắt đầu làm SaaS đó là làm mạng xã hội. Đã rất nhiều công ty lớn nhỏ khác nhau thất bại và quay xe ở mảng này. Tại sao phải làm mạng xã hội? Mạng xã hội bạn đưa ra giải quyết vấn đề gì mà các mạng xã hội hiện tại chưa có? Bạn đã tính tới các chi phí để có hệ thống chưa? Bạn đã tính tới chi phí để có được người dùng, chi phí để giữ ngọn lửa kết nối và tương tác của người dùng chưa? Bạn đã tính tới chi phí để có được lượng nội dung đầy đặn, đa dạng và thuật toán phân phối chúng hiệu quả chưa? Bạn đã tính tới chi phí để giải quyết các vấn đề pháp lý do "nội dung sáng tạo" từ người dùng tạo ra chưa?

Có thể bạn không tin nhưng hồi còn là sinh viên năm 2, Hải đã từng lóe lên ý tưởng làm mạng xã hội khuyến khích người dùng chia sẻ ý tưởng, phản biện ngay cả khi ý tưởng mới hình thành và còn sơ khai bởi vì AI sẽ được tích hợp để hỗ trợ trả lời bên dưới bài đăng khi bạn hỏi. Ý tưởng khá giống mạng xã hội Thread này xuất hiện vào năm 2021 (trước khi Thread ra đời được 2 năm) khi Hải nhìn thấy tính năng bình luận trên Facebook và Youtube chỉ chấp nhận tối đa 2 lớp phản hồi và không cho phép tự bình luận khi nội dung chưa được tạo. Hải từng đặt tên cho nó là "Vô tri" - nhưng tất nhiên là Hải đã nhanh chóng dừng lại vì chưa trả lời được hết những câu hỏi ở bên trên. 


## Tập trung cho ý tưởng và trải nghiệm người dùng

SaaS ngày nay đã dễ build hơn 5-10 năm trước rất nhiều rồi. Vì thế, hãy cố gắng khai thác nhu cầu, vấn đề, sự bất tiện, sự khó chịu của người khác. Chúng xuất hiện ở khắp mọi nơi từ ngoài đời đến Internet. Chúng mới là động lực để bạn làm SaaS. Hãy cố gắng đưa ra lời đề nghị người khác dùng thử SaaS của bạn - và ngày càng nhiều hơn. Quan sát xem khi họ dùng SaaS, mắt họ tập trung vào đâu, tay họ thao tác như thế nào, họ tương tác và phản hồi ra làm sao. Những thứ đó sẽ khiến cho SaaS của bạn ngày càng phát triển và trở nên cạnh tranh hơn.


## Muốn giỏi cái gì thì hãy nói nhiều về nó

Cách hiệu quả nhất để giỏi lên - bất kể thứ đó là gì - chính là trao đổi nhiều về nó. Đó là lắng nghe và ghi nhận nhiều luồng ý kiến của nhiều người khác nhau, trao đổi và tương tác với họ. Hỏi họ và xem họ đáp gì và khuyến khích họ làm điều ngược lại với bạn. Dù cho bạn đang ở bất kỳ giai đoạn nào của quá trình làm SaaS (học công nghệ - tìm kiếm vấn đề và giải pháp - phát triển sản phẩm - thử nghiệm sản phẩm). Bạn nên - kể cả người bạn đối thoại có là học sinh / sinh viên, người lao động, nhân viên văn phòng hay bảo vệ trông xe - miễn là họ đã có nhiều trải nghiệm ứng dụng và có khả năng thụ hưởng giá trị từ SaaS mới!

Không nhất thiết phải là kỹ sư phần mềm hạng ưu thì mới có đặc quyền được nói về SaaS - hoàn toàn không! Bạn xuất hiện với tư cách là người dùng, như thế đã là quá đủ. Bản thân SaaS không phải là thứ bị cô lập bởi đội ngũ phát triển. SaaS trở nên hữu ích và có giá trị là bởi vì được sử dụng để giải quyết vấn đề và được quan tâm bởi nhiều người - từ đó mang lại doanh thu cho đội ngũ phát triển.


[^1]: [Time Spent Using Smartphones (2026 Statistics) by Fabio Duarte](https://explodingtopics.com/blog/smartphone-usage-stats)
[^2]: Quý Hải Ng, "Bộ khung Canvas tinh gọn," Hải có gì hay, 2026. https://haicogihay.com/blog/bo-khung-canvas-tinh-gon.html