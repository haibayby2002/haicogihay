
import re
import unicodedata

def slugify(text, max_length=200):
    text = unicodedata.normalize("NFKD", text)
    text = re.compile(r"[^\x00-\x7f]+").sub("", text)
    text = text.lower()
    text = re.compile(r"[^a-z0-9]+").sub("-", text).strip("-")
    return text[:max_length] or "-"


def load_json(file_path):
    import json
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
    
def store_archive(file_path, data):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(data)
    
def product_to_html_card(product):
    return f"""<div class="product-card">
    <img src="{product['image']}" alt="{product['name']}">
    <h3>{product['name']}</h3>
    <p>${product['price']:.2f}</p>
</div>"""

if __name__ == "__main__":
    # print(slugify("Xin chào toàn bộ người hâm mộ của chúng tôi! Chúng tôi rất vui được chia sẻ với bạn những tin tức mới nhất về sản phẩm của chúng tôi. Chúng tôi đã làm việc chăm chỉ để cải thiện chất lượng và tính năng của sản phẩm, và chúng tôi rất tự hào về những gì chúng tôi đã đạt được. Hãy cùng nhau khám phá những điều mới mẻ và thú vị mà chúng tôi đã chuẩn bị cho bạn! Cảm ơn bạn đã luôn ủng hộ chúng tôi và chúng tôi hy vọng bạn sẽ tiếp tục đồng hành cùng chúng tôi trong tương lai! Chúng tôi sẽ luôn cố gắng để mang đến cho bạn những trải nghiệm tuyệt vời nhất với sản phẩm của chúng tôi. Hãy đón chờ những cập nhật mới nhất và đừng quên chia sẻ ý kiến của bạn với chúng tôi! Chúng tôi rất mong được nghe ý kiến của bạn và sẽ luôn lắng nghe để cải thiện sản phẩm của mình. Cảm ơn bạn đã là một phần quan trọng trong cộng đồng của chúng tôi! Chúng tôi sẽ luôn cố gắng để mang đến cho bạn những trải nghiệm tuyệt vời nhất với sản phẩm của chúng tôi. Hãy đón chờ những cập nhật mới nhất và đừng quên chia sẻ ý kiến của bạn với chúng tôi! Chúng tôi rất mong được nghe ý kiến của bạn và sẽ luôn lắng nghe để cải thiện sản phẩm của mình. Cảm ơn bạn đã là một phần quan trọng trong cộng đồng của chúng tôi!"))
    print(load_json("data/products.json"))