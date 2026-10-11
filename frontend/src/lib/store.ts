import { sdk } from './medusa';
import { sections } from './sections';

let regionPromise: Promise<string | undefined> | undefined;

// Finds your India (INR) region once, then reuses it.
export function getRegionId() {
  regionPromise ??= sdk.store.region
    .list()
    .then(({ regions }) => (regions.find((r: any) => r.currency_code === 'inr') ?? regions[0])?.id)
    .catch((e) => {
      regionPromise = undefined;
      throw e;
    });
  return regionPromise;
}

export function formatPrice(amount?: number | null, currency = 'inr') {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0
  }).format(amount);
}

export function lowestPrice(product: any): number | null {
  const prices = (product.variants ?? [])
    .map((v: any) => v.calculated_price?.calculated_amount)
    .filter((n: unknown): n is number => typeof n === 'number');
  return prices.length ? Math.min(...prices) : null;
}

// Works out which section/category a product belongs to, from its Medusa categories.
export function findPlacement(product: any) {
  const handles = new Set((product.categories ?? []).map((c: any) => c.handle));
  const section =
    sections.find((s) => s.categories.some((c) => handles.has(c.slug))) ??
    sections.find((s) => handles.has(s.slug));
  const category = section?.categories.find((c) => handles.has(c.slug));
  return { section, category };
}