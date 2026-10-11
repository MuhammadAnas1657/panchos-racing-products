import json

with open('scraped_data/categories.json', encoding='utf-8') as f:
    cats = json.load(f)

for c in cats:
    name = c.get('name', '')
    slug = c.get('slug', '')
    count = c.get('count', 0)
    cid = c.get('id', 0)
    print(f"{cid} | {name} | slug: {slug} | count: {count}")
