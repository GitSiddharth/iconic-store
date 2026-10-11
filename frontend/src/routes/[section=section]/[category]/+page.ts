import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSection } from '$lib/sections';
import { sdk } from '$lib/medusa';
import { getRegionId } from '$lib/store';

export const load: PageLoad = async ({ params }) => {
  const section = getSection(params.section);
  const category = section?.categories.find((c) => c.slug === params.category);
  if (!section || !category) error(404, 'Collection not found');

  let products: any[] = [];
  let offline = false;

  try {
    const regionId = await getRegionId();
    const { product_categories } = await sdk.store.category.list({ handle: category.slug });
    const medusaCategory = product_categories[0];

    if (medusaCategory) {
      const res = await sdk.store.product.list({
        category_id: [medusaCategory.id],
        region_id: regionId,
        fields: '*variants.calculated_price',
        limit: 48
      });
      products = res.products;
    }
  } catch (e) {
    console.error('Could not load products', e);
    offline = true;
  }

  return { section, category, products, offline };
};