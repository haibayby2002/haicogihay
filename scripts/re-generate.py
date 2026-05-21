from pathlib import Path

from generate_homepage import OUTPUT_HTML, render_homepage
from generate_product import render_all_products

import os
import shutil
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parent
INDEX_FILE = ROOT_DIR.parent / "index.html"
PRODUCTS_DIR = ROOT_DIR.parent / "products"
ARCHIVE_DIR = ROOT_DIR.parent / "archive"

def archive_old_files(index_file=INDEX_FILE, products_dir=PRODUCTS_DIR, archive_dir=ARCHIVE_DIR):
    # Create archive directory if it doesn't exist
    os.makedirs(archive_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d")

    if index_file.exists():
        # Get current timestamp for unique archive name
        archive_name = f"{timestamp}_index.html"
        shutil.move(index_file, os.path.join(archive_dir, archive_name))

    for product_file in products_dir.glob("*.html"):
        archive_name = f"{timestamp}_{product_file.stem}.html"
        shutil.move(product_file, os.path.join(archive_dir, archive_name))


if __name__ == "__main__":
    archive_old_files()
    render_homepage()
    render_all_products()