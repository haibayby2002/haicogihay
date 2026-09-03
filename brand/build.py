#!/usr/bin/env python3
"""Build index.html from a template plus its data sources.

Edit these, never index.html directly:
  * index_template.html  -> page structure, with {{CONFIG_DATA}} / {{PRICING_DATA}} / {{I18N_DATA}} tokens
  * config.json          -> per-language currency (code, symbol, `perUsd` ratio, rounding) + add-on price
  * pricing.csv           -> service prices (in USD), limits, weights, bilingual names/descriptions
  * i18n.json             -> every other piece of on-page text, per language

Prices in pricing.csv are USD. At runtime the page shows each price in the
active language's currency: amount_usd * currencies[lang].perUsd, rounded to
currencies[lang].roundTo. Change the VND rate in config.json ("perUsd": 25400).

Usage:
  python build.py              # -> index.html
  python build.py --example    # -> index.html AND refresh index_template_example.html

index_template_example.html is a committed, directly-viewable sample of what a
build produces, so the template can be previewed without running anything.
"""
import csv
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
TEMPLATE_PATH = ROOT / "index_template.html"
CONFIG_PATH = ROOT / "config.json"
CSV_PATH = ROOT / "pricing.csv"
I18N_PATH = ROOT / "i18n.json"
OUT_PATH = ROOT / "index.html"
EXAMPLE_PATH = ROOT / "index_template_example.html"

CURRENCY_KEYS = {"code", "symbol", "position", "perUsd", "roundTo", "locale"}

REQUIRED_COLS = [
    "id", "name_en", "name_vi", "unit_en", "unit_vi",
    "price", "min", "max", "weight", "card_en", "card_vi",
]


def die(msg):
    sys.exit(f"build.py: {msg}")


# ---------- pricing.csv ----------
def load_pricing():
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        missing = [c for c in REQUIRED_COLS if c not in (reader.fieldnames or [])]
        if missing:
            die(f"pricing.csv is missing columns: {', '.join(missing)}")

        rows = []
        for i, raw in enumerate(reader, start=2):
            row = {k.strip(): (v.strip() if v else "") for k, v in raw.items()}
            if not row.get("id"):
                continue
            try:
                item = {
                    "id": row["id"],
                    "price": float(row["price"]),
                    "min": int(row["min"]),
                    "max": int(row["max"]),
                    "weight": float(row["weight"]),
                    "name": {"en": row["name_en"], "vi": row["name_vi"]},
                    "unit": {"en": row["unit_en"], "vi": row["unit_vi"]},
                    "card": {"en": row["card_en"], "vi": row["card_vi"]},
                }
            except ValueError as e:
                die(f"pricing.csv line {i}: bad number ({e})")
            if item["min"] > item["max"]:
                die(f"pricing.csv line {i}: min > max for '{item['id']}'")
            rows.append(item)
        return rows


# ---------- config.json ----------
def load_config():
    try:
        data = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        die(f"config.json is not valid JSON: {e}")

    if not isinstance(data, dict):
        die("config.json must be a JSON object")

    currencies = data.get("currencies")
    if not isinstance(currencies, dict) or not currencies:
        die('config.json needs a non-empty "currencies" object keyed by language')

    for lang, c in currencies.items():
        if not isinstance(c, dict):
            die(f"config.json: currencies.{lang} must be an object")
        missing = {"code", "symbol", "perUsd"} - set(c)
        if missing:
            die(f"config.json: currencies.{lang} missing {', '.join(sorted(missing))}")
        try:
            float(c["perUsd"])
            float(c.get("roundTo", 1))
        except (TypeError, ValueError):
            die(f"config.json: currencies.{lang} perUsd / roundTo must be numbers")
        c.setdefault("position", "before")
        c.setdefault("roundTo", 1)
        c.setdefault("locale", "en-US")
        extra = set(c) - CURRENCY_KEYS
        if extra:
            print(f"  ! config.json: currencies.{lang} has unknown keys: {', '.join(sorted(extra))}")

    data.setdefault("addonPriceUsd", 0)
    return data


# ---------- i18n.json ----------
def load_i18n():
    try:
        data = json.loads(I18N_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        die(f"i18n.json is not valid JSON: {e}")

    if not isinstance(data, dict) or not data:
        die('i18n.json must be an object of { "lang": { "key": "text" } }')
    for lang, table in data.items():
        if not isinstance(table, dict):
            die(f"i18n.json: '{lang}' must map to an object of key -> text")

    langs = list(data)
    base = set(data[langs[0]])
    for lang in langs[1:]:
        missing = base - set(data[lang])
        extra = set(data[lang]) - base
        if missing:
            print(f"  ! i18n.json: '{lang}' is missing keys: {', '.join(sorted(missing))}")
        if extra:
            print(f"  ! i18n.json: '{lang}' has extra keys: {', '.join(sorted(extra))}")
    return data


# ---------- template ----------
def render(template, replacements):
    for token, value in replacements.items():
        placeholder = "{{" + token + "}}"
        if placeholder not in template:
            die(f"token {placeholder} not found in index_template.html")
        template = template.replace(placeholder, value)
    leftover = sorted(set(re.findall(r"\{\{[A-Z0-9_]+\}\}", template)))
    if leftover:
        die(f"unreplaced tokens in template: {', '.join(leftover)}")
    return template


def main():
    write_example = "--example" in sys.argv[1:]

    for p in (TEMPLATE_PATH, CONFIG_PATH, CSV_PATH, I18N_PATH):
        if not p.exists():
            die(f"missing {p.name}")

    config = load_config()
    pricing = load_pricing()
    if not pricing:
        die("pricing.csv has no data rows")
    i18n = load_i18n()

    replacements = {
        "CONFIG_DATA": "<script>window.CONFIG = "
        + json.dumps(config, ensure_ascii=False, indent=2) + ";</script>",
        "PRICING_DATA": "<script>window.PRICING = "
        + json.dumps(pricing, ensure_ascii=False, indent=2) + ";</script>",
        "I18N_DATA": "<script>window.I18N = "
        + json.dumps(i18n, ensure_ascii=False, indent=2) + ";</script>",
    }

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    html = render(template, replacements)

    OUT_PATH.write_text(html, encoding="utf-8", newline="\n")
    targets = [OUT_PATH.name]
    if write_example:
        EXAMPLE_PATH.write_text(html, encoding="utf-8", newline="\n")
        targets.append(EXAMPLE_PATH.name)

    rates = ", ".join(
        f"{lang}:{c['code']}"
        + ("" if float(c["perUsd"]) == 1 else f"(x{float(c['perUsd']):g})")
        for lang, c in config["currencies"].items()
    )
    print(f"built {' + '.join(targets)} - {len(pricing)} services, languages: {', '.join(i18n)}")
    print(f"  currencies: {rates}")
    for r in pricing:
        print(
            f"  - {r['id']:<12} ${r['price']:.0f} / {r['unit']['en']:<6} "
            f"min {r['min']}, max {r['max']}, weight {r['weight']:.0f}"
        )


if __name__ == "__main__":
    main()
