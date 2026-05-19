import json
from pathlib import Path
from utils import slugify 

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
TEMPLATE_DIR = ROOT_DIR / "templates"


PRODUCTS_JSON = DATA_DIR / "products.json"
STORE_JSON = DATA_DIR / "store.json"
TEMPLATE_HTML = TEMPLATE_DIR / "product_details.html"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)
    


def render_product(product, store_data):
    
    if not product:
        print("Product not found.")
        return
    
    OUTPUT_HTML = ROOT_DIR / "products" / (product["link"] if product.get("link") else f"{slugify(product['name'])}.html")
    
    with TEMPLATE_HTML.open("r", encoding="utf-8") as handle:
        template = handle.read()

    store_json = json.dumps(store_data, ensure_ascii=False)
    product_json = json.dumps(product, ensure_ascii=False)

    html = template.replace("{icon_url}", product["image"] or "../assets/store_image/logo_hai_co_gi_hay_removed_background.png").replace("{home_url}", store_data.get("homepage", "../")).replace("{storeData}", store_json).replace("{product}", product_json)

    with OUTPUT_HTML.open("w", encoding="utf-8") as handle:
        handle.write(html)

    print(f"Rendered product page to: {OUTPUT_HTML} (product id={product.get('id')})")

def render_all_products():
    store_data = load_json(STORE_JSON)
    products = load_json(PRODUCTS_JSON)
    products = [{**product, "link": slugify(product["name"]) + '.html'} for product in products]
    for product in products:
        render_product(product, store_data)


if __name__ == "__main__":
    render_all_products()
