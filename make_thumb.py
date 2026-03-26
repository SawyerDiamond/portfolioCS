from PIL import Image

screenshot_path = "/Users/sawyer/.gemini/antigravity/brain/ab088cfb-d545-4dbd-9094-744b2e4ec995/landing_page_1772724130983.png"
img = Image.open(screenshot_path).convert("RGBA")

# The user wants to feature the left side of the UI but on a background
bg_size = (800, 800)
bg = Image.new('RGB', bg_size, (10, 15, 30)) # Navy blue background

# Resize the image so its height is somewhat smaller than the canvas to give it a nice border
target_height = 650
ratio = target_height / img.height
new_width = int(img.width * ratio)
img_resized = img.resize((new_width, target_height), Image.Resampling.LANCZOS)

# Position it so the interesting left part is prominent.
# Place it at x=50, y=75
bg.paste(img_resized, (50, 75), img_resized)

bg.save("/Users/sawyer/Documents/Code/portfolioCS/src/assets/sanity-content/projects/query-engine-thumb.webp", format="WEBP")
print("Thumbnail saved.")
