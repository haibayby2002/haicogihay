from PIL import Image
from pathlib import Path

# Folder input/output
INPUT_DIR = "input_images"
OUTPUT_DIR = "optimized_images"

# Create output folder
Path(OUTPUT_DIR).mkdir(exist_ok=True)

# Supported formats
EXTENSIONS = [".jpg", ".jpeg", ".png"]

# Max width
MAX_WIDTH = 1200

for image_path in Path(INPUT_DIR).iterdir():

    if image_path.suffix.lower() not in EXTENSIONS:
        continue

    try:
        img = Image.open(image_path).convert("RGB")

        # Resize keeping aspect ratio
        width, height = img.size

        if width > MAX_WIDTH:
            new_height = int((MAX_WIDTH / width) * height)
            img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

        # Output filename
        output_path = Path(OUTPUT_DIR) / f"{image_path.stem}.webp"

        # Save as WebP
        img.save(
            output_path,
            "WEBP",
            quality=82,
            method=6
        )

        print(f"Optimized: {image_path.name}")

    except Exception as e:
        print(f"Error with {image_path.name}: {e}")