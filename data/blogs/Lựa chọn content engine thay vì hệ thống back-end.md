---
title: Tạm biệt Wordpress - Vì sao mình chuyển sang content engine thay vì hệ thống back-end CMS
category: Công nghệ
tags:
  - web
  - tech
  - wp
date: 2026-05-24
thumbnail: assets/blog_image/say_bye_word_press.png
status: done
---

# Tạm biệt Wordpress - Vì sao mình chuyển sang content engine thay vì hệ thống back-end CMS

Từng nghiên cứu Wordpress 5 năm và thực chiến 2 năm, cũng xuất bản được kha khá blog. Bản thân Hải thấy Wordpress đem lại rất nhiều trải nghiệm thú vị nơi blogger chỉ cần quan tâm tới tuyến nội dung và quản trị thay vì đầu tư nhiều thời gian cho code, web, database, ...  Wordpress mang lại rất nhiều giá trị cho Hải. Với những anh em đã từng đau đầu hoặc đã trả giá vì hệ thống quản lý phân quyền, quản lý media, danh mục, bình luận,... thì sẽ hiểu rõ Wordpress có thể giúp anh em tiết kiệm cả tỷ đồng. Và trên hết nó là mã nguồn mở, miễn phí.

## Khi CMS không còn là sự lựa chọn phù hợp cho 1 cá nhân

Chỉ cần 1 vài cú click chuột là đã có 1 website giao diện ổn, trình soạn thảo blog, giao diện dashboard, tích hợp đủ thứ plugins. Anh em không cần lo về việc phân loại, hiển thị danh sách bài viết như thế nào? Vì đằng sau đó CMS đã làm đủ mọi thứ cho anh em. Wordpress hỗ trợ quản lý danh mục, danh mục con, quản lý bài viết theo thẻ tag, ngày đăng. Anh em thậm chí có thể tạo nhiều tài khoản cho đồng đội cùng cộng tác viết bài. Lúc đó Wordpress còn giúp anh em phân loại bài viết theo tác giả. 

### Wordpress là miễn phí nhưng Cloud / Host thì không

Cá nhân mới bắt đầu viết blog luôn muốn lựa chọn giải pháp giá rẻ nhất có thể. Vì lúc mới bắt đầu, họ thường mơ hồ về đường dài, về việc coi đây là sở thích hay là công việc, về khả năng kiếm tiền từ viết blog. Vì thế, hầu hết sẽ quan tâm tới tổng chi phí để có trang web hiển thị và vận hành blog. Bây giờ hãy cùng tính toán một vài chi phí phổ biến khi làm blog hiện nay:
- Tên miền (đuôi .com hoặc .vn)
- Thuê web hosting hoặc cloud
- Các chi phí phát sinh khác cho giải pháp bảo mật, backup, chống spam, ...

**Về tên miền**, đó là khoảng gần như là bắt buộc vì đó là thương hiệu, là sự định danh. Khi chưa có tiền, anh em có thể cân nhắc những tên miền miễn phí với đuôi `.dev`, `.github.io`. Còn muốn độc giả tin tưởng thương hiệu, 1 tên miền `.com` là bắt buộc. Hoặc có thể dùng tên miền `.vn` nếu ở Việt Nam. Như vậy nếu muốn tên miền ***định danh***, anh em sẽ tốn khoảng 300.000VNĐ mỗi năm. 

**Về hosting**, nếu sử dụng Wordpress, bắt buộc phải có database ở phía sau. Và vì thế, thuê host sẽ tốn từ 600.000VNĐ mỗi năm. Thuê cloud sẽ tốn trên dưới 1 triệu mỗi năm. Còn nếu chỉ cần dựng web tĩnh, chi phí có thể bằng 0 cho người mới bắt đầu. 

**Về các chi phí phát sinh**, đây là khoản chi phí khó ước lượng nhất. Bởi nó phụ thuộc vào đơn vị cung cấp dịch vụ điện toán, lựa chọn phương án xây blog, lựa chọn tích hợp từ bên ngoài vào hay chọn bộ giải pháp toàn diện của 1 hệ sinh thái.

Về cơ bản, làm blog 0 đồng chỉ có thể áp dụng khi anh em làm static web với tên miền miễn phí. Khi đã dùng Wordpress, anh em bắt buộc phải chi trả cho dịch vụ host hoặc cloud để đặt database.



### Khi những plugin tích hợp lại trở thành vấn đề

