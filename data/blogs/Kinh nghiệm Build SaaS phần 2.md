---
title: Kinh nghiệm Build SaaS phần 2
category: Công nghệ
author: Quý Hải Ng
tags:
- SaaS
status: done
---

# Kinh nghiệm build SaaS #2

Chi phí để làm phần mềm ngày nay đã rẻ không khác gì mớ rau mua ngoài chợ. Nhờ có Claude mà ai cũng có thể trở thành nhà sáng lập, nhà khởi nghiệp. Có lẽ tới năm 2030 sẽ phấn đấu mỗi gia đình có ít nhất 1-2 người làm startup và founder sẽ trở thành vua của mọi nghề.

Nhưng khi ai cũng có thể gia nhập ngành này, miếng bánh sẽ được chia như thế nào, ai sẽ là người cắt miếng bánh? Khi một người ngày nay có thể làm công việc của 10 người trước đây, 9 người còn lại sẽ đi đâu và làm gì? Và khi giá cả rẻ như vậy, đâu sẽ là yếu tố cạnh tranh giúp kiếm nhiều tiền, giúp sống lâu và sống khỏe từ ngành này?

## Thứ mà siêu trí tuệ chưa thể làm được

Đó chính là đảm bảo phần mềm sẽ không có vấn đề gì trong quá trình sử dụng và vận hành. Trước đây, ngay cả việc làm MVP cũng sẽ lấy đi 1-2 tuần của 1 đội nhóm. Nhưng ngày nay, chỉ cần 1-2 prompt là có thể dựng lên cả phiên bản sẵn sàng triển khai lên server. Khi bạn tự viết code từ đầu, xây dựng từng chức năng, viết từng hàm, bạn biết rõ luồng và logic của phần mềm so với yêu cầu đặt ra. Nhưng khi bạn sử dụng agents để viết, bạn có thể sẽ không biết chắc chắn rằng phần mềm liệu có khả năng gặp các lỗi nói chung so với yêu cầu hay không. Và rộng hơn là làm sao để có thể tối ưu phần mềm trên nhiều thiết bị khác nhau, làm sao giảm thiểu rủi ro bị xâm nhập hệ thống từ bên ngoài hay các giải pháp ghi nhận, cảnh báo đến nhà phát triển, admin nếu ghi nhận lỗi hoặc bị tấn công.

Sự cạnh tranh trong ngành phần mềm đơn thuần ngày nay không phải đến từ việc tạo ra nhiều phần mềm hơn, mà đến từ việc đảm bảo và kiểm soát chất lượng, đảm bảo phần mềm đáp ứng các yêu cầu đặt ra. Nếu nói về phí làm SaaS, ai cũng có thể làm với agent có giá rất rẻ. Nhưng để đảm bảo phần mềm của bạn chạy tốt, bạn phải tạo từng tài khoản, thử từng case, đặt ra rất nhiều câu hỏi giả định bắt đầu bằng chữ nếu. Và người có tiền sẽ đè bẹp người không có tiền bằng việc mua 200 agents khác nhau từ rẻ đến mắc và và ra lệnh cho chúng mở phần mềm lên tạo nhiều user, nghĩ đủ thứ cases và test chéo lẫn nhau theo thời gian thực. Sau đó, họ sẽ bắt chúng làm báo cáo để bổ sung vào context rồi bắt con agent mắc tiền sửa lỗi và test lại. Và có thể bổ sung thêm các tiêu chí họ muốn từ tiêu chuẩn ISO cho tới tài thiệu các threat thường gặp để các agents scan qua và tiếp tục làm việc cho họ.

Nhưng có bao nhiêu agents vẫn sẽ không bao giờ thay thế hoàn toàn con người trong công việc này. Cách duy nhất để phần mềm không có vấn đề là cả 8 tỷ người trên thế giới này sẽ không thể làm cho phần mềm có vấn đề mà không được sự cho phép theo bất kỳ cách nào. Không phải là phần mềm viết cho nội bộ thì chỉ cần nội bộ nói ổn là đủ. Nếu phần mềm đó cho phép kết nối Internet thì người ngoài vẫn có khả năng xâm nhập lấy dữ liệu hoặc xóa dữ liệu khi không được phép - và đó sẽ là thảm họa nếu xảy ra. Hãy tưởng tượng một người có thể tắt tủ đông hải sản, tắt thiết bị bảo quản sản phẩm y tế như dược phẩm hay huyết tương từ xa chỉ cần bằng Internet mà không cần cấp quyền - điều đó có thể gây thiệt hại bao nhiêu? Hãy thử tưởng tượng các camera và cửa cuốn điều khiển từ xa có thể bị kẻ xấu chiếm quyền điều khiển để tắt cam và mở cửa lấy trộm đồ khi chủ không có ở đó, người ta có thể mất bao nhiêu đồ đạc? Hãy tưởng tượng thông tin và tài sản người dùng bị đánh cắp và bị kẻ xấu chiếm quyền điều khiển để chuyển loạn xạ nhằm che giấu dòng tiền lấy được chỉ bằng Internet, công ty đó sẽ chịu ảnh hưởng nặng nề đến mức nào?

