import type { ParamMatcher } from '@sveltejs/kit';
import { pageSlugs } from '$lib/pages';

export const match: ParamMatcher = (param) => pageSlugs.includes(param);