Để đáp ứng được nhu cầu người dùng nhiều nhất có thể, chỉ Wordpress core là không đủ. Vì thế, Wordpress sẽ cho phép nhiều người cùng cộng tác để tham gia phát triển plugin. Từ quản lý, tối ưu, khảo sát độc giả, tích hợp thương mại điện tử, tích hợp engine thống kê của Google,... Anh em hoàn toàn không cần tự build, chỉ cần tải xuống, tích hợp và cấu hình.

Nhưng khi tích hợp càng nhiều plugin thì càng nhiều vấn đề sẽ xảy ra. 1 plugin có thể quản lý tài nguyên chung với Wordpress và các plugins khác. Nên việc update plugin làm hỏng layout hay việc update Wordpress làm plugin chết là chuyện bình thường. Các plugin không bắt buộc phải hiểu nhau, vì vậy nếu anh em quản lý plugin không tốt thì rất dễ xảy ra xung đột. Một plugin khi được kích hoạt có thể làm chậm website, tạo lỗ hổng bảo mật hoặc gây ra hiệu ứng domino lên các plugin khác.

### Vấn đề spam bình luận

Khi Hải mới viết được vài bài viết bằng Wordpress, nhìn thấy lượt bình luận nhảy lên vài chục nghìn, vài trăm nghìn, Hải đã nghĩ Hải là ngôi sao vì con số đó ngay cả những content-writers nhiều năm cũng phải mơ ước. Nhưng khi xem nội dung bình luận, chúng chỉ là những bình luận của ngôn ngữ nước ngoài, điều hướng tới trang web khác, kèm theo format rất quen thuộc, Hải bắt đầu nhận ra đó là spam.

Lúc đầu Hải quyết định duyệt hết vì đằng nào web cũng ít traffic. Nhưng về sau Hải nhận ra mình cần phân loại bình luận spam để Hải có thể dành thời gian để đọc góp ý của độc giả thật, đồng thời làm web gọn gàng hơn. Hải cần những bình luận khen chê về bài viết để hiệu chỉnh và cải thiện cho những bài viết sau. Vì thế Hải cài plugin chống spam. Nhưng các plugin không thật sự hiệu quả như những gì Hải mong đợi. Các thuật toán nhận diện spam thời đó so với LLM ngày nay quả thật không thể bì tị và hoàn toàn không hiệu quả nếu so với LLM ngày nay. Và nhiều khi chúng lại vô tình xóa luôn bình luận thật. Chưa kể plugin hay gửi email thông báo spam cho Hải liên tục.

Về sau Hải mới nhận ra phần lớn người đọc thật không comment, nếu họ thật sự thích bài viết hoặc muốn liên hệ tác giả, họ sẽ phản hồi email hoặc tin nhắn trực tiếp. Chỉ có các bot là hoạt động 24/7 khiến người thực sự bình luận bì chìm xuống. Với blog cá nhân, để lại email hoặc số điện thoại cho độc giả liên hệ lại khiến web quản lý hiệu quả hơn và người dùng trải nghiệm tốt hơn. Lúc đó, Hải chỉ cần thêm phản hồi của độc giả qua email vào cuối bài viết nếu độc giả đồng ý. Như vậy khiến cho web sạch hơn nhiều so với việc mở comment cho bất kỳ ai để lại bình luận.

### Vấn đề migrate dữ liệu

Thoạt nghĩ qua thì câu chuyện di chuyển dữ liệu có vẻ đơn giản, chỉ việc bê dữ liệu từ chỗ này qua chỗ kia là xong. Nhưng bài viết được lưu trên Wordpress sẽ ràng buộc với tác giả, danh mục và bình luận. Vì thế cùng là bài viết nhưng schema có thể khác nhau. Khi xuất hàng loạt bài viết để migrate, việc bị vỡ nội dung, bị sai format, bị mất liên kết hình ảnh là chuyện có thể hiểu được. Lúc đó bắt buộc phải viết parser, converter, migration script hoặc content transformer để có thể đưa dữ liệu đúng khuôn.

Khi bản thân Hải nhận ra bản thân việc parser, converter, transfomer chính là content-engine và điều đó là không tránh khỏi với web blog, thì toàn bộ bộ não đứng đằng sau blog thực chất có thể chỉ cần content-engine làm nhiệm vụ đọc nội dung, parse cấu trúc, chuẩn hóa dữ liệu, khớp nối các trường dữ liệu và render ra format mới. Đó là lúc Hải cảm thấy trình biên dịch (compiler) mạnh hơn hệ quản trị nội dung (CMS). Và trong thời đại AI / LLM phát triển mạnh mẽ như ngày nay, việc viết parser, render hay compiler ngày càng trở nên dễ dàng. 

## Wordpress mạnh nhưng không cá nhân hóa tốt

