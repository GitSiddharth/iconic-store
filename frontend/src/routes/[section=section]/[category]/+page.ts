import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSection } from '$lib/sections';
import { sdk } from '$lib/medusa';
import { getRegionId } from '$lib/store';

export const load: PageLoad = async ({ params }) => {
  const section = getSection(params.section);
  if (!section) error(404, 'Section not found');

  let products: any[] = [];
  try {
    const regionId = await getRegionId();
    const { product_categories } = await sdk.store.category.list({ limit: 100, fields: 'id,handle' });
    const wanted = new Set(section.categories.map((c) => c.slug));
    const ids = product_categories.filter((c: any) => wanted.has(c.handle)).map((c: any) => c.id);

    if (ids.length) {
      const res = await sdk.store.product.list({
        category_id: ids,
        region_id: regionId,
        fields: '*variants.calculated_price,*categories',
        limit: 60
      });
      products = res.products;
    }
  } catch (e) {
    console.error('Could not load section products', e);
  }

  return { section, products };
};