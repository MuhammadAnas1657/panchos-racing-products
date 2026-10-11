import urllib.request
import json
import ssl
import os
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_json(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def main():
    out_dir = os.path.join(os.path.dirname(__file__), "scraped_data")
    os.makedirs(out_dir, exist_ok=True)

    print("Fetching categories...")
    categories = fetch_json("https://panchosracingproducts.com/wp-json/wc/store/v1/products/categories?per_page=100")
    if categories:
        with open(os.path.join(out_dir, "categories.json"), "w", encoding="utf-8") as f:
            json.dump(categories, f, indent=2)
        print(f"Saved {len(categories)} categories")

    print("Fetching pages...")
    pages = fetch_json("https://panchosracingproducts.com/wp-json/wp/v2/pages?per_page=100")
    if pages:
        with open(os.path.join(out_dir, "pages.json"), "w", encoding="utf-8") as f:
            json.dump(pages, f, indent=2)
        print(f"Saved {len(pages)} pages")

    print("Fetching all products...")
    all_products = []
    page = 1
    while True:
        url = f"https://panchosracingproducts.com/wp-json/wc/store/v1/products?per_page=50&page={page}"
        print(f"Fetching products page {page}...")
        prods = fetch_json(url)
        if not prods or len(prods) == 0:
            break
        all_products.extend(prods)
        print(f"Got {len(prods)} products (total: {len(all_products)})")
        if len(prods) < 50:
            break
        page += 1
        time.sleep(0.5)

    with open(os.path.join(out_dir, "products.json"), "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2)
    print(f"Total products saved: {len(all_products)}")

    # Also fetch site info / media if available
    print("Fetching media samples and site info...")
    media = fetch_json("https://panchosracingproducts.com/wp-json/wp/v2/media?per_page=50")
    if media:
        with open(os.path.join(out_dir, "media.json"), "w", encoding="utf-8") as f:
            json.dump(media, f, indent=2)
        print(f"Saved {len(media)} media records")

if __name__ == "__main__":
    main()
