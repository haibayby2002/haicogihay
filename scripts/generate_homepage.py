import json
from pathlib import Path
from utils import slugify

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
TEMPLATE_DIR = ROOT_DIR / "templates"
OUTPUT_HTML = ROOT_DIR / "index.html"

PRODUCTS_JSON = DATA_DIR / "products.json"
STORE_JSON = DATA_DIR / "store.json"
TEMPLATE_HTML = TEMPLATE_DIR / "home_page.html"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def render_homepage():
    store_data = load_json(STORE_JSON)
    products = load_json(PRODUCTS_JSON)
    products = [{**product, "link": "products/" + slugify(product["name"]) + '.html'} for product in products]


    with TEMPLATE_HTML.open("r", encoding="utf-8") as handle:
        template = handle.read()

    store_json = json.dumps(store_data, ensure_ascii=False)
    products_json = json.dumps(products, ensure_ascii=False)

    html = template.replace("{storeData}", store_json).replace("{products}", products_json)

    with OUTPUT_HTML.open("w", encoding="utf-8") as handle:
        handle.write(html)

    print(f"Rendered homepage to: {OUTPUT_HTML}")


if __name__ == "__main__":
    render_homepage()
