import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return ['shaan', 'shringaar', 'shauq'].includes(param);
};
