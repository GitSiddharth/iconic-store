import { error } from '@sveltejs/kit';
import { getSection } from '$lib/sections';

export const load = ({ params }) => {
  const section = getSection(params.section);
  if (!section) error(404, 'Section not found');
  return { section };
};