Đó là lý do mà các vị trí tester, QA/QC, log analytics hay security - về mặt lý thuyết sẽ không bao giờ có khái niệm tuyển đủ người dù trên thực tế các công ty có thể viện hàng loạt lý do để lay-off. Vì vậy, nếu như trước đây 1 team cần 5 dev - 5 test, cùng ngân sách đó có thể dùng cho 1 dev - 9 test. Chỉ có cách gọi càng nhiều người và thử càng nhiều khả năng khác nhau với phần mềm để phát hiện những gì chưa ổn rồi vá lại mới giảm thiểu tối đa rủi ro bị lỗi hoặc bị tấn công.

Chính những công việc nhàm chán, lặp đi lặp lại mới chính là thứ nuôi sống bạn - với tư cách là một người đi làm nhận lương đều đặn hàng tháng. Nó chính là 99% các công việc vận hành thường ngày - công việc sẽ có tính chất lặp đi lặp lại, lặp đi lặp lại và cái gì quan trọng nhắc lại 3 lần: lặp đi lặp lại. Bất kể đó là đánh máy, viết báo cáo theo mẫu, thao tác bằng chuột và bàn phím, nhập số liệu cho tới ngồi im hàng tiếng đồng hồ chỉ để nghe những lời khó nghe trong phòng họp. Và không riêng ngành phần mềm, hầu hết những thứ mang lại dòng tiền đều đặn, ổn định hầu hết sẽ đến từ các công việc nhàm chán lặp đi lặp lại.

## Chi phí nào chưa có dấu hiệu giảm?

Đó là chi phí cho dữ liệu và hạ tầng phần cứng nói chung. Cho tới tận bây giờ, những thứ trên đang có dấu hiệu tăng về nhu cầu và về giá. Kể cả khi bạn chưa xác định được chúng sẽ được dùng cho mục đích gì, một khi người ta đã nói về trung tâm dữ liệu, về công nghiệp bán dẫn, về ngành năng lượng, chúng ta sẽ đều hình dung rằng nó sẽ cần ngốn rất nhiều tiền.

Bạn đang trong vai trò là 1 nhà phát triển, 1 founder, 1 startup - bạn sẽ thấy những thứ đó đang cắn rất nhiều tiền của bạn. Drive, hosting, cloud, CPU, GPU, RAM, Cache và ti tỉ thứ dịch vụ liên quan khác chính là chi phí của bạn và sẽ ngày càng phình to ra khi bạn càng có nhiều người dùng và phải xử lý ngày càng nhiều lưu lượng truy cập hơn.

Vì vậy, nếu bạn đang trong vai trò là người đang tìm việc hay chương trình đào tạo, bạn có thể cân nhắc lĩnh vực điện, năng lượng, vật liệu và bán dẫn. Chúng là vật lý, là hữu hình và phục vụ cho nhiều lĩnh vực khác nhau không riêng gì phần mềm. Cũng như thị trường hiện tại và tiềm năng phát triển của những ngành nghề này trong tương lai còn rất lớn.

## Là 1 founder, bạn có dám tiến thêm 1 bước nữa để mang lại giá trị cho người khác hay không?

Vì tiền để làm SaaS đã rẻ như mớ rau ngoài chợ, bạn đã có thể làm rất nhiều SaaS mỗi tuần. Nhưng liệu người ta có cần đến chúng hay sẵn sàng mua chúng không? Rõ ràng, việc viết thêm nhiều phần mềm trùng lặp chẳng giải quyết được vấn đề. Cái bạn cần tìm là giải pháp cho vấn đề mà người khác gặp phải. Chỉ khi bạn giải quyết được vấn đề mà người khác gặp phải, bạn mới có khả năng kiếm tiền từ họ. Chỉ cần thấy người ta đánh giá 1 sao về SaaS họ đang sử dụng và để lại than phiền về lỗi hay tính năng - thứ mà bạn có thể giải quyết và cung cấp tốt hơn là đủ để bạn alo cho người ta rồi.

Suy cho cùng, phải có người dùng, phải có người thụ hưởng giá trị, phải có người sẵn sàng trả tiền thì SaaS của bạn mới có giá trị. Giá trị của bạn không nằm ở việc bạn sản xuất được bao nhiêu SaaS, mà nằm ở việc người ta sử dụng SaaS của bạn nhiều như nào và cho mục đích gì? Vì vậy, sẽ thật vô nghĩa nếu bạn chỉ build SaaS rồi vứt đó. Nó chả khác gì bạn mua mớ rau ngoài chợ không ăn rồi để hư héo. Cho nên, bạn cần phải tìm kiếm người dùng và khách hàng.

Câu chuyện của bạn sẽ quay lại với việc bán hàng và thuyết phục người khác. Bạn có sẵn sàng chấp nhận rủi ro bị từ chối để làm phiền người khác trải nghiệm SaaS của bạn, để đưa ra offer bán hàng hay để kêu gọi đầu tư hay không? Bạn đã sẵn sàng tận dụng toàn bộ nền tảng bạn đang nắm giữ để đăng tin, để dựng nội dung xoay quanh SaaS của bạn? Bạn đã lên kế hoạch SEO organic và chiến dịch xuống tiền chạy quảng cáo để tiếp cận với nhiều người hơn hay chưa? Vì nếu không có những thứ này, không cần biết bạn đầu tư bao nhiêu thời gian và tiền bạc, SaaS vẫn không thể nuôi ngược lại bạn và giải quyết các nhu cầu vật chất đời thường cho bạn.