import urllib.request
import json
import ssl
import os
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

def fetch_json(url):
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except Exception as e:
            print(f"Retry {attempt+1} for {url} due to {e}", flush=True)
            time.sleep(1)
    return None

def main():
    out_dir = os.path.join(os.path.dirname(__file__), "scraped_data")
    os.makedirs(out_dir, exist_ok=True)
    
    products_by_id = {}

    # Target categories to get a comprehensive racing parts inventory:
    # 444: Sprint Steering (THE FAMOUS BUG CATEGORY with 16 parts!)
    # 435: Late Model Steering
    # 458: Radius Rod
    # 913: XR2 Parts
    # 460: Factory Rocket Parts
    # 432: Shocks
    # 429: Late Model Brakes
    # 443: Sprint Fuel
    # 497: Safety
    # 470: Apparel
    # 437: Cooling
    # 446: Wing
    target_categories = [444, 435, 458, 913, 460, 432, 429, 443, 497, 470, 437, 446]

    print(f"Scraping products across {len(target_categories)} key racing categories...", flush=True)
    for cat_id in target_categories:
        url = f"https://panchosracingproducts.com/wp-json/wc/store/v1/products?category={cat_id}&per_page=25"
        print(f"Fetching category {cat_id}...", flush=True)
        items = fetch_json(url)
        if items:
            for item in items:
                products_by_id[item['id']] = item
            print(f"Category {cat_id} returned {len(items)} items. Total unique: {len(products_by_id)}", flush=True)
        time.sleep(0.4)

    # Also fetch general recent/featured products pages 1 and 2
    for page in [1, 2]:
        url = f"https://panchosracingproducts.com/wp-json/wc/store/v1/products?per_page=25&page={page}"
        print(f"Fetching general page {page}...", flush=True)
        items = fetch_json(url)
        if items:
            for item in items:
                products_by_id[item['id']] = item
            print(f"General page {page} returned {len(items)} items. Total unique: {len(products_by_id)}", flush=True)
        time.sleep(0.4)

    all_products = list(products_by_id.values())
    print(f"Finished scraping! Total unique products collected: {len(all_products)}", flush=True)

    with open(os.path.join(out_dir, "products.json"), "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2)

    print("Saved products.json successfully!", flush=True)

if __name__ == "__main__":
    main()
