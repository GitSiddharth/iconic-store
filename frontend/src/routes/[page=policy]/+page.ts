import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPage } from '$lib/pages';

export const load: PageLoad = ({ params }) => {
  const page = getPage(params.page);
  if (!page) error(404, 'Page not found');
  return { page };
};