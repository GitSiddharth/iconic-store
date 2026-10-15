import type { PageLoad } from './$types';
import { sdk } from '$lib/medusa';
import { getRegionId } from '$lib/store';

export const load: PageLoad = async ({ url }) => {
  const q = url.searchParams.get('q')?.trim() ?? '';
  let products: any[] = [];
  let offline = false;

  if (q) {
    try {
      const regionId = await getRegionId();
      const res = await sdk.store.product.list({
        q,
        region_id: regionId,
        fields: '*variants.calculated_price,*categories',
        limit: 48
      });
      products = res.products;
    } catch (e) {
      console.error('Search failed', e);
      offline = true;
    }
  }

  return { q, products, offline };
};