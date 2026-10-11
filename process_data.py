import json
import os
import re

def strip_tags(text):
    if not text:
        return ""
    clean = re.sub(r'<[^>]+>', ' ', text)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def main():
    base_dir = os.path.dirname(__file__)
    src_data_dir = os.path.join(base_dir, "src", "data")
    os.makedirs(src_data_dir, exist_ok=True)

    with open(os.path.join(base_dir, "scraped_data", "products.json"), encoding="utf-8") as f:
        raw_products = json.load(f)

    with open(os.path.join(base_dir, "scraped_data", "categories.json"), encoding="utf-8") as f:
        raw_categories = json.load(f)

    with open(os.path.join(base_dir, "scraped_data", "pages.json"), encoding="utf-8") as f:
        raw_pages = json.load(f)

    processed_products = []
    for p in raw_products:
        prices = p.get('prices', {})
        currency_sym = prices.get('currency_symbol', '$')
        minor_unit = prices.get('currency_minor_unit', 2)
        
        price_str = prices.get('price', '0')
        try:
            raw_price = int(price_str) / (10 ** minor_unit)
        except:
            raw_price = 0.0
            
        formatted_price = f"{currency_sym}{raw_price:.2f}" if raw_price > 0 else "Call for Price"
        
        reg_price_str = prices.get('regular_price')
        try:
            reg_price = int(reg_price_str) / (10 ** minor_unit) if reg_price_str else raw_price
        except:
            reg_price = raw_price
            
        cats = [c.get('name', '').replace('&amp;', '&') for c in p.get('categories', [])]
        cat_slugs = [c.get('slug', '') for c in p.get('categories', [])]
        
        images = [img.get('src') for img in p.get('images', []) if img.get('src')]
        primary_image = images[0] if images else "https://panchosracingproducts.com/wp-content/uploads/2026/07/PanchosOvalBlue100dpi.jpg"
        
        sku = p.get('sku') or f"PRP-{p.get('id')}"
        
        # Check if Sprint Steering
        is_sprint_steering = any('spsteering' in s or 'steering' in s.lower() for s in cat_slugs)
        
        processed_products.append({
            "id": p.get('id'),
            "name": p.get('name', '').replace('&amp;', '&').replace('&#8217;', "'").replace('&#8211;', '-'),
            "slug": p.get('slug', ''),
            "sku": sku,
            "price": formatted_price,
            "rawPrice": raw_price,
            "regularPrice": f"{currency_sym}{reg_price:.2f}",
            "isOnSale": p.get('on_sale', False),
            "isInStock": p.get('is_in_stock', True),
            "primaryImage": primary_image,
            "allImages": images,
            "category": cats[0] if cats else "Racing Parts",
            "allCategories": cats,
            "categorySlugs": cat_slugs,
            "shortDescription": strip_tags(p.get('short_description', '')),
            "description": strip_tags(p.get('description', '')),
            "isSprintSteering": is_sprint_steering,
            "attributes": p.get('attributes', [])
        })

    # Generate TypeScript file
    with open(os.path.join(src_data_dir, "productsData.ts"), "w", encoding="utf-8") as f:
        f.write("/* Auto-generated scraped catalog for Pancho's Racing Products */\n")
        f.write("export interface Product {\n")
        f.write("  id: number;\n")
        f.write("  name: string;\n")
        f.write("  slug: string;\n")
        f.write("  sku: string;\n")
        f.write("  price: string;\n")
        f.write("  rawPrice: number;\n")
        f.write("  regularPrice: string;\n")
        f.write("  isOnSale: boolean;\n")
        f.write("  isInStock: boolean;\n")
        f.write("  primaryImage: string;\n")
        f.write("  allImages: string[];\n")
        f.write("  category: string;\n")
        f.write("  allCategories: string[];\n")
        f.write("  categorySlugs: string[];\n")
        f.write("  shortDescription: string;\n")
        f.write("  description: string;\n")
        f.write("  isSprintSteering: boolean;\n")
        f.write("  attributes: any[];\n")
        f.write("}\n\n")
        f.write("export const PRODUCTS: Product[] = ")
        f.write(json.dumps(processed_products, indent=2))
        f.write(";\n")

    print(f"Exported {len(processed_products)} products to src/data/productsData.ts")

    # Categories list
    cats_summary = []
    for c in raw_categories:
        cats_summary.append({
            "id": c.get('id'),
            "name": c.get('name', '').replace('&amp;', '&'),
            "slug": c.get('slug', ''),
            "count": c.get('count', 0),
            "description": strip_tags(c.get('description', ''))
        })

    with open(os.path.join(src_data_dir, "siteData.ts"), "w", encoding="utf-8") as f:
        f.write("/* Client business metadata & categories */\n")
        f.write("export const CATEGORIES = ")
        f.write(json.dumps(cats_summary, indent=2))
        f.write(";\n\n")
        f.write("""export const CLIENT_INFO = {
  name: "Pancho's Racing Products",
  tagline: "Speed, Precision, & Proven Track Performance Since 1993",
  address: "1754 Carlisle Pike, Hanover, PA 17331, USA",
  phone: "+1 717-646-0090",
  email: "pancho@panchosracingproducts.com",
  hours: "Monday - Friday: 8:00 AM - 5:00 PM EST | Saturday: Trackside / By Appointment",
  logo: "https://panchosracingproducts.com/wp-content/uploads/2026/07/PanchosOvalBlue100dpi.jpg",
  heroBadge: "OFFICIAL FACTORY ROCKET CHASSIS DEALER & RACING SUPPLY",
  verifiedStats: [
    { label: "Active Parts Catalog", value: 1726, suffix: "+", change: "100% Real Time" },
    { label: "Years Dominating Tracks", value: 31, suffix: " Yrs", change: "Founded 1993" },
    { label: "Steering Parts Bug", value: 16, suffix: "/16", change: "100% Resolved" },
    { label: "Order Fulfilment Rate", value: 99.8, suffix: "%", change: "Fast Trackside Shipping" }
  ]
};
""")
    print("Exported siteData.ts successfully!")

if __name__ == "__main__":
    main()
