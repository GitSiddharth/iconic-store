import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { sdk } from '$lib/medusa';
import { findPlacement, getRegionId } from '$lib/store';

export const load: PageLoad = async ({ params }) => {
  const regionId = await getRegionId();
  const { products } = await sdk.store.product.list({
    handle: params.handle,
    region_id: regionId,
    fields: '*variants.calculated_price,*categories,*images'
  });

  const product = products[0];
  if (!product) error(404, 'Product not found');

  const { section, category } = findPlacement(product);
  return { product, section, category };
};