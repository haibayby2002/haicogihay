---
title: Tìm hiểu về MCP
author: Quý Hải Ng
category: Công nghệ
status: in-draft
---

# Tìm hiểu về MCP



## Tại sao chúng ta cần MCP

Hãy bắt đầu với 1 công cụ mà chúng ta đều biết - ChatGPT. Khi 1 người muốn nhờ ChatGPT làm 1 điều gì đó, họ sẽ gửi prompt và sau đó ChatGPT sẽ phản hồi lại người đó. Và xuyên suốt quá trình này chỉ nhận văn bản và trả về văn bản. Không có 1 hành động nào được thực hiện ngoại trừ trao đổi thông tin. Bây giờ tôi muốn AI tìm cho tôi nhà hàng gần đó, sau khi tôi ưng sẽ tự đặt xe để chở tôi và đặt bàn đặt món trước thay vì để tôi tự đặt. Sau đó tôi nhận các khoản chi phí cho các công việc này và quyết định xem có muốn đổi dịch vụ hay không? Tất nhiên chỉ LLM thôi là chưa đủ, lúc này chúng ta sẽ cần các trợ lý có khả năng đặt bàn, gọi xe, đặt món. Còn nếu muốn trợ lý không phải là con người, chúng ta cần phải tạo ra thứ để kết nối AI/LLM với các ứng dụng đặt xe, đặt món và để giao tiếp với nhau. Và thứ đó chính là MCP.

Bạn nhận được yêu cầu từ một ông sếp. Tôi đã có sẵn nội dung cần trình bày rồi. Bây giờ tôi yêu cầu bạn trong vòng 1 phút phải tạo slides Canva hoặc PowerPoint 15 trang, bạn có làm được không? Chúng ta đều biết rằng với năng lực của một người bình thường hay kể cả là chuyên gia Canva cũng không thể làm điều đó trong vòng 1 phút. Đối với Hải hay anh em hay một người nào đó khác, điều đó là bất khả thi. Nhưng nếu giao cho một con AI có khả năng kết nối với Canva, có thể tự tìm template, component và gắn text thì chỉ cần 30 giây là đủ để có 15 slides theo yêu cầu. 

## Kiến trúc MCP

![Kiến trúc MCP](https://mintcdn.com/mcp/bEUxYpZqie0DsluH/images/mcp-simple-diagram.png?fit=max&auto=format&n=bEUxYpZqie0DsluH&q=85&s=35268aa0ad50b8c385913810e7604550)
*MCP như cổng kết nối USB. Nguồn: modelcontextprotocol.io*