Điểm mạnh đầu tiên của Wordpress là quản lý rất tốt thẻ tag và danh mục, giúp độc giả dễ dàng tìm bài viết, nhưng nó không thể thực hiện truy vấn riêng biệt mà Hải yêu cầu. Đã có lần Hải thử tạo series bài viết để độc giả dễ dàng tìm kiếm hơn kiểu như `Series Python` cơ bản hoặc `30 ngày làm dự án ABC với framework XYZ`,... Chúng không thể chia theo danh mục bởi vì danh mục rộng hơn thế. Chúng giống như playlist của Youtube. Hải không muốn gom hết chúng vào 1 bài viết mà phải chia ra để mỗi bài có độ dài vừa phải với độc giả. Nhưng Hải cũng biết rõ chỉ phân loại theo danh mục hoặc thẻ tag là không đủ. Hải muốn thêm vào danh sách thủ công hoặc là tự động thêm vào danh sách khi tiêu đề bắt đầu bằng từ khóa nhất định hoặc thỏa regex. Và danh sách đó cũng có id riêng và độc giả có quyền lọc tất cả bài viết trong series đó. Và tất cả các giải pháp Hải đã thử trên Wordpress ở thời điểm đó vẫn không thể đáp ứng được yêu cầu của Hải.

Điểm mạnh thứ hai của Wordpress cho phép tự động thêm mục lục bài viết (TOC) ở đầu. Khi một bài viết trở nên dài hơn thì việc chia từng mục trong bài viết trở nên cần thiết và mục lục giúp anh em nhanh chóng đi đến nội dung quan tâm thay vì đọc những nội dung không cần thiết. Thời điểm đó, Hải luôn muốn blog của Hải có chất lượng tốt nhất nên muốn làm mục lục dính bên hông, tự động đánh dấu chỉ mục xanh ở phần mục tương ứng. Nhưng làm tính năng này không thể cấu hình thủ công mà phải chèn đoạn mã và phụ thuộc rất nhiều vào theme và plugin. Và vấn đề xung đột plugin với theme là chuyện rất bình thường. Một thứ Hải có thể giải quyết rất dễ dàng khi tự viết code blog thuần thì lại gặp khó khi sử dụng trên plugin và theme của Wordpress. Như đã đề cập ở trên, việc update phiên bản của Wordpress, theme hoặc plugin mà diễn ra không đồng bộ thì rất dễ gặp lỗi.

Thực tế, dù Wordpress rất mạnh nhưng các trang báo lớn thường không sử dụng Wordpress vì các theme không đáp ứng đủ nhu cầu, và cấu hình trang thật sự chưa đủ mạnh.

## 1 tỷ rủi ro bảo mật khi làm web có back-end và database

Khi một website bắt đầu có tính năng đăng nhập, phân quyền, giao diện admin, database, tải lên tập tin, tính năng bình luận, API, phiên đăng nhập (session) thì nó mở ra hàng loạt rủi ro có thể bị khai thác và tấn công. Và lúc đó Hải lại phải giành thời gian để tìm hiểu về các giải pháp chống brute-force, chống SQL-injection, giám sát request lạ, chống DDoS, back-up database,... trong khi mục đích ban đầu chỉ đơn giản là viết blog.

Và từ lúc này Hải mới nhận ra cách bảo mật tốt nhất đôi khi không phải là thêm nhiều lớp bảo vệ hơn mà là giảm bớt thứ cần phải bảo vệ. Và câu này rất giống với câu nói mà Hải đã từng nghe từ thầy trước đây: "Hệ thống thông tin an toàn nhất là hệ thống không có thông tin". Làm sao 1 người có thể tấn công vào một hệ thống khi bên trong nó không chứa gì?

## CMS thì vẫn cần quản trị

Khi dùng CMS, Hải vẫn phải quan tâm tới hosting, domain, backup, bảo mật, phân quyền, plugin, cập nhật phiên bản, tối ưu hiệu năng, xử lý spam, khắc phục sự cố. Nói cách khác, công việc lập trình gần như bằng không, nhưng công việc vận hành lại xuất hiện. 

Để thêm 1 tính năng mới, Hải không cần tự viết code từ đầu. Nhưng Hải vẫn phải tìm plugin phù hợp, đánh giá độ uy tín, kiểm tra tương thích, cấu hình và cập nhật định kỳ. Và khi website gặp sự cố, CMS cũng không tự sửa được mà bản thân vẫn phải tìm hiểu plugin nào gây lỗi, update nào vừa làm hỏng website, vì sao web vẫn bị spam. 

