from PIL import Image
from pathlib import Path

# Folder input/output
INPUT_DIR = "D:\\haicogihay\\assets\\product_image"
OUTPUT_DIR = "D:\\haicogihay\\assets\\product_image"

# Create output folder if it doesn't exist
Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)

# Supported formats
EXTENSIONS = [".jpg", ".jpeg", ".png"]

def optimize_images(input_dir, output_dir, max_width=1200, quality=82, supported_formats=EXTENSIONS):
    for image_path in Path(input_dir).iterdir():
        print(f"Processing: {image_path.name}")
        if image_path.suffix.lower() not in supported_formats:
            continue

        try:
            # Output filename
            output_path = Path(output_dir) / f"{image_path.stem}.webp"
            if output_path.exists():
                print(f"Already optimized: {output_path.name}")
                continue

            img = Image.open(image_path).convert("RGB")

            # Resize keeping aspect ratio
            width, height = img.size

            if width > max_width:
                new_height = int((max_width / width) * height)
                img = img.resize((max_width, new_height), Image.LANCZOS)

            # Save as WebP
            img.save(
                output_path,
                "WEBP",
                quality=quality,
                method=6
            )

            print(f"Optimized: {image_path.name}")

        except Exception as e:
            print(f"Error with {image_path.name}: {e}")


def optimized_default_image(input_path, output_path, size=(300, 300), quality=82):
    try:
        img = Image.open(input_path).convert("RGBA")
        img.thumbnail(size, Image.ANTIALIAS)
        img.save(output_path, "WEBP", quality=quality, method=6)
        print(f"Optimized logo saved to: {output_path}")
    except Exception as e:
        print(f"Error optimizing logo: {e}")


if __name__ == "__main__":
    print("Starting image optimization...")
    optimize_images(INPUT_DIR, OUTPUT_DIR)