Điều này không phải điểm yếu của CMS. Thực ra đó chính là cái giá phải trả cho sự tiện lợi. CMS giúp người dùng không cần trở thành lập trình viên, nhưng chỉ cần tập trung viết blog đơn thuần là chưa đủ. Khi mục tiêu đơn giản chỉ là viết nội dung và xuất bản nội dung, một content engine tối giản đôi khi lại phù hợp hơn rất nhiều so với một CMS đầy đủ tính năng.

## Tĩnh thắng động (Static > Dynamic)

Sau một thời gian làm web, Hải bắt đầu nhận ra một điều khá thú vị là nhiều website thực ra không cần phải lúc nào cũng đọc database. Một bài blog sau khi viết xong ít thay đổi, không cần realtime, không cần query database liên tục, không cần render động mỗi request thì việc chạy back-end framework, kết nối database và thực thi hàng loạt logic phía sau nó chỉ để trả về 1 bài viết gần như là không cần thiết

Static site có vẻ đẹp rất riêng là đơn giản dễ hiểu, ít lỗi, dễ deploy trên bất cứ môi trường nào. Một file HTML tĩnh không query database, không chạy business logic, không cần ORM, không cần middleware, không cần auth flow phức tạp. Công việc của server chỉ đơn giản là trả file. Nhiều website cá nhân thực chất chỉ cần chuyển đổi file markdown để trả về HTML là đủ để phục vụ hàng chục nghìn lượt truy cập.

Thật ra, công nghệ tốt không phải công nghệ làm được nhiều thứ nhất. Mà là công nghệ phù hợp nhất với bản chất của bài toán, giải quyết đúng nhu cầu của người dùng. 


## Điểm yếu của static web vận hành bằng content engine

Dù static web có nhiều ưu điểm về hiệu năng, chi phí và bảo mật, một số tính năng phổ biến trên các nền tảng CMS truyền thống sẽ khó triển khai hơn hoặc phải sử dụng giải pháp bên thứ ba.

### Thống kê lượt truy cập và hành vi người dùng

Static web không có backend để tự ghi nhận dữ liệu truy cập. Nếu muốn biết có bao nhiêu người đọc bài viết, họ đến từ đâu, ở lại bao lâu hay bài viết nào được quan tâm nhất, chủ website thường phải tích hợp các dịch vụ phân tích của Google Analytics hoặc Cloudflare Analytics. Điều này đồng nghĩa với việc dữ liệu phân tích nằm trên hệ thống bên ngoài thay vì hoàn toàn do website kiểm soát. 

### Cho phép độc giả để lại bình luận

Bình luận là một tính năng tưởng chừng đơn giản nhưng thực tế lại đòi hỏi rất nhiều thành phần phía server như lưu trữ dữ liệu, chống spam, kiểm duyệt nội dung và quản lý tài khoản người dùng. Tuy nhiên, khi bắt đầu thêm backend chỉ để phục vụ bình luận, website cũng bắt đầu đối mặt với các vấn đề như spam bot, lưu trữ dữ liệu, bảo mật và vận hành hệ thống. Đây chính là điều mà kiến trúc static web ban đầu cố gắng tránh.

### Nội dung không thể cập nhật theo thời gian thực

Mỗi khi có bài viết mới hoặc thay đổi nội dung, website cần được build lại trước khi xuất bản. Với blog cá nhân điều này thường không thành vấn đề, nhưng với các hệ thống cần cập nhật liên tục theo thời gian thực như mạng xã hội, diễn đàn hoặc sàn thương mại điện tử, static web không phải là lựa chọn phù hợp.

## Tổng kết

Static web vận hành bằng content engine không phải là giải pháp phù hợp cho mọi loại website. Nếu anh em đang xây dựng một mạng xã hội, diễn đàn, hay sàn thương mại điện tử với nhiều tương tác thời gian thực, việc sử dụng backend và database là điều bắt buộc. Tuy nhiên, đối với blog cá nhân, website giới thiệu doanh nghiệp, trang tài liệu kỹ thuật hoặc các hệ thống chủ yếu phục vụ việc đọc nội dung, static web lại mang đến nhiều lợi ích đáng kể. Website tải nhanh hơn, chi phí vận hành thấp hơn, ít phụ thuộc vào cơ sở dữ liệu và quan trọng nhất là giảm đáng kể rủi ro bị tấn công. 

Với 1 blogger, thay vì phải duy trì một CMS phức tạp với hàng loạt plugin, tài khoản quản trị, cơ sở dữ liệu và các bản vá bảo mật định kỳ, việc thuần tập trung vào sản xuất nội dung mới là ưu tiền hàng đầu. Toàn bộ quá trình còn lại được tự động hóa thông qua content engine để chuyển đổi cắt văn bản và nhúng vào các tập tin định dạng. 
